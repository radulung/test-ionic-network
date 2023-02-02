import { NgZone } from '@angular/core';
import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { RefresherCustomEvent } from '@ionic/angular';

import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private data: DataService, private network: Network, private ngZone: NgZone) { }

   public ionViewWillEnter(): void {
    this.subscribeToNetwork();
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

   public subscribeToNetwork(): void {
    this.network.onConnect().subscribe(() => {
      this.ngZone.run(() => {
        console.log('CONNECT')
      });
    });

    this.network.onDisconnect().subscribe(() => {
      this.ngZone.run(() => {
        console.log('DISCONNECT')
      });
    });
  }
}
