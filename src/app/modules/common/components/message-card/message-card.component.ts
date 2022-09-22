import { Component, Input } from '@angular/core';
import { dropDownAnimation } from '../../animations/drop-down.animation';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss'],
  animations: [dropDownAnimation],
})
export class MessageCardComponent {
  @Input() public theme!: string;
  @Input() public from!: string;
  @Input() public content!: string;

  public isOpen: boolean = false;
}
