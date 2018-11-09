import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CountUpModule } from 'countup.js-angular2';
import { ChartsModule } from 'ng2-charts';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { routing } from './app.routing';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FeaturesComponent } from './features/features.component';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    IndexComponent,
    NavbarComponent,
    FeaturesComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routing,
    ),
    HttpClientModule,
    CountUpModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
