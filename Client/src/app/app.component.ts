import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eShop';

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.http.get('http://localhost:9010/Catalog/GetProductsByCategoryName/Smart%20Phone').subscribe({
      next:(res) => console.log(res),
      error:(err) => console.log(err),
      complete:() => console.log('completed')
    })
  }
}
