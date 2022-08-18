import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    ChecklistListComponent,
    ChecklistFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService,ChecklistService,ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }