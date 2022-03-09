import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  isLoading: boolean = false
  error: string = null
  private loginSub: Subscription

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.isLoading = true
    this.loginSub = this.authService.login({
      "UserName": form.value.username,
      "Password": form.value.password
    })
    .subscribe({
      next: res => {
        this.isLoading = false
        this.router.navigate(['/heroes/my-heroes'])
      },
      error: e => {
        this.error = 'Invalid user name or password'
        this.isLoading = false
      }
    })

    form.reset()
  }

  ngOnDestroy(): void {
    if (this.loginSub){
      this.loginSub.unsubscribe()
    }
  }
}
