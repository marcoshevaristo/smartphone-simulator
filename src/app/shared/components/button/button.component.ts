import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant = 'default' | 'delete';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  public label: string;
  @Input()
  public icon: string;
  @Input()
  public disabled = false;
  @Input()
  public variant: ButtonVariant = 'default';

  @Output()
  public onClick = new EventEmitter<MouseEvent>();

  clickEvent($event) {
    if (!this.disabled) {
      $event.stopPropagation();
      this.onClick.emit();
    }
  }
}
