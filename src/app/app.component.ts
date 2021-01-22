import {Component, Input} from '@angular/core';
import {Iflash} from './flash.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  editing = false;
  editingId: number | undefined;
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

  trackByFlashId(index: any, flash: { id: any; }): any {
    return flash.id;
  }

  handleToggleCard(id: number): void {
    const flash = this.flashes.find(flash => flash.id === id)!;
    flash.show = !flash.show;
  }

  handleDeleteCard(id: number): void {
    const flashId = this.flashes.findIndex(flash => flash.id === id)!;
    this.flashes.splice(flashId, 1);
  }

  handleEdit(id: number): void {
    this.editing = true;
    this.editingId = id;
    // TODO: We will add editing logic after adding the form
  }

  handleRememberedChange({id, flag}): void {
    const flash = this.flashes.find(flash => flash?.id === id)!;
    flash.remembered = flag;
  }
}

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000);
}
