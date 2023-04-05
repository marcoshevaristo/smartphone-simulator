import { Component, EventEmitter, Input, Output } from '@angular/core';
import { App } from 'src/app/models/app.model';
import { SmartphoneSimulatorService } from 'src/app/services/smartphone-simulator.service';

@Component({
  selector: 'app-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss'],
})
export class AppFormComponent {
  @Input()
  public edit = false;
  @Input()
  public formValue: App = new App();
  @Output()
  public afterSave = new EventEmitter<void>();
  @Output()
  public onCancel = new EventEmitter<void>();

  public readonly semanticVersionRegex =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

  constructor(private smartphoneSimulatorService: SmartphoneSimulatorService) {}

  submit() {
    if (this._isFormValid()) {
      let currentAppList = this.smartphoneSimulatorService.smartphoneApps$.value;
      if (this.edit) {
        currentAppList = currentAppList.map((app) => {
          if (app.id === this.formValue.id) {
            app = { ...this.formValue };
          }
          return app;
        });

        this.smartphoneSimulatorService.smartphoneApps$.next([...currentAppList]);
      } else {
        this.smartphoneSimulatorService.smartphoneApps$.next([...currentAppList, { ...this.formValue }]);
      }
      this.afterSave.emit();
      this.formValue = new App();
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  private _isFormValid() {
    const { name, version, contactInfo } = this.formValue;
    return name && contactInfo && version.match(this.semanticVersionRegex);
  }
}
