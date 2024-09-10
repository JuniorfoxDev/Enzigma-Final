import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  assignedTo = '';
  status = '';
  dueDate = '';
  priority = '';
  description = '';
  loading = false;
  private apiUrl = 'http://localhost:5555/tasks';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateTaskComponent>
  ) { }

  createTask(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  handleSaveTask() {
    const formatDate = this.dueDate ? new Date(this.dueDate).toISOString().split('T')[0] : '';
    const data = {
      assignedTo: this.assignedTo,
      status: this.status,
      dueDate: formatDate,
      priority: this.priority,
      description: this.description,
    };

    this.loading = true;
    this.createTask(data).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Task Created Successfully', 'Close', {
          duration: 3000,
          panelClass: ['bg-green-500', 'text-white'],
        });
        this.dialogRef.close();
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error', 'Close', {
          duration: 3000,
          panelClass: ['bg-red-500', 'text-white'],
        });
        console.error(error);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
