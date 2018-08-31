import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { RegisterComponent } from "./components/register/register.component"
import { NotFoundComponent } from "./components/not-found/not-found.component"
import { HomeComponent } from "./components/home/home.component"
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginComponent } from "./components/login/login.component";

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
        )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }