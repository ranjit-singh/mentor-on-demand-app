import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, AdminService, HomeService } from './_services';

import { MentorOnDemandComponent } from './mentorondemand.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainContainerComponent } from './maincontainer/main-container.component';
import { LoginComponent } from './login';
import { SignUpComponent } from './registration/register.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { CompletedTrainingComponent } from './completed-training/completed-training.component';
import { EditSkillComponent } from './edit-skills/edit-skill.component';
import { SearchComponent } from './searchpage/search.component';
import { routingModule } from './mentorondemand.routing';
import { NotificationComponent } from './notifications/notification.component';
import { AdminComponent } from './admin';
import { MentorProfileComponent } from './mentorprofile/mentorprofile.component';
import { GridComponent } from './griddetails/grid/grid.component';
import { SendproposalComponent } from './sendproposal/sendproposal/sendproposal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MentorComponent } from './admin/mentor/mentor.component';
import { UserComponent } from './admin/user/user.component';
import { TechnologyComponent } from './admin/technology/technology.component';

@NgModule({
  declarations: [
    MentorOnDemandComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    MainContainerComponent,
    LoginComponent,
    SignUpComponent,
    CurrentTrainingComponent,
    CompletedTrainingComponent,
    EditSkillComponent,
    SearchComponent,
    NotificationComponent,
    AdminComponent,
    MentorProfileComponent,
    GridComponent,
    SendproposalComponent,
    MentorComponent,
    UserComponent,
    TechnologyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    HomeService,
    AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
        fakeBackendProvider
  ],
  bootstrap: [MentorOnDemandComponent]
})
export class MentorOnDemandModule { }
