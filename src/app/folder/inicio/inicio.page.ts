import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public appPages = [
    { title: 'Sobre la aplicación', url: '/folder/about/tabs/info1', icon: 'reader' },
    { title: 'Nivel diario equivalente', url: '/folder/nde', icon: 'speedometer' },
    { title: 'Otros cálculos', url: '/folder/other', icon: 'calculator' },
    { title: 'Recursos adicionales', url: '/folder/recursos', icon: 'book' },
    { title: 'CUMD', url: '/folder/spam', icon: 'school' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
