import {Component, Input, ViewChild} from '@angular/core';
import {Iflash} from './flash.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('flashForm', {static: true}) flashForm!: NgForm;
  editing = false;
  editingId: number | undefined;
  flash = {
    question: '',
    answer: ''
  };
  flashes: Iflash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
  }];

  trackByFlashId(index: any, flash: { id: any; }) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    const flash = this.flashes.find(flash => flash.id === id)!;
    flash.show = !flash.show;
  }

  handleDeleteCard(id: number) {
    const flashId = this.flashes.findIndex(flash => flash.id === id)!;
    this.flashes.splice(flashId, 1);
  }

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    // TODO: We will add editing logic after adding the form
  }

  handleRememberedChange({id, flag}){
    const flash = this.flashes.find(flash => flash?.id === id)!;
    flash.remembered = flag;
  }
  handleSubmit(): void{
    this.flashes.push({
      ...this.flash,
      show: false,
      id: getRandomNumber(),
    });
    this.handleClear();
  }
  handleClear() {
    this.flash = {
      question: '',
      answer: '',
    };
    this.flashForm.reset();
  }
}

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000);
}
