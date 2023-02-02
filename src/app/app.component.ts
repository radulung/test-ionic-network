import { Component, NgZone } from "@angular/core";
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private network: Network, private ngZone: NgZone) {}

  public ionViewWillEnter(): void {
    this.subscribeToNetwork();
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
