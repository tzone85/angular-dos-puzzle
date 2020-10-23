import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from '../state/state.class';
import { PuzzleService } from '../puzzle/puzzle.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  // template: '<board [state] = "gameState | async" (move)="moveTile($event)"></board>',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {

  gameState: any;

  constructor(private puzzle: PuzzleService, private store: Store<GameState>) {
    this.gameState = this.store.select(() => 'state');
  }


  ngOnInit(): void {
    this.windowSizes();
    this.puzzle.initialize();
  }

  windowSizes() {
    if (window.innerWidth > window.innerHeight) {
      // use this for the bigger screens
      if (window.innerWidth < 600) {
        console.log('width screen size < 600');
        this.puzzle.tileSize = Math.floor((window.innerHeight - 230) / 4);
      } else {
        console.log('screen width > 600');
        this.puzzle.tileSize = Math.floor((window.innerHeight - 200) / 4);
  }
  } else {
      // mobile screen sizes
      if (window.innerHeight < 500) {
        console.log('mobile screen > 500');
        this.puzzle.tileSize = Math.floor((window.innerHeight - 90) / 4);
      } else {
        console.log('screen > 500');
        this.puzzle.tileSize = Math.floor((window.innerWidth - 50) / 4);
      }
    }
  }
  moveTile(tile) {
    this.puzzle.move(tile);
  }
}
