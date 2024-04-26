import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoDataComponentModule } from 'src/app/utils/no-data/no-data.module';
import { EditPermissionModalComponent } from './edit-permission-modal.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NoDataComponentModule],
  declarations: [EditPermissionModalComponent],
  exports: [EditPermissionModalComponent]
})
export class EditPermissionModalComponentModule { }
