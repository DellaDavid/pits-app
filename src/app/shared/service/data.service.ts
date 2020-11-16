import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private _myProfilebehaviorSubject = new BehaviorSubject(null);
  myProfileCurrentData = this._myProfilebehaviorSubject.asObservable();

  constructor() {
   }

   changeDataService(data: any) {
     this._myProfilebehaviorSubject.next(data);
   }

}
