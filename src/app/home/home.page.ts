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
  private sumaTimes: number=0;
  public sumaTiempoTotal: string;
  public sumaTiempoReal:string;
  private timerId: any;

  constructor(private dataService: DataService,
              private alertController: AlertController) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.sumaTimes=0;
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
              element.diffTime =  this.dataService.ConverToTime(element.diffTimeValue);
            } else if (this.anteriorElement.type === 'S' && element.type === 'E') {
              element.diffTimeValue = 0;
              element.diffTime = null;
            } else if ((this.anteriorElement.type === 'S' && element.type === 'S') || (this.anteriorElement.type === 'E' && element.type === 'E')) {
              element.diffTimeValue = 0;
              element.diffTime = null;
            }

            this.sumaTimes += element.diffTimeValue;

            console.log(this.sumaTimes, this.dataService.ConverToTime(this.sumaTimes));
            this.anteriorElement = element;
            this.sumaTiempoTotal = this.dataService.ConverToTime(this.sumaTimes);
          } else {
            this.anteriorElement = element;
          }
        });

        if ( this.anteriorElement){

        }
        if (this.anteriorElement.type === 'E'){
          this.startClock();
        } else if (this.anteriorElement.type === 'S') {
          this.stopClock();
        }
        this.entries = entries;
      }
      );
  }

  public removeItem(item: Entry) {
    this.dataService.removeEntry(item);
  }

startClock(){
  this.timerId = setInterval(() => {
    let suma: number;
    let date : Date = new Date();

    suma = date.valueOf() - this.entries[this.entries.length -1].date.valueOf();
    this.sumaTiempoReal= this.dataService.ConverToTime(suma);
  }, 1);
}

stopClock(){
  this.sumaTiempoReal=this.sumaTiempoTotal ;
  clearInterval(this.timerId);
}



}
