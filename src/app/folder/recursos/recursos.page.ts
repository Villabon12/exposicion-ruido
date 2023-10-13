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
    { title: 'Resolución 8321 del 4 de agosto de 1983', url: 'https://www.cornare.gov.co/SIAR/aire/RUIDO/NORMATIVA/Resolucion-8321-1983.pdf', icon: 'book' },
    { title: 'Resolución 2400 de 1979 Ministerio del Trabajo capitulo IV', url: 'https://www.bogotajuridica.gov.co/sisjur/normas/Norma1.jsp?i=53565', icon: 'book' },
    { title: 'RESOLUCION 0627 DE 2006', url: 'https://www.mincit.gov.co/ministerio/normograma-sig/procesos-de-apoyo/gestion-de-recursos-fisicos/resoluciones/resolucion-627-de-2006.aspx', icon: 'book' },
    { title: 'NTP 270: Evaluación de la exposición al ruido. Determinación de niveles representativos', url: 'https://www.insst.es/documents/94886/327166/ntp_270.pdf/9c674732-ce77-481f-8c38-ffc03579bb75#:~:text=El%20L%20Aeq%2CT%20se,seg%C3%BAn%20se%20especifica%20a%20continuaci%C3%B3n.&text=El%20intervalo%20de%20medici%C3%B3n%20debe,del%20intervalo%20de%20tiempo%20considerado', icon: 'book' },
  ];
  constructor(private platform: Platform) { }

  ngOnInit() {
  }

}
