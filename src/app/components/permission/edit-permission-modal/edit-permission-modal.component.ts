import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Permission } from 'src/app/models/permission.model';

@Component({
  selector: 'app-edit-permission-modal',
  templateUrl: 'edit-permission-modal.component.html',
  styleUrl: './edit-permission-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPermissionModalComponent {

  @Input() permission!: Permission;

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
