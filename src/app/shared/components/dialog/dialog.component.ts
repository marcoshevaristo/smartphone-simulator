import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @ContentChild('header') header: TemplateRef<{}>;
  @ContentChild('content') content: TemplateRef<{}>;
  @ContentChild('footer') footer: TemplateRef<{}>;
}
