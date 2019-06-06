import {Routes, RouterModule} from '@angular/router';

import { SearchComponent } from './searchpage/search.component';
import { LoginComponent } from './login';
import { SignUpComponent } from './registration/register.component';
import { EditSkillComponent } from './edit-skills/edit-skill.component';
import { CompletedTrainingComponent } from './completed-training/completed-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NotificationComponent } from './notifications/notification.component';
import { MainContainerComponent } from './maincontainer/main-container.component';
import { AdminComponent } from './admin';
import { AuthGuard } from './_guards';

const routes: Routes = [
    {path: '', component: SearchComponent},
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    {path: 'home', component: MainContainerComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'notification', component: NotificationComponent, canActivate: [AuthGuard]},
    {path: 'currenttraining', component: CurrentTrainingComponent, canActivate: [AuthGuard]},
    {path: 'completedtraining', component: CompletedTrainingComponent, canActivate: [AuthGuard]},
    {path: 'editskills', component: EditSkillComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: '/admin'}
];

export const routingModule = RouterModule.forRoot(routes);
