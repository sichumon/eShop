import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';


@NgModule({
  declarations: [
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
  ],
  exports:[
    CarouselModule,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
