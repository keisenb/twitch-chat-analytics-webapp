import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IndexComponent } from './index/index.component';
import { FeaturesComponent } from './features/features.component';
import { CallbackComponent } from './callback/callback.component';

export const routing: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'features', component: FeaturesComponent },
    { path: 'callback', component: CallbackComponent },
    { path: '', component: IndexComponent },
    { path: '**', component: PageNotFoundComponent }
];
