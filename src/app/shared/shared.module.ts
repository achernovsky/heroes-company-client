import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        PageNotFoundComponent,
        ServerErrorComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        CommonModule
    ]
})

export class SharedModule { }