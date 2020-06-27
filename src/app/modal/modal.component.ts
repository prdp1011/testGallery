import { style } from '@angular/animations';
import { Slide } from './../carousel/carousel.interface';
import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() id: string;
  isShowGallery: boolean;
  @Input() slides: Slide[] = [];
  currentImg: Slide;
  @ViewChild('fullImg') fullImg: ElementRef;
  @ViewChild('gal') gal: ElementRef;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.currentImg) {
      this.showOrCloseFullImage(null);
      return;
    }
    this.showOrCloseGallery(false);
  }
  constructor(private api: ApiService) {
  }

  showOrCloseGallery(state) {
    this.isShowGallery = state;
    this.showElement(this.gal, state);
  }
  showElement(ele: ElementRef, state){
    ele.nativeElement.style.display = !!state ? 'block' : 'none';
  }
  showOrCloseFullImage(img) {
    this.currentImg = img;
    this.showElement(this.fullImg, img);
  }
}
