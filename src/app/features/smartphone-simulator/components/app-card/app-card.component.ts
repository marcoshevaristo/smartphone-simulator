import { Component, EventEmitter, Input, Output } from '@angular/core';
import { App } from 'src/app/models/app.model';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss'],
})
export class AppCardComponent {
  @Input()
  public app: App;
  @Output()
  public onClickApp = new EventEmitter<App>();
  @Output()
  public onClickEdit = new EventEmitter<App>();
  @Output()
  public onClickRemove = new EventEmitter<App>();

  constructor() {}

  appClick() {
    this.onClickApp.emit(this.app);
  }

  edit() {
    this.onClickEdit.emit(this.app);
  }

  remove() {
    this.onClickRemove.emit(this.app);
  }
}
