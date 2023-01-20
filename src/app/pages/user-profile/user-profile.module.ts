import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { PasswordChangeComponent } from './password-change/password-change.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    OrderHistoryComponent,
    PersonalDataComponent,
    PasswordChangeComponent,
  ],
  imports: [CommonModule, UserProfileRoutingModule, SharedModule],
})
export class UserProfileModule {}
