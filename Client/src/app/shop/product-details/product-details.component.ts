import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute){

  }
  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){    
    this.shopService.getProductById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
      next:(res) =>{
        this.product = res;
      }, error:(err) => {
        console.log(`An error occured while fetching Product by Id:- ${err}`);
      },
      complete:()=> console.log('Fetched Products by Id')
    });
  }    
  
}
