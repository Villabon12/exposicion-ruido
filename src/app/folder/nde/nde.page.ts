import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-nde',
  templateUrl: './nde.page.html',
  styleUrls: ['./nde.page.scss'],
})
export class NdePage implements OnInit {
  selectedMethod: string | null = null;
  selectedInstrument: string | null = null;
  noiseLevels: number[] = [];
  exposureTime: number = null;
  LAeqdResult: number;

  // Declara las otras variables numéricas aquí
  currentStep = 1;
  pdfObject: any;
  pdfSaved: boolean = false;

  nextStep() {
    if (this.currentStep === 1 && !this.selectedMethod) {
      // Muestra un mensaje de error
      alert('Por favor, elige un método de medida.');
      return;
    }
    if (this.currentStep === 2 && !this.selectedInstrument) {
      // Muestra un mensaje de error
      alert('Por favor, elige un instrumento de medición.');
      return;
    }
    if (this.currentStep === 3 && !this.noiseLevels) {
      // Muestra un mensaje de error
      alert('Por favor, rellena los campos');
      return;
    }
    this.currentStep++;
    if (this.currentStep === 3) {
      this.LAeqdResult = this.calculateLAeqd(this.noiseLevels, this.exposureTime);
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

  updateNoiseLevels() {
    let size = 0;
    switch (this.selectedMethod) {
      case '1':
      case '2':
      case '3':
        size = 1;
        break;
    }
    this.noiseLevels = Array.from({ length: size }, () => null);
}

  addNoiseLevelField() {
    this.noiseLevels.push(null);
  }

  trackByFn(index: number, item: any): number {
    return index; // o cualquier otro valor único
  }

  calculateLAeqd(noiseLevels: number[], exposureTime: number): number {
    let sum = 0;
    for (let level of noiseLevels) {
      if (level) { // Asegúrate de que el nivel no sea nulo o cero
        sum += Math.pow(10, level / 10);
      }
    }
  
    if (sum === 0 || exposureTime === 0) {
      return null; // Retorna null si no se puede calcular
    }
  
    const LAeqd = 10 * Math.log10((sum * (exposureTime / 60)) / 8); // Convertir minutos a horas
    return LAeqd;
  }

  generatePDF() {
    var dd = {
      content: [
        
      ],
      
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
