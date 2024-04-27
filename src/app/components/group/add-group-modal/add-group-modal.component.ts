import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonSelect, IonSelectOption, IonHeader, IonButton, IonItem, IonLabel, IonInput, IonCheckbox, IonToolbar, IonContent, IonTitle, IonButtons } from "@ionic/angular/standalone";
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PermissionResponseDto } from 'src/app/models/permission.model';
import { GroupService } from 'src/app/services/group.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-add-group-modal',
  standalone: true,
  imports: [
    IonButtons,
    IonTitle,
    IonContent,
    IonToolbar,
    IonCheckbox,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonHeader,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
    NgMultiSelectDropDownModule
  ],
  templateUrl: 'add-group-modal.component.html',
  styleUrl: './add-group-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupModalComponent implements OnInit {
  permissions: PermissionResponseDto[] = [];
  selectedPermissions: PermissionResponseDto[] = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(
    private modalController: ModalController,
    private lookupService: LookupService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.loadPermissions();
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

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  loadPermissions() {
    this.lookupService.getAllPermissions().subscribe((data) => {
      this.permissions = data['result'];
      console.log(data);
    });
  }

  addGroup(groupForm: NgForm) {
    if (groupForm.valid) {

      // Extract permissions from the form value
      const { permissions, ...groupData } = groupForm.value;

      // Map permissions to their IDs
      const permissionIds = permissions.map((permission: { id: string; }) => permission.id);

      // Create a new object with the updated permissions
      const newGroup = { ...groupData, permissions: permissionIds };

      this.groupService.addGroup(newGroup).subscribe(
        () => {
          console.log('Group added successfully');
          this.dismiss({ createdGroup: newGroup });
        },
        (error) => {
          console.error('Error adding group:', error);
        }
      );
    }
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}
