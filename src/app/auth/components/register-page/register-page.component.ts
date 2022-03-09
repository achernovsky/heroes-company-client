import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  isLoading: boolean = false
  error: string = null
  private registerSub: Subscription

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.isLoading = true

    this.registerSub = this.authService.register({
      "UserName": form.value.username,
      "Password": form.value.password,
    })
    .subscribe({
      next: res => {
        this.isLoading = false
        this.router.navigate(['/login'])
      },
      error: e => {
        this.error = 'Invalid data'
        this.isLoading = false
      }
    })
    form.reset()
  }

  ngOnDestroy(): void {
    if (this.registerSub){
      this.registerSub.unsubscribe()
    }
  }
}
