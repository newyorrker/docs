import Ticket from './Ticket';

export default class Idea extends Ticket {
  costs?: string;
  solution?: string;
  hasBigEffect?: boolean;
  effectFormation?: string;

  constructor(data: any) {
    super();
    Object.assign(this, data);
  }
}
