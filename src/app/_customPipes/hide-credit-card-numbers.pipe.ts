import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideCreditCardNumbers'
})
export class HideCreditCardNumbersPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let string = value.substring(0, 2)

    string+= value.substring(3, 11).replace(/([0-9])/g, '*')
    
    string += value.substring(12, value.length)

    return string
  }

}
