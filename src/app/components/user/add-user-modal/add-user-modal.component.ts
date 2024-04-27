import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GroupResponseDto } from 'src/app/models/group.model';
import { LookupService } from 'src/app/services/lookup.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {
  groups: GroupResponseDto[] = [];
  selectedGroups: GroupResponseDto[] = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(
    private modalController: ModalController,
    private lookupService: LookupService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadGroups();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'shortDescription',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 99,
      allowSearchFilter: true
    };
  }

  loadGroups() {
    this.lookupService.getAllGroups().subscribe((data) => {
      this.groups = data['result'];
      console.log(data);
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  addUser(userForm: NgForm) {
    if (userForm.valid) {
      // const userData = userForm.value;
      // const newUser = { ...userData };

      // Extract groups from the form value
      const { groups, ...userData } = userForm.value;

      // Map groups to their IDs
      const groupIds = groups.map((group: { id: string; }) => group.id);

      // Create a new object with the updated groups
      const newUser = { ...userData, groups: groupIds };

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
