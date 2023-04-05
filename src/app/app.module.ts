import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [CoreModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, NgxLoadingModule.forRoot({})],
  bootstrap: [AppComponent],
})
export class AppModule {}
