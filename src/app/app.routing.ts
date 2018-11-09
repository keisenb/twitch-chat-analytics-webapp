import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IndexComponent } from './index/index.component';
import { FeaturesComponent } from './features/features.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './_guards/auth/auth.guard';
import { RedirectComponent } from './redirect/redirect.component';

export const routing: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
    { path: 'redirect/login', component: RedirectComponent },
    { path: 'features', component: FeaturesComponent },
    { path: 'callback', component: CallbackComponent },
    { path: '', component: IndexComponent },
    { path: '**', component: PageNotFoundComponent }
];
