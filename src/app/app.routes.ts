import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NotesListComponent } from './pages/notes/notes-list/notes-list.component';
import { NoteDetailsComponent } from './pages/notes/note-details/note-details.component';
import { CreateNoteComponent } from './pages/create-note/create-note.component';
import { UsersComponent } from './users.component';
import { AuthGuard } from './Guards/auth.guard';
import { UnsavedChangesGuard } from './Guards/unsaved-changes.guard';

export const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'notes/new',
    component: CreateNoteComponent,
    canActivate: [AuthGuard],
    canDeactivate: [UnsavedChangesGuard],
  },
  { path: 'notes/:id', component: NoteDetailsComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', redirectTo: '' },
];
