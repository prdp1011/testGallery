import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Slide } from './carousel.interface';
import { trigger, transition, useAnimation } from '@angular/animations';
import {
  scaleIn,
  scaleOut
} from './carousel.animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition('void => scale', [
        useAnimation(scaleIn, { params: { time: '500ms' } })
      ]),
      transition('scale => void', [
        useAnimation(scaleOut, { params: { time: '500ms' } })
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {
  @Input() slides: Slide[];
  @Output() openGallery = new EventEmitter();
  prevDisable = true;
  nextDisabled: boolean;
  currentSlide = 0;

  constructor() {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    if (previous >= 0 ) {
      this.currentSlide = previous;
      this.nextDisabled = false ;
    }
    if (previous <= 0) {
      this.prevDisable = true;
    }
  }

  onNextClick() {
    const nextSlide = this.currentSlide + 1;
    if (nextSlide >= this.slides.length) {
      this.nextDisabled = true;
    } else {
      this.currentSlide =  nextSlide;
      this.prevDisable = false;
    }
  }

  ngOnInit() {
    this.nextDisabled = this.slides.length < 2;
  }

  openModalGallery() {
    this.openGallery.emit('myModal');
  }
}
