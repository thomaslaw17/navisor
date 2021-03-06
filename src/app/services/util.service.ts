import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  constructor() {}

  public objectToArray(obj: any): any[] {
    const array = Array();
    for (const id in obj) {
      if (id !== '') {
        array.push(obj[id]);
      }
    }

    return array;
  }
}
