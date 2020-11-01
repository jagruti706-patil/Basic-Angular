import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  SelectedEmployeeId : BehaviorSubject<number> = new BehaviorSubject<number>(0);
}
