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

  public errors: Partial<App> = {};

  public readonly semanticVersionRegex =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

  constructor(private smartphoneSimulatorService: SmartphoneSimulatorService) {}

  submit() {
    if (this._isFormValid()) {
      if (this.edit) {
        this.smartphoneSimulatorService.saveApp(this.formValue);
      } else {
        this.smartphoneSimulatorService.addApp(this.formValue);
      }
      this.afterSave.emit();
      this.formValue = new App();
    }
  }

  cancel() {
    this.onCancel.emit();
  }

  private _isFormValid() {
    const currentAppList = this.smartphoneSimulatorService.smartphoneApps$.value;
    const { id, name, version, contactInfo } = this.formValue;
    this.errors.name = !name ? 'Name is required' : '';
    if (
      !this.errors.name &&
      currentAppList.some(
        (item) => (!this.edit || (this.edit && item.id !== id)) && item.name.toUpperCase() === name.toUpperCase()
      )
    ) {
      this.errors.name = currentAppList.some((item) => item.name.toUpperCase() === name.toUpperCase())
        ? 'Name is already in the list'
        : '';
    }
    this.errors.version = !version?.match(this.semanticVersionRegex)
      ? 'Version must follow the semantic versioning pattern, e.g: X.XX.XX'
      : '';
    this.errors.contactInfo = !contactInfo ? 'Contact is required' : '';
    return !Object.values(this.errors).some((error) => error);
  }
}
