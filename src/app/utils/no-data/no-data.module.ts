import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NoDataComponent } from './no-data.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [NoDataComponent],
  exports: [NoDataComponent]
})
export class NoDataComponentModule {}
