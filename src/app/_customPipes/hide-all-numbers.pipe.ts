import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hideAllNumbers',
    standalone: true
})
export class HideAllNumbersPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {      
    return value.replace(/[0-9]/gi, '*')
  }

}
