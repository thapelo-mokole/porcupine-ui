import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { GroupService } from 'src/app/services/group.service';
import { AddGroupModalComponent } from './add-group-modal/add-group-modal.component';
import { EditGroupModalComponent } from './edit-group-modal/edit-group-modal.component';
import { CreateUpdateGroupDto, GroupResponseDto } from 'src/app/models/group.model';
import { PermissionResponseDto } from 'src/app/models/permission.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {

  @ViewChild('groupForm') groupForm!: NgForm;
  groups: GroupResponseDto[] = [];
  permissions: PermissionResponseDto[] = [];

  constructor(
    private groupService: GroupService,
    private modalController: ModalController,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroups().subscribe((data) => {
      this.groups = data['result'];
      console.log(data);
    });
  }

  addGroup(groupData: CreateUpdateGroupDto) {
    const newGroup = { ...groupData, materialAssigned: [] };
    this.groupService.addGroup(newGroup as CreateUpdateGroupDto).subscribe(() => {
      this.loadGroups();
      this.groupForm.reset();
      this.presentToast('Group added successfully');
    });
  }

  updateGroup(id: string, group: GroupResponseDto, updatedPermissions: PermissionResponseDto[]) {

    console.log(group);

    // Extract permissions from the group object
    const { permissions, ...groupData } = group;

    // Map permissions to their IDs
    const permissionIds = updatedPermissions.map((permission: { id: string; }) => permission.id);

    // Create a new object with the updated permissions
    const updateGroup = { ...groupData, permissions: permissionIds };

    this.groupService.updateGroup(id, updateGroup).subscribe(() => {
      this.loadGroups();
    });
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.loadGroups();
      this.presentToast('Group deleted successfully');
    });
  }

  async editGroup(group: GroupResponseDto) {
    const modal = await this.modalController.create({
      component: EditGroupModalComponent,
      componentProps: { group },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.updatedGroup) {
      this.updateGroup(group.id, data.updatedGroup, data.updatedPermissions);
      this.presentToast('Group edited successfully');
    }
  }


  async openAddGroupModal() {
    const modal = await this.modalController.create({
      component: AddGroupModalComponent,
    });

    await modal.present();

    // Listen for the modal to close and handle any data returned
    const { data } = await modal.onWillDismiss();
    if (data?.createdGroup) {
      console.log('Group created:', data.createdGroup);
      this.loadGroups();
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
