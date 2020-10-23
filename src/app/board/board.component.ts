import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, Renderer2} from '@angular/core';
import {PuzzleTile} from '../puzzleTile/puzzle-tile.class';
import { GameState } from '../state/state.class';
import { TileDimension } from '../interfaces/tileDimension';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  @Input() state: GameState;
  @Output() move = new EventEmitter<PuzzleTile>();

  backgroundSize;
  showNumbers = false;
  @ViewChild('board') board: ElementRef;
  @ViewChild('background') background: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.settingStyles();
  }

  settingStyles(): void {
    const boardSize = this.state.tileSize * 4;
    console.log('######### State: ', this.state);
    this.backgroundSize = boardSize + 'px ' + boardSize + 'px';
    this.renderer.setStyle(this.board.nativeElement, 'width', boardSize + 'px');
    this.renderer.setStyle(this.board.nativeElement, 'height', boardSize + 'px');
    this.renderer.setStyle(this.background.nativeElement, 'background-size', this.backgroundSize);
  }
  getStyles(tile: PuzzleTile): TileDimension {
    return {
      top: tile.current.location.top + 'px',
      left: tile.current.location.left + 'px',
      width: this.state.tileSize + 'px',
      height: this.state.tileSize + 'px',
      display: (tile.isBlank) ? 'none' : 'flex',
      backgroundImage: 'url(' + this.state.image + ')',
      backgroundPosition: (-tile.goal.location.left) + 'px' + (-tile.goal.location.top) + 'px',
      backgroundSize: this.backgroundSize
    };
  }

  moveTile(tile): void {
    if (this.state.goal) {
      return;
    }
    this.move.emit(tile);
  }

}
