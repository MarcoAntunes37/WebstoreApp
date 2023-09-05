import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'showServerError',
    standalone: true
})
export class ShowServerErrorPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.split(",")[0].split(":")[1].split('\r')[0]
  }

}
