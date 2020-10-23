import { Injectable } from '@angular/core';

import { Tile, Location } from '../tile/tile.class';
import { PuzzleTile } from '../puzzleTile/puzzle-tile.class';
import { GameState } from '../state/state.class';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  private _prepTiles: Tile[] = [];
  tiles: PuzzleTile[];
  tileSize;
  current;
  puzzelImage: string;
  images = [
    prefixPath('../../assets/digi.png')
  ]

  constructor(private store: Store) { }

  initialize(): void {
    this.puzzelImage = this.images[0];
    // preparing end result state by adding indexes to the right locations
    let tileIndex = 0;
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        this._prepTiles.push(new Tile(++tileIndex, new Location(this.tileSize * x, this.tileSize * y)));
      }
    }
    this.mapTiles();
  }

  private _getTileByLoc(left, top) {
    return this.tiles[this.tiles.map((evt) => {
      return evt.current.location.left === left && evt.current.location.top === top;
    }).indexOf(true)];
  }

  /**
   * get tiles that one can move
   */
  _getAvailableTiles() {
    let blank = this._getBlankTile();
    let blankLoc = blank.current.location;
    let availableTiles = [];

    /**
     * check availability left and right
     */
    if (blankLoc.left === this.tileSize) {
      availableTiles.push(this._getTileByLoc(blankLoc.left - this.tileSize, blankLoc.top));
      availableTiles.push(this._getTileByLoc(blankLoc.left + this.tileSize, blankLoc.top));
    } else if (blankLoc.left < this.tileSize) {
      // right hand side
      availableTiles.push(this._getTileByLoc(blankLoc.left + this.tileSize, blankLoc.top));
    } else {
      // left hand side
      availableTiles.push(this._getTileByLoc(blankLoc.left - this.tileSize, blankLoc.top));
    }

    /**
     * check availability vertically
     */
    if (blankLoc.top === this.tileSize) {
      // considering both, up and down
      availableTiles.push(this._getTileByLoc(blankLoc.left, blankLoc.top - this.tileSize));
      availableTiles.push(this._getTileByLoc(blankLoc.left, blankLoc.top + this.tileSize));
    } else if (blankLoc.top < this.tileSize){
      // bottom side
      availableTiles.push(this._getTileByLoc(blankLoc.left, blankLoc.top + this.tileSize));
    } else {
      // top side
      availableTiles.push(this._getTileByLoc(blankLoc.left, blankLoc.top - this.tileSize));
    }
    highlightTile(availableTiles);
    return availableTiles;
  }

  /**
   * is game over
   */
  private _goalTest() {
    for (let tile of this.tiles) {
      let goal = tile.isGoal();
      if (!goal) {
        return false;
      }
    }
    return true;
  }

  private _getBlankTile() {
    return this.tiles[15];
  }

  /**
   * new puzzle
   */
  shuffle() {
    this._prepTiles = shuffleArray(this._prepTiles);

    // shuffle until puzzle is solvable
    if (!isSolvable(this._prepTiles)) {
      this.shuffle();
      return;
    }
    this._prepTiles.map((tile, i) => {
      this.tiles[i].current = this._prepTiles[i];
    });
    this.updateState();
  }

  solve() {
    alert('Not sovable yet.');
  }

  move(tile: PuzzleTile) {
    let blank = this._getBlankTile();
    let blankLoc = this._getBlankTile().current.location;
    let tileLoc = this.current.location;

    // horizontally checking
    if (tileLoc.top === blankLoc.top) {
      if (tileLoc.left - blankLoc.left === this.tileSize) {
        console.log('LeftSide');
      } else if (blankLoc.left - tileLoc.left === this.tileSize) {
        console.log('RightSide');
      } else {
        console.log('unable to move this one');
        return;
      }
    }

    /**
     * Checking movability vertically
     */
    else if (tileLoc.left === blankLoc.left) {
      if (tileLoc.top - blankLoc.top === this.tileSize) {
        console.log('TopSide');
      } else if (blankLoc.top - tileLoc.top === this.tileSize) {
        console.log('BottomSide');
      } else {
        console.log('unable to move this one');
        return;
      }
    } else {
      console.log('unable to move');
      return;
    }
    let temp = tile.current;
    tile.current = blank.current;
    blank.current = temp;

    this.updateState();
  }

  /**
   * updating puzzle state
   */
  updateState(): void {
    const payload = JSON.stringify({
      tiles: this.tiles,
      goal: this._goalTest(),
      image: this.puzzelImage,
      tileSize: this.tileSize
    });
    this.store.dispatch({
      type: payload
    });
  }

  updateImage(index): void {
    this.puzzelImage = this.images[index];
    this.updateState();
  }

  mapTiles(): void {
    // adding locations to tiles
    this.tiles = [];
    this._prepTiles.map((tile) => this.tiles.push(new PuzzleTile(tile)));
    this.updateState();
  }
}

const prefixPath = (path) => {
  return 'digi' + path;
};

const highlightTile = (availableTiles) => {
  console.log('Tiles to switch');
  availableTiles.map((e) => {
    console.log(e.goal.index + ' ');
  });
};

/**
 * to see if puzzle is solvable
 */
var isSolvable = (arr: Tile[]) => {
  let invCount = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      if (arr[j].index > arr[i].index) {
        invCount++;
      }
    }
    return (invCount % 2 === 0);
  }
};

var shuffleArray = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};


