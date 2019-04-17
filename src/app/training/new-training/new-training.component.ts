import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from './../../reducers/app.reducer';
import * as fromTraining from './../training.reducer';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  public exercises$: Observable<Exercise[]>;
  public isLoading$: Observable<boolean>;


  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercisesAgain();
  }


  fetchExercisesAgain() {
    this.trainingService.fetchAvailableExercises();
  }


  onStartTraining(form: NgForm) {
    const selectedId = form.value.exercise;
    this.trainingService.startExercise(selectedId);
  }


}
