import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { dataImage64 } from './image';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-nse',
  templateUrl: './nse.page.html',
  styleUrls: ['./nse.page.scss'],
})
export class NsePage implements OnInit {
  selectedMethod: string | null = null;
  noiseLevels1: number;
  noiseLevels2: number;
  LAeqsResult: number;
  color: string;
  mensaje: string;
  // Declara las otras variables numéricas aquí
  currentStep = 1;
  pdfObject: any;
  pdfSaved: boolean = false;

  nameMedicion(): { name: string } {
    let name = '';

    switch (this.selectedMethod) {
      case '1':
        name = 'Medición basada en el puesto de trabajo';
        break;
      case '2':
        name = 'Medición de una jornada completa';
        break;
      case '3':
        name = 'Medición basada en la tarea';
        break;
    }

    return { name };
  }

  nextStep() {
    if (this.currentStep === 1 && !this.selectedMethod) {
      // Muestra un mensaje de error
      alert('Por favor, elige un método de medida.');
      return;
    }
    if (this.currentStep === 2 && !this.noiseLevels1 && !this.noiseLevels2) {
      // Muestra un mensaje de error
      alert('Por favor, Rellene los valores.');
      return;
    }
    this.currentStep++;
    if (this.currentStep === 3) {
      const datos = [this.noiseLevels1, this.noiseLevels2];
      this.LAeqsResult = this.calculateLw(datos);
      this.color = this.LAeqsResult > 50 ? 'mensaje' : 'mensaje2';
      this.mensaje = this.LAeqsResult > 50 ? 'La Lw es positiva' : 'La Lw es negativa';
    }

    if (this.currentStep > 4) {
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

  calculateLw(dailyLevels: string | any[]) {
    let sum = 0;
    for (let i = 0; i < dailyLevels.length; i++) {
      sum += Math.pow(10, dailyLevels[i] / 10);
    }
    const average = sum / dailyLevels.length;
    const Lw = 10 * Math.log10(average);
    return parseFloat(Lw.toFixed(1));
  }

  generatePDF() {
    const valor = this.calculateLw([this.noiseLevels1, this.noiseLevels2]);
    const nameMethod = this.nameMedicion();
    const datos = [this.noiseLevels1, this.noiseLevels2];
    const color = this.LAeqsResult > 50 ? 'green' : 'red';
    const mensaje= this.LAeqsResult > 50 ? 'La Lw es positiva' : 'La Lw es negativa';
    const tableBody = [];
    tableBody.push(['Valor de LAeq,d dB(A)']);
    for (let i = 0; i < datos.length; i++) {
      tableBody.push([datos[i].toString()]);
    }
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
          text: 'Nivel de exposición semanal equivalente',
          fontSize: 12,
          margin: [0, 0, 0, 10],
          alignment: 'center',
        },
        {
          text: [
            { text: 'L', fontSize: 12 },
            { text: 'Aeq,s', fontSize: 7, baseline: 'sub' },
            { text: ':'+ valor, fontSize: 12 },
          ],bold:true,
        },
        {
          text: mensaje,
          margin: [0, 5, 0, 5],
          bold: true,
          fontSize: 12,
          color: color,
        },
        {
          text: 'Incertidumbre: ',
          bold: true,
        },
        {
          text: 'Si el resultado está próximo a los valores de referencia, tenga en cuenta que al considerar la incertidumbre global, el valor de LAeqd podria sobrepasar dichos valores. A titulo informativo la incertidumbre en el resultado debido al instrumento de medición es de 0.7 dB. Puede obtener la incertidumbre global asociada a las mediciones de ruido mediante el calculador',
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
          text: 'Nivel semanal equivalente',
          margin: [0, 10, 0, 10],
        },
        {
          text: 'Indique el instrumento de medición utilizado',
          margin: [0, 10, 0, 10],
          bold: true,
        },
        {
          text: nameMethod.name,
        },
        
        { text: 'Entrada de datos:', margin: [0, 10, 0, 5] },

        //datos en tabla
        {
          table: {
            widths: ['*'],
            body: tableBody,
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
