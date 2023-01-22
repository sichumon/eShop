import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'http://localhost:9010/';

  constructor(private http: HttpClient) { }

  getAllProducts(brandId?: string, typeId?: string, sort?: string){
    let params = new HttpParams();
    if(brandId){
      params = params.append('brandId', brandId);
    }

    if(typeId){
      params = params.append('typeId', typeId);
    }
    params = params.append('sort', 'priceAsc');
    return this.http.get<IPagination>(this.baseUrl+'Catalog/GetAllProducts', {observe:'response', params})
    //projecting HttpResponse body back
    .pipe(map(response =>{
      return response.body
    }));
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'Catalog/GetAllBrands')
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl+'Catalog/GetAllTypes')
  }

  getProductsByCategory(){
    return this.http.get<IProduct[]>(this.baseUrl+'Catalog/GetProductsByCategoryName/Adidas');
  }

  getProductById(id:string){
    return this.http.get<IProduct>(this.baseUrl +'Catalog/GetProductById/' + id);
  }
}
