import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoDataComponentModule } from 'src/app/utils/no-data/no-data.module';
import { EditGroupModalComponent } from './edit-group-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NoDataComponentModule, NgMultiSelectDropDownModule.forRoot(),],
  declarations: [EditGroupModalComponent],
  exports: [EditGroupModalComponent]
})
export class EditGroupModalComponentModule { }
