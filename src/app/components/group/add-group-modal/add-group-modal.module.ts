import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoDataComponentModule } from 'src/app/utils/no-data/no-data.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddGroupModalComponent } from './add-group-modal.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NoDataComponentModule, NgMultiSelectDropDownModule.forRoot(),],
  declarations: [AddGroupModalComponent],
  exports: [AddGroupModalComponent]
})
export class AddGroupModalComponentModule { }
