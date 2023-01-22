import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
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
  totalCount: number;
  shopParams = new ShopParams();
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
    this.shopService.getAllProducts(this.shopParams).subscribe({
      next:(res)=>{
        this.products = res.data;
        this.shopParams.pageNumber = res.pageIndex;
        this.shopParams.pageSize = res.pageSize;
        this.totalCount = res.count;
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
    this.shopParams.brandId = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId:string){
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort:string){
    console.log('inside onSortSelected');
    this.shopParams.sort = sort;
    console.log(this.sortSelected);
    this.getProducts();
  }

  onPageChanged(event:any){
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }

}
