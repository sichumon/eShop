import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  products: IProduct[];
  constructor(private shopService: ShopService){

  }
  ngOnInit() {
    this.shopService.getProductsByCategory().subscribe({
      next:(res) => {
        this.products = res;
      },
      error:(err)=>{
        console.log(`An error occured while fetching Products by Category Name:- ${err}`);
      },
      complete:()=> console.log('completed')
    });
  }

}
