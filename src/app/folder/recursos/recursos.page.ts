import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
declare var cordova: any; // Esto te permite acceder a la API de cordova

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.page.html',
  styleUrls: ['./recursos.page.scss'],
})
export class RecursosPage implements OnInit {

  openLink(url: string) {
    if (this.platform.is('capacitor')) { // Si estás en un dispositivo móvil con Capacitor
      cordova.InAppBrowser.open(url, '_system'); // '_system' abre el enlace en el navegador predeterminado del dispositivo
    } else { // Si estás en la web
      window.open(url, '_blank'); // Abre el enlace en una nueva pestaña o ventana
    }
  }
  
  public appPages = [
    { title: 'Referencia 1', url: 'https://www.google.com/', icon: 'book' },
    { title: 'Referencia 2', url: 'https://www.google.com/', icon: 'book' },
    { title: 'Referencia 3', url: 'https://www.google.com/', icon: 'book' },
    { title: 'Referencia 4', url: 'https://www.google.com/', icon: 'book' },
    { title: 'Referencia 5', url: 'https://www.google.com/', icon: 'book' },
  ];
  constructor(private platform: Platform) { }

  ngOnInit() {
  }

}
