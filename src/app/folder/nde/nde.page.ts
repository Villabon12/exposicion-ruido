import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { dataImage64 } from './image';

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
  selectedInstrument: number | null = null;
  noiseLevels: number[] = [];
  exposureTime: number = null;
  LAeqdResult: number;
  instrumentInfo: any;
  instrumentName: string;
  instrumentValue: number;
  uncertainty: number;
  RuidosNivel: number;
  instrumtMedic : number;
  posMedi : number;
  suma: number;

  // Declara las otras variables numéricas aquí
  currentStep = 1;
  pdfObject: any;
  pdfSaved: boolean = false;

  nivelRuido() {
    const tableData = [];
    for (let i = 0; i < this.noiseLevels.length; i++) {
      tableData.push({
        label: 'Muestra ' + (i+1),
        value: this.noiseLevels[i]
      });
    }
    return tableData;
  }

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

  nameInstrument(): { name: string; value: number } {
    let name = '';
    let value = 0;

    switch (this.selectedInstrument) {
      case 1:
        name =
          'Sonómetro de clase 1, según se especifica en la Norma IEC 61672-1:2002';
        value = 0.7;
        break;
      case 2:
        name =
          'Exposímetro sonoro personal, según se especifica en la Norma IEC 61652';
        value = 1.5;
        break;
      case 3:
        name =
          'Sonómetro de clase 2, según se especifica en la Norma IEC 61672-1:2002';
        value = 1.5;
        break;
    }

    return { name, value };
  }

  nextStep() {
    if (this.currentStep === 1 && !this.selectedMethod) {
      // Muestra un mensaje de error
      alert('Por favor, elige un método de medida.');
      return;
    }
    if (this.currentStep === 2 && !this.selectedInstrument) {
      // Muestra un mensaje de error
      console.log(this.selectedInstrument);
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
      this.instrumentInfo = this.nameInstrument();
      this.instrumentName = this.instrumentInfo.name;
      this.instrumentValue = this.instrumentInfo.value;
      this.uncertainty = this.calculateUncertainty(this.instrumentValue);
    }
    if (this.currentStep === 4) {
      this.LAeqdResult = this.calculateLAeqd(
        this.noiseLevels,
        this.exposureTime
      );
      this.RuidosNivel = 0;
      this.instrumtMedic = parseFloat(Math.pow(this.instrumentValue,2).toFixed(2));
      this.posMedi = 1;
      this.suma = this.RuidosNivel + this.instrumtMedic + this.posMedi
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
        size = 5;
        break;
      case '2':
      case '3':
        size = 3;
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
      if (level) {
        const elevado = 0.1*(level)
        // Asegúrate de que el nivel no sea nulo o cero
        sum += (Math.pow(10, elevado)) * (exposureTime / 60); // Convertir minutos a horas y multiplicar por el nivel de ruido
        console.log(sum);
      }
    }

    if (sum === 0) {
      return null; // Retorna null si no se puede calcular
    }
    const div = sum/8
    const log = Math.log10(div)
    const LAeqd = 10 * log; // Dividir por 8 para obtener el promedio diario
    console.log(log);
    console.log(div);
    console.log(LAeqd);
    return parseFloat(LAeqd.toFixed(1)); // Redondear a dos decimales;
  }

  calculateUncertainty(instrumentUncertainty: number): number {
    // Factor de cobertura para un nivel de confianza del 95%
    const coverageFactor = 1.5;

    // Incertidumbre combinada (usando solo la incertidumbre del instrumento en este caso)
    const combinedUncertainty = instrumentUncertainty; // Aquí puedes agregar más fuentes de incertidumbre si las tienes

    // Incertidumbre expandida
    const expandedUncertainty = coverageFactor * combinedUncertainty;
    console.log(expandedUncertainty);
    return parseFloat(expandedUncertainty.toFixed(1)); // Redondear a dos decimales
  }

  generatePDF() {
    alert('Se está generando espere...')
    // Recomendaciones
    const recomendacionesAlta = [
      'Evitar la exposición  a niveles de ruido por encima de los 85 dB durante largos periodos de tiempo, puede producir pérdida auditiva inducida por ruido.',
      'Evita sonidos que sean “demasiados altos” y que estén “demasiados cercanos”, o que duren “demasiado tiempo”.',
      'Uso de tapones Auditivos u otros dispositivos de protección cuando haga alguna actividad que involucre ruidos fuertes.',
      'Ten en cuenta cual es la intensidad del ruido a la que este expuesto y si requieres uso de protectores auditivos.',
      
    ];
    const recomendacionesBaja = [
      'Para proteger la audición se debe mantener una distancia entre el punto de origen del sonido y la persona.',
      'Cada que cambien un equipo o maquina en tu área de trabajo o cerca de esta, pídele a tus superiores que realicen un nuevo análisis de intensidad del ruido',
      'Consulta y analiza que alternativas se podrán utilizar para reducir o controlar el ruido como: utilización de barreras, rotación de personal o  modificación de procesos.',
      'Evitar al máximo los factores de riesgos, algunos de ellos pueden estar presentes en entornos laborales y tomar acción sobre el cuidado auditivo',
      'Lleva un control de las fechas y los resultados de los exámenes auditivos empresariales y pregunta al profesional que realiza las pruebas que significan , para tu salud diaria los números que te de.',
    ];
    const tableRecom = [];
    if (this.LAeqdResult > 85) {      
      for (let i = 0; i < recomendacionesAlta.length; i++) {
        tableRecom.push([recomendacionesAlta[i].toString()]);
      }
    } else {
      for (let i = 0; i < recomendacionesBaja.length; i++) {
        tableRecom.push([recomendacionesBaja[i].toString()]);
      }
    }

    // Plan de accion
    const planAlta = [
      'Planificar mediciones frecuentes de la exposición al ruido de acuerdo a los niveles de ruido del proceso'
    ];
    const planBaja = [
      'Plan de capacitación anual que incluya los siguientes temas: efectos del ruido en la salud, conservación auditiva, estilos de vida saludables, higiene, cuidado de los oídos, uso de la protección auditiva.',
      'Participación de los trabajadores en la identificación del riesgo y promoción de soluciones para mejorar procesos y controlar el riesgo.',
      'Implementar  un programa de inspecciones de seguridad así como la implementación de listas de chequeo de máquinas y herramientas.',
      'Realizar pausas de reposo sistemático o de rotación en las labores a los trabajadores expuestos.',
      'Realizar controles de exámenes médicos periódicos para aquellos trabajadores que evidencian pérdida auditiva en frecuencias definidas según el grado de exposición.',
      'Hacer uso de los de los protectores auditivos apropiados y realizar un adecuado proceso de higiene de estos.',
      'Realizar campañas de control y prevención de esta manera podrás estar seguro de que tu entorno de trabajo es adecuado para todas las personas  que se encuentran ahí.',
    ];
    const tablePlan = [];
    if (this.LAeqdResult > 85) {      
      for (let i = 0; i < planAlta.length; i++) {
        tableRecom.push([planAlta[i].toString()]);
      }
    } else {
      for (let i = 0; i < planBaja.length; i++) {
        tableRecom.push([planBaja[i].toString()]);
      }
    }
    // Medidas preventivas
    const medidasAlta = [
      'Adquirir equipos que generen bajos niveles de ruido',
      'Establecer un programa de mantenimiento preventivo de equipos con cáracter periódico.',
      'Instalar apantallamientos y cerramientos acústicos.',      
    ];
    const medidasBaja = [
      'Limitar tiempos de exposición',
      'Limitar el número de trabajadores expuestos',
      'Diseñar adecuadamente el puesto de trabajo',
      'Ubicar los equipos que generen ruidos en estancias independientes',
      'Alejar las fuentes con mayores niveles de ruido de los puestos de trabajo',
    ];
    const tableMed = [];
    if (this.LAeqdResult > 85) {      
      for (let i = 0; i < medidasAlta.length; i++) {
        tableRecom.push([medidasAlta[i].toString()]);
      }
    } else {
      for (let i = 0; i < medidasBaja.length; i++) {
        tableRecom.push([medidasBaja[i].toString()]);
      }
    }

    const nameMethod = this.nameMedicion();
    const tableBody = [];
    tableBody.push(['Nivel de ruido dB(A)']);
    for (let i = 0; i < this.noiseLevels.length; i++) {
      tableBody.push([this.noiseLevels[i].toString()]);
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
          text:
            'Nivel de exposición al ruido diario ponderado A: ' +
            this.LAeqdResult,
          margin: [0, 10, 0, 5],
        },
        {
          text: 'Incertidumbre expandida U: ' + this.uncertainty,
          margin: [0, 5, 0, 5],
        },
        {
          text: 'Número de valores medido: ' + this.noiseLevels.length,
          margin: [0, 5, 0, 5],
        },

        // Datos en tabla
        {
          table: {
            widths: ['*', '*', '*'],
            body: [
              [
                'Contribución a la incertidumbre',
                'Símbolos, relaciones',
                'Valor db(A)',
              ],
              [
                'Nivel de ruido',
                {
                  text: [
                    { text: '(' + 'C', fontSize: 12 },
                    { text: '1', fontSize: 7, baseline: 'sub' },
                    { text: ' * u', fontSize: 12 },
                    { text: '1', fontSize: 7, baseline: 'sub' },
                    { text: ')', fontSize: 12 },
                    { text: '2', fontSize: 7, baseline: 'super' },
                  ],
                },
                '0,09',
              ],
              [
                'Instrumentos de medición',
                {
                  text: [
                    { text: '(', fontSize: 12 },
                    { text: 'u', fontSize: 12 },
                    { text: '2', fontSize: 7, baseline: 'sub' },
                    { text: ')', fontSize: 12 },
                    { text: '2', fontSize: 7, baseline: 'super' },
                  ],
                },
                this.instrumtMedic,
              ],
              [
                'Posición de la medición',
                {
                  text: [
                    { text: '(', fontSize: 12 },
                    { text: 'u', fontSize: 10 },
                    { text: '2', fontSize: 7, baseline: 'sub' },
                    { text: ')', fontSize: 12 },
                    { text: '2', fontSize: 7, baseline: 'super' },
                  ],
                },
                '1',
              ],
              [
                'Suma',
                {
                  text: [
                    { text: 'u', fontSize: 12 },
                    { text: '2', fontSize: 7, baseline: 'super' },
                    { text: '(', fontSize: 12 },
                    { text: 'L', fontSize: 12 },
                    { text: 'EX,8h', fontSize: 7, baseline: 'super' },
                    { text: ')', fontSize: 12 },
                  ],
                },
                this.suma,
              ],
            ],
          },
          margin: [0, 10, 0, 10],
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
          text: 'Selección del método de cálculo',
          margin: [0, 10, 0, 10],
          bold: true,
        },
        {
          text: 'Elija el método de cálculo que desee utilizar, en función de la información de que dispone:',
          margin: [0, 10, 0, 10],
          bold: true,
        },
        {
          text: nameMethod.name,
        },
        {
          text: 'Medición basada en un puesto de trabajo o medición de una jornada completa',
          margin: [0, 10, 0, 10],
          bold: true,
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
          text: 'Especifique la incertidumbre típica u de los instrumentos de medición utilizados:',
          margin: [0, 10, 0, 10],
          bold: true,
        },
        {
          text: this.instrumentName,
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
        { text: 'Muestras:', margin: [0, 10, 0, 5] },

        //datos en tabla
        {
          table: {
            widths: ['*'],
            body: tableBody,
          },
        },
        { text: 'Recomendaciones:', margin: [0, 10, 0, 5] },

        //datos en tabla
        {
          table: {
            widths: ['*'],
            body: tableRecom,
          },
        },
        { text: 'Plan de acción:', margin: [0, 10, 0, 5] },

        //datos en tabla
        {
          table: {
            widths: ['*'],
            body: tablePlan,
          },
        },
        { text: 'Medidas preventivas:', margin: [0, 10, 0, 5] },

        //datos en tabla
        {
          table: {
            widths: ['*'],
            body: tableMed,
          },
        },
        {
          text: 'Duración efectiva: ' + this.exposureTime + ' minutos',
          margin: [0, 10, 0, 5],
        },
        ,
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
