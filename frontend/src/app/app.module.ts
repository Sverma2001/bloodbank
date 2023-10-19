import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AddDonorComponent } from './home/add-donor/add-donor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDonorComponent } from './home/edit-donor/edit-donor.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DonorService } from './donor.service';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddDonorComponent,
    EditDonorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularToastifyModule
  ],
  providers: [DonorService,ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
