import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other',
  templateUrl: './other.page.html',
  styleUrls: ['./other.page.scss'],
})
export class OtherPage implements OnInit {
  public appPages = [
    { title: 'Nivel semanal equivalente', url: '/folder/other/nse', icon: 'speedometer' },
    { title: 'Cálculo del tiempo máximo de exposición', url: '/folder/other/ctm', icon: 'calculator' },

  ];
  constructor() { }

  ngOnInit() {
  }

}
