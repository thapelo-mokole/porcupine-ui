import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { CreateUpdateUserDto, UserResponseDto } from 'src/app/models/user.model';
import { GroupResponseDto } from 'src/app/models/group.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @ViewChild('userForm') userForm!: NgForm;
  users: UserResponseDto[] = [];

  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data['result'];
      console.log(data);
    });
  }

  addUser(userData: CreateUpdateUserDto) {
    const newUser = { ...userData, materialAssigned: [] };
    this.userService.addUser(newUser as CreateUpdateUserDto).subscribe(() => {
      this.loadUsers();
      this.userForm.reset();
      this.presentToast('User added successfully');
    });
  }

  updateUser(id: string, user: CreateUpdateUserDto, updatedGroups: GroupResponseDto[]) {

    // Extract groups from the user object
    const { groups, ...userData } = user;

    // Map groups to their IDs
    const groupIds = updatedGroups.map((group: { id: string; }) => group.id);

    // Create a new object with the updated groups
    const updateGroup = { ...userData, groups: groupIds };

    this.userService.updateUser(id, updateGroup).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
      this.presentToast('User deleted successfully');
    });
  }

  async editUser(user: UserResponseDto) {
    const modal = await this.modalController.create({
      component: EditUserModalComponent,
      componentProps: { user },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.updatedUser) {
      this.updateUser(user.id, data.updatedUser, data.updatedGroups);
      this.presentToast('User edited successfully');
    }
  }


  async openAddUserModal() {
    const modal = await this.modalController.create({
      component: AddUserModalComponent,

    });

    await modal.present();

    // Listen for the modal to close and handle any data returned
    const { data } = await modal.onWillDismiss();
    if (data?.createdUser) {
      console.log('User created:', data.createdUser);
      this.loadUsers();
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
