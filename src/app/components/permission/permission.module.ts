import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionComponent } from './permission.component';
import { NoDataComponentModule } from 'src/app/utils/no-data/no-data.module';
import { EditPermissionModalComponentModule } from './edit-permission-modal/edit-permission-modal.module';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, NoDataComponentModule, EditPermissionModalComponentModule ],
  declarations: [PermissionComponent],
  exports: [PermissionComponent]
})
export class PermissionComponentModule {}
