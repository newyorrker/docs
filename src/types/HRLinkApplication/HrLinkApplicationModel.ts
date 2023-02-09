
import { DateTime } from "luxon";
import { DocumentUserProfileModel } from "../HrLinkDocument/DocumentUserProfileModel";
import { HRLinkApplicationDto } from "./HrLinkApplicationDto";
import { HrLinkApplicationInterface } from "./HrLinkApplicationInterface";


export class HrLinkApplicationModel implements HrLinkApplicationInterface {
  id: string;
  applicationGroupId: string;
  createdAt: DateTime;
  number: String
  typeId: string;
  typeName: string;
  creator: DocumentUserProfileModel;
  approver: DocumentUserProfileModel;


  constructor(data: HRLinkApplicationDto) {
      // const
      Object.assign(this, data);

      if(data.createdAt) {
        this.createdAt = DateTime.fromISO(data.createdAt);
      }
      else {
        this.createdAt = DateTime.local();
        console.error("remove this wrong time")
      }

      this.creator = Object.freeze(new DocumentUserProfileModel(data.creator));
      this.approver = Object.freeze(new DocumentUserProfileModel(data.approver));
  }
}