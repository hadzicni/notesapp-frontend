import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoles } from '../app.roles';
import { appCanActivate } from './guard/app.auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NoteFullscreenComponent } from './pages/note-fullscreen/note-fullscreen.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'notes',
    component: NotesListComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Read] },
  },
  {
    path: 'note/:id',
    component: NoteFullscreenComponent,
    canActivate: [appCanActivate],
    data: { roles: [AppRoles.Update] },
  },
  { path: 'noaccess', component: NoAccessComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
