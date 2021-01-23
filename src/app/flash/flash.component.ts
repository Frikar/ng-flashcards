import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Iflash} from '../flash.model';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {
  @Output() toggleEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() rememberedEvent = new EventEmitter();
  @Input() flash: Iflash = {
    id: 1,
    question: 'React to Angular',
    answer: 'No reaction :)',
    show: false,
  };

  constructor() {
  }

  ngOnInit() {
  }

  toggleCard() {
    this.toggleEvent.emit(this.flash.id);
  }

  deleteCard() {
    this.deleteEvent.emit(this.flash.id);
  }

  editFlash() {
    this.editEvent.emit(this.flash.id);
  }

  markCorrect() {
    this.rememberedEvent.emit({
      id: this.flash.id,
      flag: 'correct',
    });
    console.log(this.flash.remembered);
  }

  markIncorrect() {
    this.rememberedEvent.emit({
      id: this.flash.id,
      flag: 'incorrect',
    });
  }
}

