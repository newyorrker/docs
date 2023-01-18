export default interface ImageFile {
  file?: File;
  fileId?: string | null;
  isUploading: boolean;
  percantage?: number;
  cancelToken?: any;
}
