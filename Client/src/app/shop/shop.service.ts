import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'http://localhost:9010/';

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<IProduct[]>(this.baseUrl+'Catalog/GetAllProducts');
  }

  getProductsByCategory(){
    return this.http.get<IProduct[]>(this.baseUrl+'Catalog/GetProductsByCategoryName/Adidas');
  }

  getProductById(id:string){
    return this.http.get<IProduct>(this.baseUrl +'Catalog/GetProductById/' + id);
  }
}
