import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  assignedTo = new FormControl('');
  status = new FormControl('');
  dueDate = new FormControl('');
  priority = new FormControl('');
  description = new FormControl('');
  loading = false;
  taskId: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditTaskComponent>
  ) { }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTaskData();
    console.log(this.route)
  }

  loadTaskData() {
    this.loading = true;
    this.http.get<any>(`http://localhost:5555/tasks/${this.taskId}`).subscribe({
      next: (response) => {
        this.assignedTo.setValue(response.assignedTo);
        this.status.setValue(response.status);
        this.dueDate.setValue(response.dueDate);
        this.priority.setValue(response.priority);
        this.description.setValue(response.description);
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error fetching task data', 'Close', {
          duration: 3000,
          panelClass: ['bg-red-500', 'text-white'],
        });
        console.error(error);
      }
    });
  }

  handleEditTask() {
    const data = {
      assignedTo: this.assignedTo.value,
      status: this.status.value,
      dueDate: this.dueDate.value,
      priority: this.priority.value,
      description: this.description.value
    };

    this.loading = true;
    this.http.put(`http://localhost:5555/tasks/${this.taskId}`, data).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Task Edited Successfully', 'Close', {
          duration: 3000,
          panelClass: ['bg-green-500', 'text-white'],
        });
        this.dialogRef.close(); 
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error editing task', 'Close', {
          duration: 3000,
          panelClass: ['bg-red-500', 'text-white'],
        });
        console.error(error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
