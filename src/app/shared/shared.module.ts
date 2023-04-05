import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { TextFieldComponent } from './components/text-field/text-field.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, ButtonComponent, TextFieldComponent, DialogComponent],
  declarations: [ButtonComponent, TextFieldComponent, DialogComponent],
})
export class SharedModule {}
