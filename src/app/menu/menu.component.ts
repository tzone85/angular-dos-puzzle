import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PuzzleService} from '../puzzle/puzzle.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent{

  constructor(public puzzle: PuzzleService) { }

}
