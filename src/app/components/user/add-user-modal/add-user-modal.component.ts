import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent {

  constructor(
    private modalController: ModalController,
    private userService: UserService
  ) { }

  addUser(userForm: NgForm) {
    if (userForm.valid) {
      const userData = userForm.value;
      const newUser = { ...userData, materialAssigned: [] };

      this.userService.addUser(newUser).subscribe(
        () => {
          console.log('User added successfully');
          this.dismiss({ createdUser: newUser });
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}
