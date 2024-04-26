import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  @ViewChild('userForm') userForm!: NgForm;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data['result'];
      console.log(data);
    });
  }

  addUser(userData: User) {
    const newUser = { ...userData, materialAssigned: [] };
    this.userService.addUser(newUser as User).subscribe(() => {
      this.loadUsers();
      this.userForm.reset();
      this.presentToast('User added successfully');
    });
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
      this.presentToast('User deleted successfully');
    });
  }

  async editUser(user: User) {
    const modal = await this.modalController.create({
      component: EditUserModalComponent,
      componentProps: { user },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.updatedUser) {
      this.updateUser(data.updatedUser);
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
