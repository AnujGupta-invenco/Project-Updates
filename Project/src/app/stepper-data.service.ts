import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StepperDataService {

  constructor(private http : HttpClient) { }


  geRKIKeyGrouptData(): Observable<any>{
    return this.http.get('/assets/keyGroup.json');
  }

  getApproversData(): Observable<any>{
    return this.http.get('/assets/approvers.json')
  }
}
