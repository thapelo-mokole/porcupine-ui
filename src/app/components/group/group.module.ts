import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupComponent } from './group.component';
import { NoDataComponentModule } from 'src/app/utils/no-data/no-data.module';
import { EditGroupModalComponentModule } from './edit-group-modal/edit-group-modal.module';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, NoDataComponentModule, EditGroupModalComponentModule, ],
  declarations: [GroupComponent],
  exports: [GroupComponent]
})
export class GroupComponentModule {}
