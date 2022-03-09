import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "./user.model";
import { environment } from '../../environments/environment'
import { Router } from "@angular/router";

interface AuthResponseData {
    "token": string,
    "userid": string,
    "username": string,
    "expires": Date
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null)
    private tokenExpirationTimer: any

    constructor(private http: HttpClient, private router: Router) { }

    register(userCredentials) {
        return this.http.post<AuthResponseData>(`${environment.apiUrl}/users/register`, userCredentials)
    }

    login(userCredentials) {
        return this.http.post<AuthResponseData>(`${environment.apiUrl}/users/login`, userCredentials)
        .pipe(tap(response => {
            const user = new User(response.userid, response.username, response.token, response.expires)
            this.user.next(user)
            const expiresIn: number = new Date(user.tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expiresIn)
            sessionStorage.setItem('userData', JSON.stringify(user))
        }))
    }

    autoLogin() {
        const userData: {
            userid: string, 
            username: string,
            _token: string,
            _tokenExpirationDate: Date
        } = JSON.parse(sessionStorage.getItem('userData'))
        if (!userData) {
            return
        }

        const loadedUser = new User(userData.userid, userData.username, userData._token, userData._tokenExpirationDate)

        if (loadedUser.token) {
            this.user.next(loadedUser)
            const expiresIn: number = new Date(loadedUser.tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expiresIn)
        }
    }

    logout() {
        this.user.next(null)
        sessionStorage.removeItem('userData')
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.router.navigate(["/auth/login"])
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration)
    }
}