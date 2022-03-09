import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/heroes/hero.model';
import { HeroesService } from 'src/app/heroes/heroes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit, OnDestroy {
  heroes: Hero[] = []
  totalRecords: number
  pageNum: number = 1
  isLoading: boolean = false
  isLoggedIn: boolean = false
  isOnMyHeroesPage: boolean = false
  private userSub: Subscription
  private heroesSub: Subscription

  constructor(private heroService: HeroesService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isOnMyHeroesPage = this.route.snapshot.routeConfig.path === "my-heroes"

    this.userSub = this.authService.user.subscribe(user => {
      this.isLoggedIn = !!user
    })

    this.isLoading = true

    if (this.isOnMyHeroesPage) {
      this.heroesSub = this.heroService.getMyHeroes(this.authService.user.value.userid)
        .subscribe((response: Hero[]) => {
          this.getHeroesFromResponse(response)
        });
    }
    else {
      this.heroesSub = this.heroService.getAllHeroes()
      .subscribe((response: Hero[]) => {
        this.getHeroesFromResponse(response)
      });
    }
  }

  ngOnDestroy(): void {
    this.heroesSub.unsubscribe()
    this.userSub.unsubscribe()
  }

  sortHeroes() {
    this.heroes.sort((a, b) => {
      return b.currentPower - a.currentPower
    })
  }

  getHeroesFromResponse(response: Hero[]) {
    this.heroes = response
    this.totalRecords = response.length
    this.sortHeroes();
    this.isLoading = false
  }
}
