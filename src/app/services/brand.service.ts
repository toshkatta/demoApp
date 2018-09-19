import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { NameId } from '../sneaker'

const BRANDS_URL = environment.apiUrl + '/brand'

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  public createBrand(name) {
    return this.http.post<NameId>(BRANDS_URL, { 'name': name })
  }

  public getBrands() {
    return this.http.get<NameId[]>(BRANDS_URL)
  }

  public getBrandById(id) {
    const url = BRANDS_URL + 'Id?id=' + id
    return this.http.get<NameId>(url)
  }

  public getBrandsByName(name) {
    const url = BRANDS_URL + 'Name?name=' + name
    return this.http.get<NameId>(url)
  }

  public updateBrand(id, name) {
    return this.http.put<NameId>(BRANDS_URL, { 'id': id, 'name': name })
  }

  public deleteBrand(id) {
    console.log('brand service id: ', id)
    return this.http.delete<NameId>(BRANDS_URL, { params: { 'id': id } })
  }
}
