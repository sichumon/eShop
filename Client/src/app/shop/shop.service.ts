import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'http://localhost:9010/';

  constructor(private http: HttpClient) { }

  getProductsByCategory(){
    return this.http.get<IProduct[]>(this.baseUrl+'Catalog/GetProductsByCategoryName/Smart%20Phone');
  }
}
