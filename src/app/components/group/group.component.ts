import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service';
import { AddGroupModalComponent } from './add-group-modal/add-group-modal.component';
import { EditGroupModalComponent } from './edit-group-modal/edit-group-modal.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent  implements OnInit {

  @ViewChild('groupForm') groupForm!: NgForm;
  groups: Group[] = [];

  constructor(
    private groupService: GroupService,
    private modalController: ModalController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroups().subscribe((data) => {
      this.groups = data['result'];
      console.log(data);
    });
  }

  addGroup(groupData: Group) {
    const newGroup = { ...groupData, materialAssigned: [] };
    this.groupService.addGroup(newGroup as Group).subscribe(() => {
      this.loadGroups();
      this.groupForm.reset();
      this.presentToast('Group added successfully');
    });
  }

  updateGroup(group: Group) {
    this.groupService.updateGroup(group).subscribe(() => {
      this.loadGroups();
    });
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.loadGroups();
      this.presentToast('Group deleted successfully');
    });
  }

  async editGroup(group: Group) {
    const modal = await this.modalController.create({
      component: EditGroupModalComponent,
      componentProps: { group },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.updatedGroup) {
      this.updateGroup(data.updatedGroup);
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
