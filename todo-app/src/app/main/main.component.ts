import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatIconModule, HttpClientModule, FormsModule, MatDialogModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tasks: any[] = [];
  showType: string = 'table';
  currentPage: number = 1;
  rowsPerPage: number = 10;

  constructor(private http: HttpClient, public router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  openCreateTaskModal() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchTasks();
    });
  }

  openEditTaskModal(task: any) {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '600px',
      data: task 
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchTasks();
    });
  }

  openDeleteTaskModal(taskId: string) {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      width: '600px',
      data: { id: taskId }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchTasks();
    });
  }

  fetchTasks(): void {
    this.http.get<any>('http://localhost:5555/tasks')
      .subscribe(
        (response) => {
          this.tasks = response.data;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  get totalPages(): number {
    return Math.ceil(this.tasks.length / this.rowsPerPage);
  }

  get currentData(): any[] {
    const indexOfLastRow = this.currentPage * this.rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - this.rowsPerPage;
    return this.tasks.slice(indexOfFirstRow, indexOfLastRow);
  }

  handleFirstPage(): void {
    this.currentPage = 1;
  }

  handlePreviousPage(): void {
    this.currentPage = Math.max(this.currentPage - 1, 1);
  }

  handleNextPage(): void {
    this.currentPage = Math.min(this.currentPage + 1, this.totalPages);
  }

  handleLastPage(): void {
    this.currentPage = this.totalPages;
  }

  handleRowsPerPageChange(event: any): void {
    this.rowsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1; 
  }
}
