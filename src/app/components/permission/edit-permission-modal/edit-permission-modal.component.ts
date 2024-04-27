import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CreateUpdatePermissionDto } from 'src/app/models/permission.model';

@Component({
  selector: 'app-edit-permission-modal',
  templateUrl: 'edit-permission-modal.component.html',
  styleUrl: './edit-permission-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPermissionModalComponent {

  @Input() permission!: CreateUpdatePermissionDto;

  constructor(private modalController: ModalController) { }

  onSubmit(form: NgForm) {
    this.modalController.dismiss({
      updatedPermission: this.permission
    });
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }

}
