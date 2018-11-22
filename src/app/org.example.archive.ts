import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.archive{
   export enum ClassType {
      A,
      B,
      C,
      D,
      E,
   }
   export enum Agency {
      TP,
      SL,
      PC,
      TY,
      SC,
      TC,
      CH,
      CY,
      TN,
      KS,
      PT,
      HL,
      IL,
   }
   export class OfficialDocument extends Asset {
      Issue_No: string;
      Issue_Date: string;
      Class_Type: ClassType;
      Send_Class_ID: string;
      Duty_Name: string;
      Duty_Birthday: string;
      Duty_ZipCode: string;
      Duty_Addr: string;
      Legal_Case_ID: string;
      Pay_Amt: number;
      Protect_Exit_Org: boolean;
      Protect_Punish_Org: boolean;
      Protect_Guar_Org: boolean;
      Protect_Sei_Org: boolean;
      Protect_Closed_Org: boolean;
      Pay_Period_Due_Date: string;
      Is_Punishment: boolean;
      End_File_No: string;
      End_File_Date: string;
      BatchNo: string;
      BatchYear: string;
      End_Print_Date: string;
      End_Valid_Date: string;
      Agency_Id: Agency;
      Transfer_Agency_Id: string;
      Transfer_Date: string;
      End_File_Submiter: Secretary;
      Creator: Secretary;
      End_File_Printer: Secretary;
      File_URL: string;
      End_File_URL: string;
   }
   export abstract class Person extends Participant {
      personId: string;
      name: string;
      lastName: string;
   }
   export class Secretary extends Person {
   }
   export class Querent extends Person {
   }
   export class Archive extends Transaction {
      od: OfficialDocument;
      End_File_No: string;
      End_File_Date: string;
      BatchNo: string;
      BatchYear: string;
      End_File_URL: string;
   }
   export class ArchiveEvent extends Event {
      od: OfficialDocument;
   }
   export class ArchivePrint extends Transaction {
      od: OfficialDocument;
      End_Print_Date: string;
      End_File_Printer: Secretary;
   }
   export class ArchivePrintEvent extends Event {
      od: OfficialDocument;
   }
   export class Inquiry extends Transaction {
      od: OfficialDocument;
      Querent: Querent;
   }
   export class InquiryEvent extends Event {
      od: OfficialDocument;
      Querent: Querent;
   }
   export class Demo extends Transaction {
      ods: OfficialDocument[];
   }
   export class InquiryHistorian extends Transaction {
      Issue_No: string;
   }
// }
