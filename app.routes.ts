import { Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {ListComponent} from './list.component';
import {AddComponent} from './add.component';
import {BrowseComponent} from './browse.component';
import {PopularComponent} from './popular.component';
import {PrivacyComponent} from './privacy.component';
import {HelpComponent} from './help.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'list', component: ListComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit/:id', component: AddComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'popular', component: PopularComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'help', component: HelpComponent},
  {path: '', redirectTo:"/home", pathMatch: 'full'}
];
