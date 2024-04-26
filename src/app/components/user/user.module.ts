import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserComponent } from './user.component';
import { NoDataComponentModule } from 'src/app/utils/no-data/no-data.module';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, NoDataComponentModule],
  declarations: [UserComponent, AddUserModalComponent, EditUserModalComponent],
  exports: [UserComponent]
})
export class UserComponentModule {}
