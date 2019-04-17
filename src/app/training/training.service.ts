import { Injectable } from "@angular/core";
import { Exercise } from "./exercise.model";
import { Subscription } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, take } from 'rxjs/operators';
import { UIService } from "../shared/ui.service";

import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions'; 
import * as UI from './../shared/ui.actions';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private fireStoreSubs: Subscription[] = [];


  constructor(private fireStore: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading);
    this.fireStoreSubs.push(this.fireStore.collection('availableExercises').snapshotChanges()
      .pipe(map(docArray => {
        // throw(new Error());

        return docArray.map(newDoc => {
          return {
            id: newDoc.payload.doc.id,
            name: newDoc.payload.doc.data()['name'],
            duration: newDoc.payload.doc.data()['duration'],
            calories: newDoc.payload.doc.data()['calories']
          } //end of newDoc
        })  //end of DocArray
      }))   //end of pipe
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading);
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
      }, (error) => {
          this.store.dispatch(new UI.StopLoading);

        this.uiService.showSnackBar("Fetching exercises failed, please try again later", null, 3000);
      }));
  }

  // getAvailableExercises() {
  //   return [...this.availableExercises];
  // }

  startExercise(selectedId: string) {
    // this.fireStore.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    // this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);

    this.store.dispatch(new Training.StartTraining(selectedId));    
  }


  completedExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise) => {
      this.addDataToFireStore({ ...exercise, date: new Date(), state: 'completed' });
      this.store.dispatch(new Training.StopTraining());
      this.uiService.showSnackBar("You've completed this exercise!", null, 3000);
    });

    
  }

  cancelledExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise) => {
      this.addDataToFireStore({
        ...exercise,
        duration: Math.round(exercise.duration * (progress / 100)),
        calories: exercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.store.dispatch(new Training.StopTraining());
    }); 
    
  }

  fetchCompletedOrCancelledExercises() {
    this.fireStoreSubs.push(this.fireStore.collection('finishedExercises')
    .valueChanges()
    .subscribe((exercise: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedTrainings(exercise));
    }));
  }

  cancelFireStoreSubscription() {
    if(this.fireStoreSubs) {
      this.fireStoreSubs.forEach(subs => subs.unsubscribe());
    }
  }

  addDataToFireStore(exercise: Exercise) {
    this.fireStore.collection('finishedExercises').add(exercise).then((result) => {});
  }

}
