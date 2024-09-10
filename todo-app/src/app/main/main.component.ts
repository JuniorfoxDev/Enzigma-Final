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
  styleUrl: './main.component.css'
})
export class MainComponent {
  tasks: any[] = [];
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
  openEditTaskModal() {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchTasks(); 
    });
  }

  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  openDeleteTaskModal(taskId : string) {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      width: '600px',
      data:{ id : taskId}
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

}
