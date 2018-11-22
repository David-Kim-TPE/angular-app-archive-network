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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { OfficialDocumentComponent } from './OfficialDocument/OfficialDocument.component';

import { SecretaryComponent } from './Secretary/Secretary.component';
import { QuerentComponent } from './Querent/Querent.component';

import { ArchiveComponent } from './Archive/Archive.component';
import { ArchivePrintComponent } from './ArchivePrint/ArchivePrint.component';
import { InquiryComponent } from './Inquiry/Inquiry.component';
import { DemoComponent } from './Demo/Demo.component';
import { InquiryHistorianComponent } from './InquiryHistorian/InquiryHistorian.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CardsComponent } from './cards/cards.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'OfficialDocument', component: OfficialDocumentComponent },
  { path: 'Secretary', component: SecretaryComponent },
  { path: 'Querent', component: QuerentComponent },
  { path: 'Archive', component: ArchiveComponent },
  { path: 'ArchivePrint', component: ArchivePrintComponent },
  { path: 'Inquiry', component: InquiryComponent },
  { path: 'Demo', component: DemoComponent },
  { path: 'InquiryHistorian', component: InquiryHistorianComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'Cards', component: CardsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
