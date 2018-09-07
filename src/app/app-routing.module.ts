import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { RegisterComponent } from "./components/register/register.component"
import { NotFoundComponent } from "./components/not-found/not-found.component"
import { HomeComponent } from "./components/home/home.component"
import { ProfileComponent } from "./components/profile/profile.component"
import { LoginComponent } from "./components/login/login.component"

import { UserLoggedInGuard } from "./guards/user-logged-in.guard"
import { NegateUserLoggedInGuard } from "./guards/negate-user-logged-in.guard";

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NegateUserLoggedInGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NegateUserLoggedInGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [UserLoggedInGuard]
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