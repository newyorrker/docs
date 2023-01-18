import Ticket from './Ticket';

export default class Problem extends Ticket {
  riskLevel?: string;
  riskLocation?: string;
  isAnonymous?: boolean;

  constructor(data: any) {
    super();
    Object.assign(this, data);
  }
}
