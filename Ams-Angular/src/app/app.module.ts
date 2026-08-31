import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RoleSelectComponent } from './role-select/role-select.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

import { AddCarrierComponent } from './add-carrier/add-carrier.component';
import { EditCarrierComponent } from './edit-carrier/edit-carrier.component';
import { SearchCarrierComponent } from './search-carrier/search-carrier.component';
import { ListCarrierComponent } from './list-carrier/list-carrier.component';
import { CarrierManagementComponent } from './carrier-management/carrier-management.component';

import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FlightManagementComponent } from './flight-management/flight-management.component';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { ListFlightComponent } from './list-flight/list-flight.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { EditFlightComponent } from './edit-flight/edit-flight.component';
import { FlightScheduleManagementComponent } from './flight-schedule-management/flight-schedule-management.component';
import { AddFlightScheduleComponent } from './add-flight-schedule/add-flight-schedule.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { ListFlightScheduleComponent } from './list-flight-schedule/list-flight-schedule.component';
import { SearchFlightScheduleComponent } from './search-flight-schedule/search-flight-schedule.component';
import { EditFlightScheduleComponent } from './edit-flight-schedule/edit-flight-schedule.component';
import { ViewEditUserProfileComponent } from './view-edit-user-profile/view-edit-user-profile.component';


import { FlightBookingManagementComponent } from './flight-booking-management/flight-booking-management.component';
import { FlightBookingService } from './services/flight-booking.service';
import { FlightService } from './services/flight.service';
import { FlightScheduleService } from './services/flight-schedule.service';
import { UserService } from './services/user.service';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { ViewFlightBookingComponent } from './view-flight-booking/view-flight-booking.component';
import { JsonParsePipe } from './pipes/json-parse.pipe';
import { AddBulkCarrierComponent } from './add-bulk-carrier/add-bulk-carrier.component';
import { AddBulkFlightComponent } from './add-bulk-flight/add-bulk-flight.component';
import { AddBulkFlightScheduleComponent } from './add-bulk-flight-schedule/add-bulk-flight-schedule.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReportsComponent } from './reports/reports.component';

const appRoutes: Routes = [
  { path: '', component: RoleSelectComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-signup', component: UserSignupComponent },
  { path: 'user-home', component: UserHomeComponent },

  // Admin layout with nested children routes
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'admin-home', component: AdminHomeComponent },
      { path: 'carrier-management', component: CarrierManagementComponent },
      { path: 'add-carrier', component: AddCarrierComponent },
      { path: 'add-bulk-carrier', component: AddBulkCarrierComponent },
      { path: 'edit-carrier', component: EditCarrierComponent },
      { path: 'search-carrier', component: SearchCarrierComponent },
      { path: 'list-carrier', component: ListCarrierComponent },
      { path: 'flight-management', component: FlightManagementComponent },
      { path: 'add-flight', component: AddFlightComponent },
      { path: 'list-flight', component: ListFlightComponent },
      { path: 'search-flight', component: SearchFlightComponent },
      { path: 'edit-flight', component: EditFlightComponent },
      { path: 'flight-schedule-management', component: FlightScheduleManagementComponent },
      { path: 'add-flight-schedule', component: AddFlightScheduleComponent },
      { path: 'edit-flight-schedule', component: EditFlightScheduleComponent },
      { path: 'list-flight-schedule', component: ListFlightScheduleComponent },
      { path: 'search-flight-schedule', component: SearchFlightScheduleComponent },
      { path: 'add-bulk-flight', component: AddBulkFlightComponent },
      { path: 'add-bulk-flight-schedule', component: AddBulkFlightScheduleComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'reports', component: ReportsComponent },


    ]
  },

  // User layout with nested children routes
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      { path: 'home', component: UserHomeComponent },
      { path: 'view-edit-user-profile', component: ViewEditUserProfileComponent },
      { path: 'flight-booking-management', component: FlightBookingManagementComponent },
      { path: 'book-flight/:id', component: BookFlightComponent },
      { path: 'view-flight-booking', component: ViewFlightBookingComponent }
      // { path: 'view-bookings', component: ViewBookingsComponent }

      // Add other user routes here
    ]
  },

  // Wildcard route (optional)
  // { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    RoleSelectComponent,
    AdminHomeComponent,
    UserHomeComponent,
    AdminLoginComponent,
    UserLoginComponent,
    UserSignupComponent,
    AddCarrierComponent,
    EditCarrierComponent,
    SearchCarrierComponent,
    ListCarrierComponent,
    CarrierManagementComponent,
    AdminHeaderComponent,
    FooterComponent,
    AdminLayoutComponent,
    FlightManagementComponent,
    AddFlightComponent,
    ListFlightComponent,
    SearchFlightComponent,
    EditFlightComponent,
    FlightScheduleManagementComponent,
    AddFlightScheduleComponent,
    UserHeaderComponent,
    UserLayoutComponent,
    ListFlightScheduleComponent,
    SearchFlightScheduleComponent,
    EditFlightScheduleComponent,
    ViewEditUserProfileComponent,
    FlightBookingManagementComponent,
    BookFlightComponent,
    ViewFlightBookingComponent,
    JsonParsePipe,
    AddBulkCarrierComponent,
    AddBulkFlightComponent,
    AddBulkFlightScheduleComponent,
    UserManagementComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
