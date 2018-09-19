import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Sneaker } from '../sneaker';
import { API_URL } from './auth.service';

const SNEAKERS_URL = environment.apiUrl + '/sneaker'

@Injectable({
  providedIn: 'root'
})
export class SneakerService {

  constructor(private http: HttpClient) { }

  public getSneakers() {
    return this.http.get<Sneaker[]>(SNEAKERS_URL)
  }

  public checkModelExists(model) {
    const url = API_URL + '/checkModelExists'
    return this.http.post<boolean>(url, model)
  }

  public createSneaker(sneaker) {
    return this.http.post<Sneaker>(SNEAKERS_URL, sneaker)
  }
}
