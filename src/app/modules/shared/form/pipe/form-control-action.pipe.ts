import { Pipe, PipeTransform } from '@angular/core';
import { controlAction } from 'src/app/helper/dataModal/response';
import { extractNumber } from 'src/app/helper/utility/utility-helper';

@Pipe({
  name: 'formControlAction'
})
export class FormControlActionPipe implements PipeTransform {

  transform(data: any, fc: controlAction): string {
    let result: any = '';
    if (fc.controls) {
      const fcData: Array<any> = [];
      fc.controls.map(a => fcData.push(data[a]));
      switch (fc.operation) {
        case 'ADD':
          result = fcData.reduce((partialSum: any, a: any) => (extractNumber(partialSum)) + (extractNumber(a)), 0);
          break;

        case 'MULTIPLE':
          result = fcData.reduce((a: any, b: any) => extractNumber(a) * extractNumber(b));
          break;
      }
    }
    return String(result);
  }
}