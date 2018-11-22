/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { OfficialDocumentComponent } from './OfficialDocument/OfficialDocument.component';

import { SecretaryComponent } from './Secretary/Secretary.component';
import { QuerentComponent } from './Querent/Querent.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { ArchiveComponent } from './Archive/Archive.component';
import { ArchivePrintComponent } from './ArchivePrint/ArchivePrint.component';
import { InquiryComponent } from './Inquiry/Inquiry.component';
import { DemoComponent } from './Demo/Demo.component';
import { InquiryHistorianComponent } from './InquiryHistorian/InquiryHistorian.component';
import { AnimateComponent } from './animate/animate.component';
import { AnimateService } from './animate/animate.service';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CardsComponent } from './cards/cards.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OfficialDocumentComponent,
    SecretaryComponent,
    QuerentComponent,
    ArchiveComponent,
    ArchivePrintComponent,
    InquiryComponent,
    DemoComponent,
    InquiryHistorianComponent,
    AnimateComponent,
    LoginPanelComponent,
    SignUpComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    AnimateService,
    UserService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
