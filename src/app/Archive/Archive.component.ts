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

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ArchiveService } from './Archive.service';
import { UserService } from '../user.service';
import 'rxjs/add/operator/toPromise';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-archive',
  templateUrl: './Archive.component.html',
  styleUrls: ['./Archive.component.css'],
  providers: [ArchiveService, UserService]
})
export class ArchiveComponent implements OnInit {

  @ViewChild(FileUploadComponent)
  private fileUpload: FileUploadComponent;

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  od = new FormControl('', Validators.required);
  End_File_No = new FormControl('', Validators.required);
  End_File_Date = new FormControl('', Validators.required);
  BatchNo = new FormControl('', Validators.required);
  BatchYear = new FormControl('', Validators.required);
  End_File_URL = new FormControl('', Validators.required);


  constructor(private serviceArchive: ArchiveService, private serviceUser: UserService, fb: FormBuilder) {
    this.myForm = fb.group({
      od: this.od,
      End_File_No: this.End_File_No,
      End_File_Date: this.End_File_Date,
      BatchNo: this.BatchNo,
      BatchYear: this.BatchYear,
      End_File_URL: this.End_File_URL
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceArchive.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(transaction => {
          tempList.push(transaction);
        });
        this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.example.archive.Archive',
      'od': this.od.value,
      'End_File_No': this.End_File_No.value,
      'End_File_Date': this.End_File_Date.value,
      'BatchNo': this.BatchNo.value,
      'BatchYear': this.BatchYear.value,
      'End_File_URL': this.End_File_URL.value
    };

    this.myForm.setValue({
      'od': null,
      'End_File_No': null,
      'End_File_Date': null,
      'BatchNo': null,
      'BatchYear': null,
      'End_File_URL': null
    });

    return this.serviceArchive.addTransaction(this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({
          'od': null,
          'End_File_No': null,
          'End_File_Date': null,
          'BatchNo': null,
          'BatchYear': null,
          'End_File_URL': null
        });
      })
      .catch((error) => {
        if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        } else {
          this.errorMessage = error;
        }
      });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.example.archive.Archive',
      'od': this.od.value,
      'End_File_No': this.End_File_No.value,
      'End_File_Date': this.End_File_Date.value,
      'BatchNo': this.BatchNo.value,
      'BatchYear': this.BatchYear.value,
      'End_File_URL': this.End_File_URL.value
    };

    return this.serviceArchive.updateTransaction(form.get('transactionId').value, this.Transaction)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceArchive.deleteTransaction(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
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

    return this.serviceArchive.getTransaction(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        const formObject = {
          'od': null,
          'End_File_No': null,
          'End_File_Date': null,
          'BatchNo': null,
          'BatchYear': null,
          'End_File_URL': null
        };

        if (result.od) {
          formObject.od = result.od;
        } else {
          formObject.od = null;
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
      'od': null,
      'End_File_No': null,
      'End_File_Date': null,
      'BatchNo': null,
      'BatchYear': null,
      'End_File_URL': null
    });
    this.fileUpload.clearFile();
  }


  onClickDefault(i: number): void {
    const ars = [{
      'od': '桃稅蘆1064413137',
      'End_File_No': 'TY08020302011070021536',
      'End_File_Date': '10710251246',
      'BatchNo': '36',
      'BatchYear': '102',
      'End_File_URL': null
    },
    {
      'od': '桃稅1063702754',
      'End_File_No': 'TY08020302011070021536',
      'End_File_Date': '10710251246',
      'BatchNo': '36',
      'BatchYear': '102',
      'End_File_URL': null
    },
    {
      'od': '桃稅蘆1064413368',
      'End_File_No': 'TY08020302011070021536',
      'End_File_Date': '10710251246',
      'BatchNo': '36',
      'BatchYear': '102',
      'End_File_URL': null
    },
    {
      'od': '桃稅蘆1064413642',
      'End_File_No': 'TY08020302011070040722',
      'End_File_Date': '10710252038',
      'BatchNo': '12',
      'BatchYear': '105',
      'End_File_URL': null
    }];

      this.myForm.setValue(ars[i - 1]);

  }

  onUploaded(fileUrl: string): void {
    this.End_File_URL.setValue(fileUrl);
  }
}
