import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PuzzleService} from '../puzzle/puzzle.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent {

  constructor(public puzzle: PuzzleService) { }

}
