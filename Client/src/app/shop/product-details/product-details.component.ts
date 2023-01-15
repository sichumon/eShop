import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;
  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService,
              private basketService: BasketService){
    this.bcService.set('@productDetails', ' ');
  }
  ngOnInit() {
    this.loadProduct();
  }

  addItemToCart() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
    this.quantity--;
    }
  }

  loadProduct(){
    this.shopService.getProductById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
      next:(res) =>{
        this.product = res;
        this.bcService.set('@productDetails', res.name);
      }, error:(err) => {
        console.log(`An error occured while fetching Product by Id:- ${err}`);
      },
      complete:()=> console.log('Fetched Products by Id')
    });
  }

}
