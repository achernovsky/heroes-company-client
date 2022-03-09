import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeroesService } from 'src/app/heroes/heroes.service';

@Component({
  selector: 'app-create-hero-page',
  templateUrl: './create-hero-page.component.html',
  styleUrls: ['./create-hero-page.component.css']
})
export class CreateHeroPageComponent implements OnInit, OnDestroy {
  heroName: string
  suitColors: string
  startingPower: number
  ability: string
  isLoading: boolean = false
  private createHeroSub: Subscription

  constructor(private heroService: HeroesService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.createHeroSub != undefined) {
      this.createHeroSub.unsubscribe()
    }
  }

  onSubmit(form: NgForm) {
    this.isLoading = true
    const newHero = {
      name: this.heroName,
      suitColors: this.suitColors,
      startingPower: this.startingPower,
      ability: this.ability
    }
    this.createHeroSub = this.heroService.createHero(newHero)
    .subscribe(res => {
      console.log("created successfully")
      this.router.navigate(['/heroes/my-heroes'])
    })
  }
}
