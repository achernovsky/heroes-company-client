import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthService } from "./auth.service";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";

@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent
    ],
    imports: [
        RouterModule,
        SharedModule, 
        FormsModule, 
        AuthRoutingModule
    ]
})

export class AuthModule { }