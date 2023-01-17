import { Repository } from "../../../../common/api/repositories/Repository";
import { AxiosInstance } from "axios";

export class UgmkRepository implements Repository {
  // @ts-ignore
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  // timesheet(): Promise<Timesheet[]> {
  //   return this.client
  //     .get<TimesheetInterface[]>("/ugmk/users/current/timesheets")
  //     .then(({ data }) => {
  //       return data.map(item => new Timesheet(item));
  //     });
  // }

  // payrolls(): Promise<Payroll[]> {
  //   return this.client
  //     .get<PayrollInterface[]>("/ugmk/users/current/payrolls")
  //     .then(({ data }) => {
  //       return data.map(item => new Payroll(item));
  //     });
  // }

  // vacations(): Promise<Vacation> {
  //   return this.client
  //     .get<VacationInterface>("/ugmk/users/current/vacations")
  //     .then(({ data }) => {
  //       return new Vacation(data);
  //     });
  // }
}
