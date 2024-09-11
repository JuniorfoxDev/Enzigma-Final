import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditTaskComponent>
  ) { }

  ngOnInit(): void {
    this.assignedTo.setValue(this.data.assignedTo);
    this.status.setValue(this.data.status);
    this.dueDate.setValue(this.data.dueDate);
    this.priority.setValue(this.data.priority);
    this.description.setValue(this.data.description);
  }

  handleEditTask() {
    const updatedTask = {
      assignedTo: this.assignedTo.value,
      status: this.status.value,
      dueDate: this.dueDate.value,
      priority: this.priority.value,
      description: this.description.value
    };

    this.loading = true;

    this.http.put(`http://localhost:5555/tasks/${this.data._id}`, updatedTask).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Task updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['bg-green-500', 'text-white']
        });
        this.dialogRef.close(); 
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error updating task', 'Close', {
          duration: 3000,
          panelClass: ['bg-red-500', 'text-white']
        });
        console.error(error);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
