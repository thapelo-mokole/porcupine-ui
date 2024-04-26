import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ModalController, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Permission } from 'src/app/models/permission.model';
import { PermissionService } from 'src/app/services/permission.service';
import { EditPermissionModalComponent } from './edit-permission-modal/edit-permission-modal.component';
import { AddPermissionModalComponent } from './add-permission-modal/add-permission-modal.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent  implements OnInit {
  @ViewChild('permissionForm') permissionForm!: NgForm;
  permissions: Permission[] = [];

  constructor(
    private permissionService: PermissionService,
    private modalController: ModalController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadPermissions();
  }

  loadPermissions() {
    this.permissionService.getPermissions().subscribe((data) => {
      this.permissions = data['result'];
      console.log(data);
    });
  }

  addPermission(permissionData: Permission) {
    const newPermission = { ...permissionData, materialAssigned: [] };
    this.permissionService.addPermission(newPermission as Permission).subscribe(() => {
      this.loadPermissions();
      this.permissionForm.reset();
      this.presentToast('Permission added successfully');
    });
  }

  updatePermission(permission: Permission) {
    this.permissionService.updatePermission(permission).subscribe(() => {
      this.loadPermissions();
    });
  }

  deletePermission(permissionId: string) {
    this.permissionService.deletePermission(permissionId).subscribe(() => {
      this.loadPermissions();
      this.presentToast('Permission deleted successfully');
    });
  }

  async editPermission(permission: Permission) {
    const modal = await this.modalController.create({
      component: EditPermissionModalComponent,
      componentProps: { permission },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.updatedPermission) {
      this.updatePermission(data.updatedPermission);
      this.presentToast('Permission edited successfully');
    }
  }


  async openAddPermissionModal() {
    const modal = await this.modalController.create({
      component: AddPermissionModalComponent,
    });

    await modal.present();

    // Listen for the modal to close and handle any data returned
    const { data } = await modal.onWillDismiss();
    if (data?.createdPermission) {
      console.log('Permission created:', data.createdPermission);
      this.loadPermissions();
    }
  }

  // Present a toast with the specified message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });

    toast.present();
  }

}
