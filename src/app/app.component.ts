import { ApiService } from './services/api.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Slide } from './carousel/carousel.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  slides: Slide[] = [];
  constructor(private api: ApiService){}
  ngOnInit(): void {
    this.api.getImages().subscribe((res: any[]) => {
      res = res.slice(0, 10);
      this.slides = res;
    });
  }

}
