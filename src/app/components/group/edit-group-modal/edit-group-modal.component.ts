import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GroupResponseDto } from 'src/app/models/group.model';
import { PermissionResponseDto } from 'src/app/models/permission.model';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: 'edit-group-modal.component.html',
  styleUrl: './edit-group-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditGroupModalComponent implements OnInit {
  @Input() group!: GroupResponseDto;

  permissions: PermissionResponseDto[] = [];
  selectedPermissions: PermissionResponseDto[] = [];

  dropdownSettings: IDropdownSettings = {};

  constructor(
    private modalController: ModalController,
    private lookupService: LookupService
  ) { }

  ngOnInit() {
    this.selectedPermissions = this.group.permissions;
    this.loadPermissions();
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

  loadPermissions() {
    this.lookupService.getAllPermissions().subscribe((data) => {
      this.permissions = data['result'];
    });
  }

  onSubmit(form: NgForm) {
    this.modalController.dismiss({
      updatedGroup: this.group,
      updatedPermissions: this.selectedPermissions
    });
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}
