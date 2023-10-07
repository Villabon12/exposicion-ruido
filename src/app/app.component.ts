import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/inicio', icon: 'home' },
    { title: 'Sobre la aplicación', url: '/folder/about/tabs/info1', icon: 'reader' },
    { title: 'Nivel diario equivalente', url: '/folder/nde', icon: 'speedometer' },
    { title: 'Otros cálculos', url: '/folder/other', icon: 'calculator' },
    { title: 'Recursos adicionales', url: '/folder/recursos', icon: 'book' },
    { title: 'INSST', url: '/folder/spam', icon: 'school' },
  ];
  constructor() {}
}
