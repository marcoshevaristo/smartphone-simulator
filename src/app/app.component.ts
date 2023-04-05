import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  template: `
    <ngx-loading [show]="loading"></ngx-loading>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnDestroy {
  public loading = false;
  private _subscription = new Subscription();
  constructor(private loadingService: LoadingService) {
    this._subscription.add(
      this.loadingService.loading$.subscribe((loading) => {
        this.loading = loading;
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
