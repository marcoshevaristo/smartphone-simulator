import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay, tap } from 'rxjs';
import { App } from 'src/app/models/app.model';
import { LoadingService } from 'src/app/services/loading.service';
import { SmartphoneSimulatorService } from 'src/app/services/smartphone-simulator.service';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-smartphone-simulator',
  templateUrl: './smartphone-simulator.component.html',
  styleUrls: ['./smartphone-simulator.component.scss'],
})
export class SmartphoneSimulatorComponent implements OnInit, OnDestroy, AfterViewInit {
  public pageCount = 1;
  public pageCountArray = [0];
  public currentPage = 0;
  public readonly pageSize = 9;

  public apps: App[];
  public selectedApp: App;

  public displayContactModal = false;
  public displayEditionModal = false;
  public displayConfirmRemovalModal = false;

  private _subscription = new Subscription();

  constructor(public smartphoneSimulatorService: SmartphoneSimulatorService, private loadingService: LoadingService) {}

  ngOnInit(): void {
    let listInitializated = false;
    this._subscription.add(
      this.smartphoneSimulatorService.smartphoneApps$
        .pipe(
          tap(() => {
            this.loadingService.loading$.next(true);
          }),
          delay(1000)
        )
        .subscribe((allApps) => {
          const newPageCount = Math.ceil(allApps.length / this.pageSize) || 1;
          if (listInitializated) {
            const swiperEl = document.querySelector('swiper-container') as any;
            if (allApps.length > this.apps.length) {
              swiperEl.swiper.slideNext();
            } else if (newPageCount < this.pageCount) {
              swiperEl.swiper.slidePrev();
            }
          }
          listInitializated = true;
          this.apps = allApps;
          this.pageCount = newPageCount;
          this.pageCountArray = new Array(this.pageCount);
          for (let i = 0; i < this.pageCount; i++) {
            this.pageCountArray[i] = i;
          }
          this.loadingService.loading$.next(false);
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      register();

      const swiperEl = document.querySelector('swiper-container') as any;
      swiperEl.addEventListener('slidechange', (event: any) => {
        this.currentPage = event.detail[0].snapIndex;
      });
    }, 1000);
  }

  getPageStartingIndex(pageNumber: number) {
    return !pageNumber ? 0 : pageNumber * this.pageSize;
  }

  onClickApp(app: App) {
    this.selectedApp = { ...app };
    this.displayContactModal = true;
  }

  closeContactModal() {
    this.selectedApp = undefined;
    this.displayContactModal = false;
  }

  onEditApp(app: App) {
    this.selectedApp = { ...app };
    this.displayEditionModal = true;
  }

  closeEditingModal() {
    this.selectedApp = undefined;
    this.displayEditionModal = false;
  }

  onRemoveApp(app: App) {
    this.selectedApp = { ...app };
    this.displayConfirmRemovalModal = true;
  }

  confirmRemoval() {
    this.smartphoneSimulatorService.removeApp(this.selectedApp);
    this.displayConfirmRemovalModal = false;
    this.selectedApp = undefined;
  }

  closeConfirmRemovalModal() {
    this.selectedApp = undefined;
    this.displayConfirmRemovalModal = false;
  }
}
