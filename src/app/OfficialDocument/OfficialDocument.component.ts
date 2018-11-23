/*
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OfficialDocumentService } from './OfficialDocument.service';
import { UserService } from '../user.service';
import 'rxjs/add/operator/toPromise';
import $ from 'jquery';

@Component({
  selector: 'app-officialdocument',
  templateUrl: './OfficialDocument.component.html',
  styleUrls: ['./OfficialDocument.component.css'],
  providers: [OfficialDocumentService, UserService]
})
export class OfficialDocumentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;
  private tableWidth;
  private tableHeight;

  Issue_No = new FormControl('', Validators.required);
  Issue_Date = new FormControl('', Validators.required);
  Class_Type = new FormControl('', Validators.required);
  Send_Class_ID = new FormControl('', Validators.required);
  Duty_Name = new FormControl('', Validators.required);
  Duty_Birthday = new FormControl('', Validators.required);
  Duty_ZipCode = new FormControl('', Validators.required);
  Duty_Addr = new FormControl('', Validators.required);
  Legal_Case_ID = new FormControl('', Validators.required);
  Pay_Amt = new FormControl('', Validators.required);
  Protect_Exit_Org = new FormControl('');
  Protect_Punish_Org = new FormControl('');
  Protect_Guar_Org = new FormControl('');
  Protect_Sei_Org = new FormControl('');
  Protect_Closed_Org = new FormControl('');
  Pay_Period_Due_Date = new FormControl('', Validators.required);
  Is_Punishment = new FormControl('');
  End_File_No = new FormControl('');
  End_File_Date = new FormControl('');
  BatchNo = new FormControl('');
  BatchYear = new FormControl('');
  End_Print_Date = new FormControl('');
  End_Valid_Date = new FormControl('');
  Agency_Id = new FormControl('', Validators.required);
  Transfer_Agency_Id = new FormControl('', Validators.required);
  Transfer_Date = new FormControl('', Validators.required);
  End_File_Submiter = new FormControl('');
  Creator = new FormControl('', Validators.required);
  End_File_Printer = new FormControl('');
  File_URL = new FormControl('');
  End_File_URL = new FormControl('');

  constructor(public serviceOfficialDocument: OfficialDocumentService, private serviceUser: UserService, fb: FormBuilder) {
    this.myForm = fb.group({
      Issue_No: this.Issue_No,
      Issue_Date: this.Issue_Date,
      Class_Type: this.Class_Type,
      Send_Class_ID: this.Send_Class_ID,
      Duty_Name: this.Duty_Name,
      Duty_Birthday: this.Duty_Birthday,
      Duty_ZipCode: this.Duty_ZipCode,
      Duty_Addr: this.Duty_Addr,
      Legal_Case_ID: this.Legal_Case_ID,
      Pay_Amt: this.Pay_Amt,
      Protect_Exit_Org: (this.Protect_Exit_Org ? true : false),
      Protect_Punish_Org: (this.Protect_Punish_Org ? true : false),
      Protect_Guar_Org: (this.Protect_Guar_Org ? true : false),
      Protect_Sei_Org: (this.Protect_Sei_Org ? true : false),
      Protect_Closed_Org: (this.Protect_Closed_Org ? true : false),
      Pay_Period_Due_Date: this.Pay_Period_Due_Date,
      Is_Punishment: (this.Is_Punishment ? true : false),
      End_File_No: this.End_File_No,
      End_File_Date: this.End_File_Date,
      BatchNo: this.BatchNo,
      BatchYear: this.BatchYear,
      End_Print_Date: this.End_Print_Date,
      End_Valid_Date: this.End_Valid_Date,
      Agency_Id: this.Agency_Id,
      Transfer_Agency_Id: this.Transfer_Agency_Id,
      Transfer_Date: this.Transfer_Date,
      End_File_Submiter: this.End_File_Submiter,
      Creator: this.Creator,
      End_File_Printer: this.End_File_Printer,
      File_URL: this.File_URL,
      End_File_URL: this.End_File_URL
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceOfficialDocument.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.archive.OfficialDocument',
      'Issue_No': this.Issue_No.value,
      'Issue_Date': this.Issue_Date.value,
      'Class_Type': this.Class_Type.value,
      'Send_Class_ID': this.Send_Class_ID.value,
      'Duty_Name': this.Duty_Name.value,
      'Duty_Birthday': this.Duty_Birthday.value,
      'Duty_ZipCode': this.Duty_ZipCode.value,
      'Duty_Addr': this.Duty_Addr.value,
      'Legal_Case_ID': this.Legal_Case_ID.value,
      'Pay_Amt': this.Pay_Amt.value,
      'Protect_Exit_Org': this.Protect_Exit_Org.value,
      'Protect_Punish_Org': this.Protect_Punish_Org.value,
      'Protect_Guar_Org': this.Protect_Guar_Org.value,
      'Protect_Sei_Org': this.Protect_Sei_Org.value,
      'Protect_Closed_Org': this.Protect_Closed_Org.value,
      'Pay_Period_Due_Date': this.Pay_Period_Due_Date.value,
      'Is_Punishment': this.Is_Punishment.value,
      'End_File_No': this.End_File_No.value,
      'End_File_Date': this.End_File_Date.value,
      'BatchNo': this.BatchNo.value,
      'BatchYear': this.BatchYear.value,
      'End_Print_Date': this.End_Print_Date.value,
      'End_Valid_Date': this.End_Valid_Date.value,
      'Agency_Id': this.Agency_Id.value,
      'Transfer_Agency_Id': this.Transfer_Agency_Id.value,
      'Transfer_Date': this.Transfer_Date.value,
      'End_File_Submiter': this.End_File_Submiter.value,
      'Creator': this.Creator.value,
      'End_File_Printer': this.End_File_Printer.value,
      'File_URL': this.File_URL.value,
      'End_File_URL': this.End_File_URL.value
    };

    this.myForm.setValue({
      'Issue_No': null,
      'Issue_Date': null,
      'Class_Type': null,
      'Send_Class_ID': null,
      'Duty_Name': null,
      'Duty_Birthday': null,
      'Duty_ZipCode': null,
      'Duty_Addr': null,
      'Legal_Case_ID': null,
      'Pay_Amt': null,
      'Protect_Exit_Org': null,
      'Protect_Punish_Org': null,
      'Protect_Guar_Org': null,
      'Protect_Sei_Org': null,
      'Protect_Closed_Org': null,
      'Pay_Period_Due_Date': null,
      'Is_Punishment': null,
      'End_File_No': null,
      'End_File_Date': null,
      'BatchNo': null,
      'BatchYear': null,
      'End_Print_Date': null,
      'End_Valid_Date': null,
      'Agency_Id': null,
      'Transfer_Agency_Id': null,
      'Transfer_Date': null,
      'End_File_Submiter': null,
      'Creator': null,
      'End_File_Printer': null,
      'File_URL': null,
      'End_File_URL': null
    });

    return this.serviceOfficialDocument.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({
          'Issue_No': null,
          'Issue_Date': null,
          'Class_Type': null,
          'Send_Class_ID': null,
          'Duty_Name': null,
          'Duty_Birthday': null,
          'Duty_ZipCode': null,
          'Duty_Addr': null,
          'Legal_Case_ID': null,
          'Pay_Amt': null,
          'Protect_Exit_Org': null,
          'Protect_Punish_Org': null,
          'Protect_Guar_Org': null,
          'Protect_Sei_Org': null,
          'Protect_Closed_Org': null,
          'Pay_Period_Due_Date': null,
          'Is_Punishment': null,
          'End_File_No': null,
          'End_File_Date': null,
          'BatchNo': null,
          'BatchYear': null,
          'End_Print_Date': null,
          'End_Valid_Date': null,
          'Agency_Id': null,
          'Transfer_Agency_Id': null,
          'Transfer_Date': null,
          'End_File_Submiter': null,
          'Creator': null,
          'End_File_Printer': null,
          'File_URL': null,
          'End_File_URL': null
        });
        this.loadAll();
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.archive.OfficialDocument',
      'Issue_Date': this.Issue_Date.value,
      'Class_Type': this.Class_Type.value,
      'Send_Class_ID': this.Send_Class_ID.value,
      'Duty_Name': this.Duty_Name.value,
      'Duty_Birthday': this.Duty_Birthday.value,
      'Duty_ZipCode': this.Duty_ZipCode.value,
      'Duty_Addr': this.Duty_Addr.value,
      'Legal_Case_ID': this.Legal_Case_ID.value,
      'Pay_Amt': this.Pay_Amt.value,
      'Protect_Exit_Org': this.Protect_Exit_Org.value,
      'Protect_Punish_Org': this.Protect_Punish_Org.value,
      'Protect_Guar_Org': this.Protect_Guar_Org.value,
      'Protect_Sei_Org': this.Protect_Sei_Org.value,
      'Protect_Closed_Org': this.Protect_Closed_Org.value,
      'Pay_Period_Due_Date': this.Pay_Period_Due_Date.value,
      'Is_Punishment': this.Is_Punishment.value,
      'End_File_No': this.End_File_No.value,
      'End_File_Date': this.End_File_Date.value,
      'BatchNo': this.BatchNo.value,
      'BatchYear': this.BatchYear.value,
      'End_Print_Date': this.End_Print_Date.value,
      'End_Valid_Date': this.End_Valid_Date.value,
      'Agency_Id': this.Agency_Id.value,
      'Transfer_Agency_Id': this.Transfer_Agency_Id.value,
      'Transfer_Date': this.Transfer_Date.value,
      'End_File_Submiter': this.End_File_Submiter.value,
      'Creator': this.Creator.value,
      'End_File_Printer': this.End_File_Printer.value,
      'File_URL': this.File_URL.value,
      'End_File_URL': this.End_File_URL.value
    };

    return this.serviceOfficialDocument.updateAsset(form.get('Issue_No').value, this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.loadAll();
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }


  deleteAsset(): Promise<any> {

    return this.serviceOfficialDocument.deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.loadAll();
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceOfficialDocument.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        const formObject = {
          'Issue_No': null,
          'Issue_Date': null,
          'Class_Type': null,
          'Send_Class_ID': null,
          'Duty_Name': null,
          'Duty_Birthday': null,
          'Duty_ZipCode': null,
          'Duty_Addr': null,
          'Legal_Case_ID': null,
          'Pay_Amt': null,
          'Protect_Exit_Org': null,
          'Protect_Punish_Org': null,
          'Protect_Guar_Org': null,
          'Protect_Sei_Org': null,
          'Protect_Closed_Org': null,
          'Pay_Period_Due_Date': null,
          'Is_Punishment': null,
          'End_File_No': null,
          'End_File_Date': null,
          'BatchNo': null,
          'BatchYear': null,
          'End_Print_Date': null,
          'End_Valid_Date': null,
          'Agency_Id': null,
          'Transfer_Agency_Id': null,
          'Transfer_Date': null,
          'End_File_Submiter': null,
          'Creator': null,
          'End_File_Printer': null,
          'File_URL': null,
          'End_File_URL': null
        };

        if (result.Issue_No) {
          formObject.Issue_No = result.Issue_No;
        } else {
          formObject.Issue_No = null;
        }

        if (result.Issue_Date) {
          formObject.Issue_Date = result.Issue_Date;
        } else {
          formObject.Issue_Date = null;
        }

        if (result.Class_Type) {
          formObject.Class_Type = result.Class_Type;
        } else {
          formObject.Class_Type = null;
        }

        if (result.Send_Class_ID) {
          formObject.Send_Class_ID = result.Send_Class_ID;
        } else {
          formObject.Send_Class_ID = null;
        }

        if (result.Duty_Name) {
          formObject.Duty_Name = result.Duty_Name;
        } else {
          formObject.Duty_Name = null;
        }

        if (result.Duty_Birthday) {
          formObject.Duty_Birthday = result.Duty_Birthday;
        } else {
          formObject.Duty_Birthday = null;
        }

        if (result.Duty_ZipCode) {
          formObject.Duty_ZipCode = result.Duty_ZipCode;
        } else {
          formObject.Duty_ZipCode = null;
        }

        if (result.Duty_Addr) {
          formObject.Duty_Addr = result.Duty_Addr;
        } else {
          formObject.Duty_Addr = null;
        }

        if (result.Legal_Case_ID) {
          formObject.Legal_Case_ID = result.Legal_Case_ID;
        } else {
          formObject.Legal_Case_ID = null;
        }

        if (result.Pay_Amt) {
          formObject.Pay_Amt = result.Pay_Amt;
        } else {
          formObject.Pay_Amt = null;
        }

        if (result.Protect_Exit_Org) {
          formObject.Protect_Exit_Org = result.Protect_Exit_Org;
        } else {
          formObject.Protect_Exit_Org = null;
        }

        if (result.Protect_Punish_Org) {
          formObject.Protect_Punish_Org = result.Protect_Punish_Org;
        } else {
          formObject.Protect_Punish_Org = null;
        }

        if (result.Protect_Guar_Org) {
          formObject.Protect_Guar_Org = result.Protect_Guar_Org;
        } else {
          formObject.Protect_Guar_Org = null;
        }

        if (result.Protect_Sei_Org) {
          formObject.Protect_Sei_Org = result.Protect_Sei_Org;
        } else {
          formObject.Protect_Sei_Org = null;
        }

        if (result.Protect_Closed_Org) {
          formObject.Protect_Closed_Org = result.Protect_Closed_Org;
        } else {
          formObject.Protect_Closed_Org = null;
        }

        if (result.Pay_Period_Due_Date) {
          formObject.Pay_Period_Due_Date = result.Pay_Period_Due_Date;
        } else {
          formObject.Pay_Period_Due_Date = null;
        }

        if (result.Is_Punishment) {
          formObject.Is_Punishment = result.Is_Punishment;
        } else {
          formObject.Is_Punishment = null;
        }

        if (result.End_File_No) {
          formObject.End_File_No = result.End_File_No;
        } else {
          formObject.End_File_No = null;
        }

        if (result.End_File_Date) {
          formObject.End_File_Date = result.End_File_Date;
        } else {
          formObject.End_File_Date = null;
        }

        if (result.BatchNo) {
          formObject.BatchNo = result.BatchNo;
        } else {
          formObject.BatchNo = null;
        }

        if (result.BatchYear) {
          formObject.BatchYear = result.BatchYear;
        } else {
          formObject.BatchYear = null;
        }

        if (result.End_Print_Date) {
          formObject.End_Print_Date = result.End_Print_Date;
        } else {
          formObject.End_Print_Date = null;
        }

        if (result.End_Valid_Date) {
          formObject.End_Valid_Date = result.End_Valid_Date;
        } else {
          formObject.End_Valid_Date = null;
        }

        if (result.Agency_Id) {
          formObject.Agency_Id = result.Agency_Id;
        } else {
          formObject.Agency_Id = null;
        }

        if (result.Transfer_Agency_Id) {
          formObject.Transfer_Agency_Id = result.Transfer_Agency_Id;
        } else {
          formObject.Transfer_Agency_Id = null;
        }

        if (result.Transfer_Date) {
          formObject.Transfer_Date = result.Transfer_Date;
        } else {
          formObject.Transfer_Date = null;
        }

        if (result.End_File_Submiter) {
          formObject.End_File_Submiter = result.End_File_Submiter;
        } else {
          formObject.End_File_Submiter = null;
        }

        if (result.Creator) {
          formObject.Creator = result.Creator;
        } else {
          formObject.Creator = null;
        }

        if (result.End_File_Printer) {
          formObject.End_File_Printer = result.End_File_Printer;
        } else {
          formObject.End_File_Printer = null;
        }

        if (result.File_URL) {
          formObject.File_URL = result.File_URL;
        } else {
          formObject.File_URL = null;
        }

        if (result.End_File_URL) {
          formObject.End_File_URL = result.End_File_URL;
        } else {
          formObject.End_File_URL = null;
        }

        this.myForm.setValue(formObject);

      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else if (error === '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        } else {
          this.errorMessage = error;
        }
      });
  }

  resetForm(): void {
    this.myForm.setValue({
      'Issue_No': null,
      'Issue_Date': null,
      'Class_Type': null,
      'Send_Class_ID': null,
      'Duty_Name': null,
      'Duty_Birthday': null,
      'Duty_ZipCode': null,
      'Duty_Addr': null,
      'Legal_Case_ID': null,
      'Pay_Amt': null,
      'Protect_Exit_Org': null,
      'Protect_Punish_Org': null,
      'Protect_Guar_Org': null,
      'Protect_Sei_Org': null,
      'Protect_Closed_Org': null,
      'Pay_Period_Due_Date': null,
      'Is_Punishment': null,
      'End_File_No': null,
      'End_File_Date': null,
      'BatchNo': null,
      'BatchYear': null,
      'End_Print_Date': null,
      'End_Valid_Date': null,
      'Agency_Id': null,
      'Transfer_Agency_Id': null,
      'Transfer_Date': null,
      'End_File_Submiter': null,
      'Creator': null,
      'End_File_Printer': null,
      'File_URL': null,
      'End_File_URL': null
    });
  }

  onClickDefault(i: number): void {
    this.serviceUser.getCurrentUser().then(creator => {
      const creatorName = creator.split('#').pop();
      const ods = [
        {
          'Issue_No': '桃稅蘆1064413137',
          'Issue_Date': '1070105',
          'Class_Type': 'A',
          'Send_Class_ID': 'H42210601333',
          'Duty_Name': '王小明　　　遺產管理人：財政部國有財產署北區分署',
          'Duty_Birthday': '0691119',
          'Duty_ZipCode': '100',
          'Duty_Addr': '臺北市大安區羅斯福路四段一號',
          'Legal_Case_ID': '0101',
          'Pay_Amt': 3183,
          'Protect_Exit_Org': true,
          'Protect_Punish_Org': false,
          'Protect_Guar_Org': false,
          'Protect_Sei_Org': false,
          'Protect_Closed_Org': false,
          'Pay_Period_Due_Date': '1081113',
          'Is_Punishment': true,
          'End_File_No': '',
          'End_File_Date': '',
          'BatchNo': '',
          'BatchYear': '',
          'End_Print_Date': '',
          'End_Valid_Date': '',
          'Agency_Id': 'TP',
          'Transfer_Agency_Id': '103001',
          'Transfer_Date': '1071024',
          'Creator': creatorName,
          'End_File_Submiter': null,
          'End_File_Printer': null,
          'File_URL': null,
          'End_File_URL': null
        },
        {
          'Issue_No': '桃稅1063702754',
          'Issue_Date': '1080205',
          'Class_Type': 'B',
          'Send_Class_ID': 'H42210601334',
          'Duty_Name': '林○惠　　　遺產管理人：財政部國有財產署北區分署',
          'Duty_Birthday': '0450213',
          'Duty_ZipCode': '101',
          'Duty_Addr': '臺北市中正區濟南路 1 段 2 之 2 號 6 樓',
          'Legal_Case_ID': '0208',
          'Pay_Amt': 1197,
          'Protect_Exit_Org': false,
          'Protect_Punish_Org': false,
          'Protect_Guar_Org': false,
          'Protect_Sei_Org': false,
          'Protect_Closed_Org': false,
          'Pay_Period_Due_Date': '1091231',
          'Is_Punishment': false,
          'End_File_No': '',
          'End_File_Date': '',
          'BatchNo': '',
          'BatchYear': '',
          'End_Print_Date': '',
          'End_Valid_Date': '',
          'Agency_Id': 'TC',
          'Transfer_Agency_Id': '103002',
          'Transfer_Date': '1071023',
          'Creator': creatorName,
          'End_File_Submiter': null,
          'End_File_Printer': null,
          'File_URL': null,
          'End_File_URL': null
        },
        {
          'Issue_No': '桃稅蘆1064413368',
          'Issue_Date': '1070206',
          'Class_Type': 'C',
          'Send_Class_ID': 'H4221060133',
          'Duty_Name': '陳○天　　遺產管理人：財政部國有財產署北區分署',
          'Duty_Birthday': '0700618',
          'Duty_ZipCode': '22164',
          'Duty_Addr': '台北市中正區忠孝東路 1 段 1 號',
          'Legal_Case_ID': '0413',
          'Pay_Amt': 12420,
          'Protect_Exit_Org': false,
          'Protect_Punish_Org': false,
          'Protect_Guar_Org': true,
          'Protect_Sei_Org': false,
          'Protect_Closed_Org': false,
          'Pay_Period_Due_Date': '1070821',
          'Is_Punishment': true,
          'End_File_No': '',
          'End_File_Date': '',
          'BatchNo': '',
          'BatchYear': '',
          'End_Print_Date': '',
          'End_Valid_Date': '',
          'Agency_Id': 'SC',
          'Transfer_Agency_Id': '103003',
          'Transfer_Date': '1071022',
          'Creator': creatorName,
          'End_File_Submiter': null,
          'End_File_Printer': null,
          'File_URL': null,
          'End_File_URL': null
        },
        {
          'Issue_No': '桃稅蘆1064413642',
          'Issue_Date': '1070925',
          'Class_Type': 'D',
          'Send_Class_ID': 'H39210603396',
          'Duty_Name': '黃○瑞　 　 使用人：黃○瑞',
          'Duty_Birthday': '0231225',
          'Duty_ZipCode': '103',
          'Duty_Addr': '台北市士林區福國路100-4號1F',
          'Legal_Case_ID': '0470',
          'Pay_Amt': 25866,
          'Protect_Exit_Org': false,
          'Protect_Punish_Org': false,
          'Protect_Guar_Org': false,
          'Protect_Sei_Org': true,
          'Protect_Closed_Org': false,
          'Pay_Period_Due_Date': '1090423',
          'Is_Punishment': false,
          'End_File_No': '',
          'End_File_Date': '',
          'BatchNo': '',
          'BatchYear': '',
          'End_Print_Date': '',
          'End_Valid_Date': '',
          'Agency_Id': 'CY',
          'Transfer_Agency_Id': '103004',
          'Transfer_Date': '1071021',
          'Creator': creatorName,
          'End_File_Submiter': null,
          'End_File_Printer': null,
          'File_URL': null,
          'End_File_URL': null
        }
      ];

      this.myForm.setValue(ods[i - 1]);
    });
  }

  fullscreen(): void {
    console.log('fullscreen()');
    $('#table-container').toggleClass('fullscreen');
    $('#table-container-close').toggleClass('hidden');
    console.log($('#table-container')[0].style);
    if (this.tableWidth || this.tableHeight) {
      $('#table-container').css('width', this.tableWidth);
      $('#table-container').css('width', this.tableHeight);
      this.tableWidth = '';
      this.tableHeight = '';
    } else {
      this.tableWidth = $('#table-container').css.width;
      this.tableHeight = $('#table-container').css.height;
      $('#table-container').css('width', '');
      $('#table-container').css('height', '');
    }

  }

}
