import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

import { Store } from '@ngrx/store';
import * as fromTraining from './../training.reducer';


@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  allExercises = new MatTableDataSource<Exercise>();



  @ViewChild(MatSort) exerciseSorting: MatSort;

  @ViewChild(MatPaginator) tablePaginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {

    this.store.select(fromTraining.getFinishedExercises)
    .subscribe((exercise: Exercise[]) => {
      this.allExercises.data = exercise;
    });

    this.trainingService.fetchCompletedOrCancelledExercises();
    this.allExercises.paginator = this.tablePaginator;
  }

  ngAfterViewInit() {
    this.allExercises.sort = this.exerciseSorting;
  }

  doFilter(filter: string) {
    this.allExercises.filter = filter.trim().toLowerCase();
  }


}
