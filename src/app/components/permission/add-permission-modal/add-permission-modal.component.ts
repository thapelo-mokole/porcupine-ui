import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonButton, IonItem, IonLabel, IonInput, IonCheckbox, IonToolbar, IonContent, IonTitle, IonButtons } from "@ionic/angular/standalone";
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-add-permission-modal',
  standalone: true,
  imports: [IonButtons, IonTitle, IonContent, IonToolbar, IonCheckbox, IonInput, IonLabel, IonItem, IonButton, IonHeader,
    CommonModule,
    FormsModule,
  ],
  templateUrl: 'add-permission-modal.component.html',
  styleUrl: './add-permission-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPermissionModalComponent {
  constructor(
    private modalController: ModalController,
    private permissionService: PermissionService
  ) { }

  addPermission(permissionForm: NgForm) {
    if (permissionForm.valid) {
      const permissionData = permissionForm.value;
      const newPermission = { ...permissionData };

      this.permissionService.addPermission(newPermission).subscribe(
        () => {
          console.log('Permission added successfully');
          this.dismiss({ createdPermission: newPermission });
        },
        (error) => {
          console.error('Error adding permission:', error);
        }
      );
    }
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}
