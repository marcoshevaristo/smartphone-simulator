import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmartphoneSimulatorService } from 'src/app/services/smartphone-simulator.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppCardComponent } from './components/app-card/app-card.component';
import { AppFormComponent } from './components/app-form/app-form.component';
import { SmartphoneSimulatorComponent } from './smartphone-simulator.component';

const routes: Routes = [
  {
    path: '',
    component: SmartphoneSimulatorComponent,
  },
];

@NgModule({
  declarations: [SmartphoneSimulatorComponent, AppCardComponent, AppFormComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [SmartphoneSimulatorService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SmartphoneSimulatorModule {}
