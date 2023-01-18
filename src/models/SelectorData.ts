import { SelectorItem } from '@/types/SelectorItem';

export default class SelectorData {
  isLoading: boolean = false;
  cancelToken: any = null; // ???
  isAjax: boolean = false;
  list: SelectorItem[] = [];
  schema: string;
  searchField: string;

  constructor(schema: string, searchField: string = 'title') {
    this.schema = schema;
    this.searchField = searchField;
  }
}
