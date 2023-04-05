import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { App } from '../models/app.model';
import { StorageService } from './storage.service';

@Injectable()
export class SmartphoneSimulatorService {
  public smartphoneApps$ = new BehaviorSubject<App[]>([]);

  constructor(private storageService: StorageService) {
    const savedApps: App[] = storageService.get('apps');
    const apps = savedApps.length ? savedApps : initialApps;
    this.storageService.set('apps', apps);
    this.smartphoneApps$.next(apps);
  }

  public addApp(app: App) {
    const currentAppList = this.smartphoneApps$.value;
    const newList = [...currentAppList, { ...app }];
    this.storageService.set('apps', newList);
    this.smartphoneApps$.next([...currentAppList, { ...app }]);
  }

  public saveApp(app: App) {
    let currentAppList = this.smartphoneApps$.value;
    currentAppList = currentAppList.map((appItem) => {
      if (appItem.id === app.id) {
        appItem = { ...app };
      }
      return appItem;
    });

    this.storageService.set('apps', currentAppList);
    this.smartphoneApps$.next([...currentAppList]);
  }

  public removeApp(app: App) {
    const newList = this.smartphoneApps$.value.filter((item) => item.id !== app.id);
    this.storageService.set('apps', newList);
    this.smartphoneApps$.next(newList);
  }
}

const initialApps: App[] = [
  new App(
    'App 1',
    '2.1.0',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel maximus tortor. Sed a odio porttitor, luctus quam vitae, tempor enim. Suspendisse elementum porta magna.'
  ),
  new App(
    'App 2',
    '1.0.0',
    'Pellentesque at efficitur magna. Donec vel nisl vestibulum, dignissim lectus nec, posuere lorem. Quisque ultricies orci ut arcu facilisis lobortis. Donec at egestas risus. Morbi vulputate, ipsum eget consequat suscipit, magna nibh gravida dui, ac dictum metus nibh ut ante. Etiam et lacinia ipsum, a aliquet magna. Donec mollis condimentum velit. Aliquam erat volutpat. Nullam mauris est, mattis porttitor orci vel, consectetur mollis mauris. Cras et efficitur nulla.'
  ),
  new App(
    'App 3',
    '10.12.33',
    'Nam arcu purus, dictum eu erat vitae, aliquam suscipit magna. Phasellus eu tincidunt libero. Pellentesque pharetra erat sed nulla mollis venenatis.'
  ),
  new App(
    'App 4',
    '2.6.75',
    'Sed eu urna malesuada, volutpat libero id, iaculis elit. Nulla et arcu vel sapien facilisis gravida. Aliquam ut lorem at nisi vehicula euismod. Donec eu libero arcu.'
  ),
  new App(
    'App 4',
    '2.6.75',
    'Sed eu urna malesuada, volutpat libero id, iaculis elit. Nulla et arcu vel sapien facilisis gravida. Aliquam ut lorem at nisi vehicula euismod. Donec eu libero arcu.'
  ),
  new App(
    'App 4',
    '2.6.75',
    'Sed eu urna malesuada, volutpat libero id, iaculis elit. Nulla et arcu vel sapien facilisis gravida. Aliquam ut lorem at nisi vehicula euismod. Donec eu libero arcu.'
  ),
  new App(
    'App 4',
    '2.6.75',
    'Sed eu urna malesuada, volutpat libero id, iaculis elit. Nulla et arcu vel sapien facilisis gravida. Aliquam ut lorem at nisi vehicula euismod. Donec eu libero arcu.'
  ),
  new App(
    'App 4',
    '2.6.75',
    'Sed eu urna malesuada, volutpat libero id, iaculis elit. Nulla et arcu vel sapien facilisis gravida. Aliquam ut lorem at nisi vehicula euismod. Donec eu libero arcu.'
  ),
  new App(
    'App 4',
    '2.6.75',
    'Sed eu urna malesuada, volutpat libero id, iaculis elit. Nulla et arcu vel sapien facilisis gravida. Aliquam ut lorem at nisi vehicula euismod. Donec eu libero arcu.'
  ),
  new App(
    'App 4',
    '2.6.75',
    'Sed eu urna malesuada, volutpat libero id, iaculis elit. Nulla et arcu vel sapien facilisis gravida. Aliquam ut lorem at nisi vehicula euismod. Donec eu libero arcu.'
  ),
];
