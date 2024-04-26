import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Group } from 'src/app/models/group.model';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: 'edit-group-modal.component.html',
  styleUrl: './edit-group-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditGroupModalComponent {
  @Input() group!: Group;

  constructor(private modalController: ModalController) { }

  onSubmit(form: NgForm) {
    this.modalController.dismiss({
      updatedGroup: this.group
    });
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}
