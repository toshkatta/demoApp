import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { RegisterComponent } from './components/register/register.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { AppRoutingModule } from './app-routing.module'
import { HomeComponent } from './components/home/home.component'
import { ProfileComponent } from './components/profile/profile.component'
import { LoginComponent } from './components/login/login.component'

import { FileUploadModule } from 'ng2-file-upload';
import { SneakerAdminComponent } from './components/sneaker-admin/sneaker-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NotFoundComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    SneakerAdminComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
