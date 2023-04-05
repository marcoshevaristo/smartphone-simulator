import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent {
  @Input()
  public label: string;
  @Input()
  public model: string;
  @Input()
  public numeric = false;
  @Input()
  public regex: RegExp;
  @Input()
  public error: string;
  @Output()
  public modelChange = new EventEmitter<string>();
}
