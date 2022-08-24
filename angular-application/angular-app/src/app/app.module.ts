import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserService } from './service/user.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ChecklistFormComponent } from './checklist-form/checklist-form.component';
import { ChecklistService } from './checklist-service/checklist.service';
import { ChecklistListComponent } from './checklist-list/checklist-list.component';
import { ItemService } from './checklist-service/item.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    ChecklistListComponent,
    ChecklistFormComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgCircleProgressModule.forRoot({
      radius: 50,
      titleFontSize: '15',
      outerStrokeWidth: 10,
      innerStrokeWidth: 5,
      outerStrokeColor: '#0061ff',
      innerStrokeColor: '#74a7fe',
      animationDuration: 400,
    }),
  ],
  providers: [UserService, ChecklistService, ItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
