import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './order-totals/order-totals.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderTotalsComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    FormsModule,
    CarouselModule.forRoot(),
  ],
  exports:[
    PaginationModule,
    CarouselModule,
    OrderTotalsComponent
  ]
})
export class SharedModule { }
