import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent {
  taskId: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) {
    this.taskId =  data.id ||  '';
    console.log(this.taskId)
  }

  handleDeleteTask() {
    
    this.http.delete(`http://localhost:5555/tasks/${this.taskId}`).subscribe({
      next: () => {
        this.snackBar.open('Task Deleted Successfully', 'Close');
        this.dialogRef.close(true); 
      },
      error: (error) => {
        this.snackBar.open('Error deleting task', 'Close');
        console.error(error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}