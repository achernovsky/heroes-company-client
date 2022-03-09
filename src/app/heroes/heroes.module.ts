import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CreateHeroPageComponent } from "./components/create-hero-page/create-hero-page.component";
import { HeroComponent } from "./components/hero-card/hero-card.component";
import { HeroesListComponent } from "./components/heroes-list/heroes-list.component";
import { HeroesRoutingModule } from "./heroes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { HeroesService } from "./heroes.service";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
    declarations: [
        HeroComponent,
        HeroesListComponent,
        CreateHeroPageComponent,
    ],
    imports: [
        RouterModule,
        SharedModule, 
        FormsModule, 
        HeroesRoutingModule,
        NgxPaginationModule
    ],
    providers: [HeroesService]
})

export class HeroesModule { }