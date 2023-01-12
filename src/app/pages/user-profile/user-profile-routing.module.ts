import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {
    path: '', component: UserProfileComponent, children: [
      { path: 'personal-data', component: PersonalDataComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: '', pathMatch: 'full', redirectTo: 'personal-data' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
