import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoles } from '../app.roles';
import { appCanActivate } from './guard/app.auth.guard';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { NoteFullscreenComponent } from './pages/note-fullscreen/note-fullscreen.component';
import { NoteNotFoundComponent } from './pages/note-not-found/note-not-found.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';

const routes: Routes = [
  {
    path: '',
    component: NotesListComponent,
  },
  {
    path: 'note/:id',
    component: NoteFullscreenComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Admin] },
  },
  { path: 'noaccess', component: NoAccessComponent },
  { path: 'notfound', component: NoteNotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
