import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { dataImage64 } from './image';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-ctm',
  templateUrl: './ctm.page.html',
  styleUrls: ['./ctm.page.scss'],
})
export class CtmPage implements OnInit {
  selectedMethod: number | null = null;
  noiseLevels1: number;
  horas: number;
  minutos: number;
  // Declara las otras variables numéricas aquí
  currentStep = 1;
  pdfObject: any;
  pdfSaved: boolean = false;

  nextStep() {
    if (this.currentStep === 1 && !this.selectedMethod && !this.noiseLevels1) {
      // Muestra un mensaje de error
      alert('Por favor, elige un método de medida.');
      return;
    }
    this.currentStep++;
    if (this.currentStep === 2) {
      const datos = this.calculateMaxExposureTime(this.noiseLevels1,this.selectedMethod);
      this.horas = datos.hours;
      this.minutos = datos.minutes;
    }

    if (this.currentStep > 2) {
      // Si supera el número total de pasos, puedes resetearlo o navegar a otra página
      this.currentStep = 1;
    }
  }

  previousStep() {
    this.currentStep--;
    if (this.currentStep < 1) {
      // Si es menor al primer paso, puedes resetearlo o manejarlo de otra manera
      this.currentStep = 1;
    }
  }

  calculateMaxExposureTime(L_AeqT, Lref, Tref = 8) {
    const T = Tref / Math.pow(2, (L_AeqT - Lref) / 3);
    
    // Convertir la parte decimal en minutos
    const hours = Math.floor(T);
    const minutes = Math.round((T - hours) * 60);
    
    return { hours, minutes };
  }

  generatePDF() {
    var dd = {
      content: [
        {
          image: dataImage64,
          width: 150,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        {
          text: 'INFORME - Evaluación de la exposición al ruido',
          bold: true,
          fontSize: 16,
          margin: [0, 0, 0, 10],
          alignment: 'center',
        },
        'Esta herramienta facilita el cálculo de las ecuaciones básicas para la evaluación de la exposición a ruido',
        {
          text: 'Resultado',
          bold: true,
          fontSize: 12,
          margin: [0, 0, 0, 10],
        },
        {
          text: 'Calculo del tiempo máximo de exposición',
          fontSize: 12,
          margin: [0, 0, 0, 10],
          alignment: 'center',
        },
        {
          text: this.horas + ' h / ' + this.minutos + ' min',
          margin: [0, 0, 0, 10],
          alignment: 'center',
          bold: true,
        },
        
        {
          text: 'Datos de partida',
          margin: [0, 10, 0, 10],
          bold: true,
          alignment: 'center',
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 515,
              y2: 5,
              lineWidth: 1,
            },
          ],
          margin: [0, 10, 0, 0], // [izquierda, arriba, derecha, abajo]
        },
        {
          text: 'Seleccione del método de cálculo que desee utilizar',
          margin: [0, 10, 0, 10],
          bold: true,
        },
        {
          text: 'Calculo del tiempo máximo de exposición',
          margin: [0, 10, 0, 10],
        },
        
        { text: 'Entrada de datos:', margin: [0, 10, 0, 5] },

        //datos en tabla
        {
          table: {
            widths: ['*','*'],
            body: [
              ['Valor de LAeq,T dB(A)', 'L red'],
              [this.noiseLevels1, this.selectedMethod]
            ],
          },
        },
        
        {
          text: 'Nota: La Uniminuto no garantiza la representatividad de los datos en la situación real del trabajo puesto que desconoce cómo se han obtenido, si los equipos son adecuados y si están correctamente calibrados, etc. Copyright. ©CUMD. Colombia. ',
          margin: [0, 10, 0, 0],
          fontSize: 8,
          italics: true,
        },
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 15,
        },
      },
      defaultStyle: {
        fontSize: 12,
      },
    };

    this.pdfObject = pdfMake.createPdf(<any>dd);
    this.downloadPdf();
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObject.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file
          .writeFile(this.file.dataDirectory, 'myletter.pdf', blob, {
            replace: true,
          })
          .then((fileEntry) => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(
              this.file.dataDirectory + 'myletter.pdf',
              'application/pdf'
            );
          });
      });
    } else {
      // On a browser simply use download!
      this.pdfObject.download();
    }
  }


  constructor(
    private navCtrl: NavController,
    private fileOpener: FileOpener,
    private file: File,
    private plt: Platform
  ) {}

  ngOnInit() {}
}
