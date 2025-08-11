import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tickets', pathMatch: 'full' },
{ path: 'tickets', component: TaskListComponent },
{ path: 'tickets/:id', component: TaskDetailsComponent }

];
