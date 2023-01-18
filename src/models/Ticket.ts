import BaseType from './BaseType';

export default class Ticket extends BaseType {
  title: string = '';
  category: string = '';
  status: string = '';
  description: string = '';
  company: string | null = null;
  branch: string | null = null;
  direction: string | null = null;
  responsibleUserId: number = 0;
  fileIds: string[] | null = null;
  imageFileIds: string[] | null = null;

  constructor() {
    super();
  }
}
