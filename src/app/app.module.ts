import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GameComponent } from './game/game.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import {PuzzleService} from './puzzle/puzzle.service';
import {stateReducer} from './store/state.reducer';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GalleryComponent,
    GameComponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: GameComponent}
      // {path: '', component: BoardComponent}
    ]),
    StoreModule.forRoot({state: stateReducer}),
    // StoreModule.
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    PuzzleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
