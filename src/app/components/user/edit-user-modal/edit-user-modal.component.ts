import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent {
  @Input() user!: User;

  constructor(private modalController: ModalController) { }

  onSubmit(form: NgForm) {
    this.modalController.dismiss({
      updatedUser: this.user
    });
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}
