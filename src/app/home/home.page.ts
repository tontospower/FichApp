import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Entry } from '../interfaces/entry';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public entries: any[];
  private anteriorElement: Entry;

  constructor(private dataService: DataService,
              private alertController: AlertController) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getEntries();
  }

  async presentAlertConfirm(item: Entry) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Eliminar registro?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'primary',
        }, {
          text: 'Sí',
          cssClass: 'secondary',
          handler: () => {
            this.removeItem(item);
          }
        }
      ]
    });

    await alert.present();
  }

  public getEntries(): void {
    this.dataService.getEntries()
      .subscribe(entries => {
        entries.forEach(element => {
          if (entries.indexOf(element) > 0) {
            if (this.anteriorElement.type === 'E' && element.type === 'S') {
              element.diffTimeValue = element.date.valueOf() - this.anteriorElement.date.valueOf();
              var time = new Date(element.diffTimeValue);
              element.diffTime = time;
            } else if (this.anteriorElement.type === 'S' && element.type === 'E') {
              element.diffTimeValue = 0;
              element.diffTime = null;
            } else if ((this.anteriorElement.type === 'S' && element.type === 'S') || (this.anteriorElement.type === 'E' && element.type === 'E')) {
              element.diffTimeValue = -1;
              element.diffTime = null;
            }
          } else {
            this.anteriorElement = element;
          }
        });

        this.entries = entries;
      }
      );
  }

  public removeItem(item: Entry) {
    this.dataService.removeEntry(item);
  }

}
