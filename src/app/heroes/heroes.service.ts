import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Hero } from './hero.model';
import { environment } from '../../environments/environment'

@Injectable()
export class HeroesService {

    constructor(private http: HttpClient) {}

    heroesChanged = new Subject<Hero[]>()

    getAllHeroes() {
        return this.http.get(`${environment.apiUrl}/heroes`)
    }

    getMyHeroes(id: string) {
        return this.http.get(`${environment.apiUrl}/heroes/trainer/${id}`)
    }

    createHero(hero: any) {
        return this.http.post(`${environment.apiUrl}/heroes`, hero)
    }

    trainHero(id: string) {
        return this.http.patch(`${environment.apiUrl}/heroes/${id}`, {})
    }
}