import TicketType from '@/types/TicketType';
import BaseType from './BaseType';

export default class Status extends BaseType {
  title?: string;
  code?: string;
  color?: string;
  iconFileId?: string;

  constructor(data: any) {
    super();
    Object.assign(this, data);
  }
}
