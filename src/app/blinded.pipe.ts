import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'blinded'
})
export class BlindedPipe implements PipeTransform {
    transform(value: string, args?: any) {
        return value.replace(/[^ ]/g, '.');
    }
}