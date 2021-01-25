import {Component, Input, ViewChild, OnInit} from '@angular/core';
import {Iflash} from './flash.model';
import {NgForm} from '@angular/forms';
import {FlashService} from './flash.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('flashForm', {static: true}) flashForm!: NgForm;
  flashs$!: Observable<Iflash[]>;
  editing = false;
  editingId: number | undefined;
  flash = {
    question: '',
    answer: ''
  };

  constructor(private flashService: FlashService) {
    this.flashs$ = this.flashService.flashs$;
  }

  trackByFlashId(index: any, flash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }

  handleDeleteCard(id: number) {
    this.flashService.deleteFlash(id);
  }

  handleEdit(id: number) {
    this.flash = this.flashService.getFlash(id)!;
    this.editing = true;
    this.editingId = id;
  }

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleRememberedChange({id, flag}) {
    this.flashService.rememberedChange(id, flag);
  }

  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
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
