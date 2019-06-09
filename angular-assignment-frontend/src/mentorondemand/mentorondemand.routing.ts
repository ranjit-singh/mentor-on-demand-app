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
import { MentorProfileComponent } from './mentorprofile/mentorprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {path: 'home', component: SearchComponent,
    children: [
        {path: 'mentorlist', component: MainContainerComponent}
    ]
    },
    {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
        {path: 'notification', component: NotificationComponent, canActivate: [AuthGuard]},
        {path: 'currenttraining', component: CurrentTrainingComponent, canActivate: [AuthGuard]},
        {path: 'completedtraining', component: CompletedTrainingComponent, canActivate: [AuthGuard]},
        {path: 'editskills', component: EditSkillComponent, canActivate: [AuthGuard]},
        {path: 'mentorprofile', component: MentorProfileComponent, canActivate: [AuthGuard]},
    ]
    },
    {path: '**', redirectTo: '/admin'}
];

export const routingModule = RouterModule.forRoot(routes);
