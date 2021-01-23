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
    const flash = this.flashes.find(flash => flash.id === id)!;
    this.flash.question = flash.question;
    this.flash.answer = flash.answer;
  }

  handleUpdate() {
    const flash = this.flashes.find(flash => flash.id === this.editingId)!;
    flash.question = this.flash.question;
    flash.answer = this.flash.answer;
    this.handleCancel();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
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
