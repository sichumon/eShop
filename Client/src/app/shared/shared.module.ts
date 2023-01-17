import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule.forRoot(),
  ],
  exports:[
    CarouselModule,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
