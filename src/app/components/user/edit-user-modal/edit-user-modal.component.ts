import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GroupResponseDto } from 'src/app/models/group.model';
import { UserResponseDto } from 'src/app/models/user.model';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent  implements OnInit {
  @Input() user!: UserResponseDto;

  groups: GroupResponseDto[] = [];
  selectedGroups: GroupResponseDto[] = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(
    private modalController: ModalController,
    private lookupService: LookupService
  ) { }

  ngOnInit() {
    this.selectedGroups = this.user.groups;
    this.loadGroups();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'shortDescription',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 99,
      allowSearchFilter: false
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }


  loadGroups() {
    this.lookupService.getAllGroups().subscribe((data) => {
      this.groups = data['result'];
    });
  }

  onSubmit(form: NgForm) {
    this.modalController.dismiss({
      updatedUser: this.user,
      updatedGroups: this.selectedGroups
    });
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}
