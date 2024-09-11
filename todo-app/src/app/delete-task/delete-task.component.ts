import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
  taskId: string | undefined;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.id) {
      this.taskId = data.id;
    } else {
      console.error('No task ID provided');
    }
  }

  
  handleDeleteTask() {
    if (this.taskId) {
      this.http.delete(`http://localhost:5555/tasks/${this.taskId}`).subscribe({
        next: (response) => {
          console.log('Task deleted successfully:', response);
          this.snackBar.open('Task deleted successfully', 'Close');
          this.dialogRef.close(true); 
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.snackBar.open('Error deleting task', 'Close');
        }
      });
    } else {
      this.snackBar.open('Task ID is missing', 'Close');
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }
}
