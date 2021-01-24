import {Injectable} from '@angular/core';
import {Iflash} from './flash.model';

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {
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

  constructor() {
  }

  addFlash(flash: { question: string; answer: string }) {
    this.flashes.push({
      ...flash,
      show: false,
      id: getRandomNumber(),
    });
  }

  toggleFlash(id: number) {
    const flash = this.flashes.find(flash => flash.id === id)!;
    flash.show = !flash.show;
  }

  deleteFlash(id: number) {
    const index = this.flashes.findIndex(flash => flash.id === id);
    this.flashes.splice(index, 1);
  }

  rememberedChange(id: number, flag) {
    const flash = this.flashes.find(flash => flash.id === id)!;
    flash.remembered = flag;
  }

  updateFlash(id, updateFlash: { question: string; answer: string }) {
    const flash = this.flashes.find(flash => flash.id === id)!;
    flash.question = updateFlash.question;
    flash.answer = updateFlash.answer;
  }

  getFlash(id: number) {
    return this.flashes.find(flash => flash.id === id);
  }
}
