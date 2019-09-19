import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [{path: 'user',
component: UserListComponent,
data: {title: 'User List'}
},
{path: 'home',
component: HomeComponent,
data: {title: 'Home'}
},
{
  path: '',
  redirectTo:'home',
  pathMatch: 'full'

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
