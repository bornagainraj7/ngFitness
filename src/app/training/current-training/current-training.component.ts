import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromTraining from './../training.reducer'; 


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  public progress = 0;
  public timer: number;


  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }


  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((exercise) => {
      const step = exercise.duration / 100 * 1000;

      this.timer = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this.trainingService.completedExercise();
          clearInterval(this.timer);
        }
      }, step);
    })
    
  }


  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {progress: this.progress}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.trainingService.cancelledExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
