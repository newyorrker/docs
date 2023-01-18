import TicketType from '@/types/TicketType';
import BaseType from './BaseType';

export default class Category extends BaseType {
  title?: string;
  imageFileId?: string;
  type?: TicketType;

  constructor(data: any) {
    super();
    Object.assign(this, data);
  }
}
