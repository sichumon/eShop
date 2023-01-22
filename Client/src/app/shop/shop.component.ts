import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected: string = '';
  typeIdSelected: string = '';
  sortSelected = 'name';
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Ascending', value: 'priceAsc' },
    { name: 'Price: Descending', value: 'priceDesc'}
  ];
  constructor(private shopService: ShopService){

  }
  ngOnInit() {

    this.getProducts();
    this.getBrands();
    this.getTypes();

  }

  getProducts(){
    this.shopService.getAllProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected).subscribe({
      next:(res)=>{
        this.products = res.data;
        console.log('inside getProducts')
        console.log(this.products);
      },
      error:(err)=>{
        console.log(`An error occured while fetching Products by Category Name:- ${err}`);
      },
      complete:()=> console.log('completed')
    })
  }

  getBrands(){
    this.shopService.getBrands().subscribe({
      next:(res)=>{
        this.brands = [{id: '', name:'All'}, ...res];
      },error:(err)=>{
        console.log('An error occurred while fetching brands');
      }
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe({
      next:(res)=>{
        this.types = [{id: '', name:'All'}, ...res];
      },error:(err)=>{
        console.log('An error occurred while fetching types');
      }
    })
  }

  onBrandSelected(brandId:string){
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId:string){
    this.typeIdSelected = typeId;
    this.getProducts();
  }

  onSortSelected(sort:string){
    console.log('inside onSortSelected');
    this.sortSelected = sort;
    console.log(this.sortSelected);
    this.getProducts();
  }

}
