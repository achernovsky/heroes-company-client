import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Hero } from 'src/app/heroes/hero.model';
import { Subscription } from 'rxjs';
import { HeroesService } from 'src/app/heroes/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() hero: Hero
  @Input() isMyHero: boolean
  @Output() heroTrained = new EventEmitter()
  reachedDailyLimit: boolean = false
  errorMsg: string
  private heroTrainingSub: Subscription

  constructor(private heroService: HeroesService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.heroTrainingSub != undefined) {
      this.heroTrainingSub.unsubscribe()
    }
  }

  sortHeroes() {
    this.heroTrained.emit();
  }

  trainHero() {
    this.heroTrainingSub = this.heroService.trainHero(this.hero.id)
    .subscribe({
      next: (res: number) => {
        if (res === -1) {
          this.errorMsg = "This hero already reached his daily training limit"
          this.reachedDailyLimit = true
        } else {
          this.hero.currentPower += res
          this.sortHeroes()
        }
      }
    })
  }
}
