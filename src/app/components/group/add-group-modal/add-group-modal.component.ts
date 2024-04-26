import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonSelect, IonSelectOption, IonHeader, IonButton, IonItem, IonLabel, IonInput, IonCheckbox, IonToolbar, IonContent, IonTitle, IonButtons } from "@ionic/angular/standalone";
import { GroupService } from 'src/app/services/group.service';

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
  ],
  templateUrl: 'add-group-modal.component.html',
  styleUrl: './add-group-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupModalComponent {
  constructor(
    private modalController: ModalController,
    private groupService: GroupService
  ) { }

  addGroup(groupForm: NgForm) {
    if (groupForm.valid) {
      const groupData = groupForm.value;
      const newGroup = { ...groupData, materialAssigned: [] };

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
