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
  selectedMethod!: number;
  selectedInstrument!: number;
  data1!: number;
  // Declara las otras variables numéricas aquí
  currentStep = 1;
  pdfObject: any;
  pdfSaved: boolean = false;

  nextStep() {
    this.currentStep++;
    if (this.currentStep > 3) {
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
  generatePDF() {
    var dd = {
      content: [
        {
          text: 'Unordered list',
          style: 'header',

          ul: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nUnordered list with longer lines', style: 'header' },
        {
          ul: [
            'item 1',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
            'item 3',
          ],
        },
        { text: '\n\nOrdered list', style: 'header' },
        {
          ol: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nOrdered list with longer lines', style: 'header' },
        {
          ol: [
            'item 1',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
            'item 3',
          ],
        },
        { text: '\n\nOrdered list should be descending', style: 'header' },
        {
          reversed: true,
          ol: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nOrdered list with start value', style: 'header' },
        {
          start: 50,
          ol: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nOrdered list with own values', style: 'header' },
        {
          ol: [
            { text: 'item 1', counter: 10 },
            { text: 'item 2', counter: 20 },
            { text: 'item 3', counter: 30 },
            { text: 'item 4 without own value' },
          ],
        },
        { text: '\n\nNested lists (ordered)', style: 'header' },
        {
          ol: [
            'item 1',
            [
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
              {
                ol: [
                  'subitem 1',
                  'subitem 2',
                  'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                  'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                  'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                  {
                    text: [
                      'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                      'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                      'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                      'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                      'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                      'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                      'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                      'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    ],
                  },

                  'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                  'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                  'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                  'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                  'subitem 4',
                  'subitem 5',
                ],
              },
            ],
            'item 3\nsecond line of item3',
          ],
        },
        { text: '\n\nNested lists (unordered)', style: 'header' },
        {
          ol: [
            'item 1',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
            {
              ul: [
                'subitem 1',
                'subitem 2',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                {
                  text: [
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                  ],
                },

                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 4',
                'subitem 5',
              ],
            },
            'item 3\nsecond line of item3',
          ],
        },
        { text: '\n\nUnordered lists inside columns', style: 'header' },
        {
          columns: [
            {
              ul: [
                'item 1',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
              ],
            },
            {
              ul: [
                'item 1',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
              ],
            },
          ],
        },
        { text: '\n\nOrdered lists inside columns', style: 'header' },
        {
          columns: [
            {
              ol: [
                'item 1',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
              ],
            },
            {
              ol: [
                'item 1',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
              ],
            },
          ],
        },
        { text: '\n\nNested lists width columns', style: 'header' },
        {
          ul: [
            'item 1',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
            {
              ol: [
                [
                  {
                    columns: [
                      'column 1',
                      {
                        stack: [
                          'column 2',
                          {
                            ul: [
                              'item 1',
                              'item 2',
                              {
                                ul: ['item', 'item', 'item'],
                              },
                              'item 4',
                            ],
                          },
                        ],
                      },
                      'column 3',
                      'column 4',
                    ],
                  },
                  'subitem 1 in a vertical container',
                  'subitem 2 in a vertical container',
                ],
                'subitem 2',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                {
                  text: [
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                    'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                  ],
                },

                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 3 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit',
                'subitem 4',
                'subitem 5',
              ],
            },
            'item 3\nsecond line of item3',
          ],
        },
        { text: '\n\nUnordered list with square marker type', style: 'header' },
        {
          type: 'square',
          ul: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nUnordered list with circle marker type', style: 'header' },
        {
          type: 'circle',
          ul: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nColored unordered list', style: 'header' },
        {
          color: 'blue',
          ul: ['item 1', 'item 2', 'item 3'],
        },
        {
          text: '\n\nColored unordered list with own marker color',
          style: 'header',
        },
        {
          color: 'blue',
          markerColor: 'red',
          ul: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nColored ordered list', style: 'header' },
        {
          color: 'blue',
          ol: ['item 1', 'item 2', 'item 3'],
        },
        {
          text: '\n\nColored ordered list with own marker color',
          style: 'header',
        },
        {
          color: 'blue',
          markerColor: 'red',
          ol: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nOrdered list - type: lower-alpha', style: 'header' },
        {
          type: 'lower-alpha',
          ol: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nOrdered list - type: upper-alpha', style: 'header' },
        {
          type: 'upper-alpha',
          ol: ['item 1', 'item 2', 'item 3'],
        },

        { text: '\n\nOrdered list - type: upper-roman', style: 'header' },
        {
          type: 'upper-roman',
          ol: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
        },
        { text: '\n\nOrdered list - type: lower-roman', style: 'header' },
        {
          type: 'lower-roman',
          ol: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
        },
        { text: '\n\nOrdered list - type: none', style: 'header' },
        {
          type: 'none',
          ol: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nUnordered list - type: none', style: 'header' },
        {
          type: 'none',
          ul: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nOrdered list with own separator', style: 'header' },
        {
          separator: ')',
          ol: ['item 1', 'item 2', 'item 3'],
        },
        {
          text: '\n\nOrdered list with own complex separator',
          style: 'header',
        },
        {
          separator: ['(', ')'],
          ol: ['item 1', 'item 2', 'item 3'],
        },
        { text: '\n\nOrdered list with own items type', style: 'header' },
        {
          ol: [
            'item 1',
            { text: 'item 2', listType: 'none' },
            { text: 'item 3', listType: 'upper-roman' },
          ],
        },
        { text: '\n\nUnordered list with own items type', style: 'header' },
        {
          ul: [
            'item 1',
            { text: 'item 2', listType: 'none' },
            { text: 'item 3', listType: 'circle' },
          ],
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
    // this.pdfObject.getBase64((base64String) => {
    //   this.savePDF(base64String);
    // });
    // this.pdfObject.getBlob(blob => {this.savePDF(blob)});
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
    this.pdfObject.getBuffer((buffer) => {
    var blob = new Blob([buffer], { type: 'application/pdf' });
    
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObject.download();
    }
  }
  // savePDF(blob: Blob) {
  //   const fileName = 'recomendacion.pdf';
  //   this.file.writeFile(this.file.dataDirectory, fileName, blob, { replace: true }).then(fileEntry => {
  //     alert('Archivo guardado');
  //     this.pdfSaved = true;
  //   }).catch(err => {
  //     alert('Error writing file'+ err);
  //   });
  // }
  // async savePDF(base64String: string) {
  //   const fileName = 'recomendacion.pdf';
  //   try {
  //     await Filesystem.writeFile({
  //       path: fileName,
  //       data: base64String,
  //       directory: Directory.Documents,
  //       encoding: Encoding.UTF8,
  //     });
  //     alert('Archivo guardado');
  //     this.pdfSaved = true;
  //   } catch (err) {
  //     console.error('Error writing file', err);
  //   }
  // }

  // async openPDF() {
  //   const fileName = 'recomendacion.pdf';
  //   try {
  //     const fileUri = await Filesystem.getUri({
  //       path: fileName,
  //       directory: Directory.Documents,
  //     });
  //     // Aquí puedes usar el URI para abrir el PDF con la herramienta que elijas
  //     // Por ejemplo, si tienes un plugin o una función para abrir archivos, puedes usarlo aquí.
  //     // this.openFileFunction(fileUri.uri);
  //     window.open(fileUri.uri, '_blank');
  //   } catch (err) {
  //     console.error('Error opening file', err);
  //   }
  // }

  constructor(
    private navCtrl: NavController,
    private fileOpener: FileOpener,
    private file: File,
    private plt: Platform
  ) {}

  ngOnInit() {}
}
