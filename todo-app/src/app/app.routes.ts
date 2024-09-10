import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';

export const routes: Routes = [
    {path:'',component:MainComponent},
    {path:'tasks/create', component: CreateTaskComponent},
    {path:'tasks/edit/:id', component:EditTaskComponent},
    {path: 'tasks/delete/:id', component:DeleteTaskComponent},
];
