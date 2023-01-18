import { getProfileColor } from '@/helpers/ProfileColor';
import BaseType from './BaseType';

export class UserProfile extends BaseType {
  lastName = '';
  firstName = '';
  middleName = '';
  photoFileId: string | undefined = undefined;
  userId: number | undefined = undefined;

  constructor(data: UserProfile) {
    super();

    Object.assign(this, {
      id: data.id ? data.id : '',
      lastName: data.lastName ? data.lastName : '',
      firstName: data.firstName ? data.firstName : '',
      middleName: data.middleName ? data.middleName : '',
      photoFileId: data.photoFileId ? data.photoFileId : undefined,
      userId: data.userId ? data.userId : undefined,
      updatedAt: data.updatedAt ? data.updatedAt : undefined,
    });
  }

  get initials(): string {
    const firstName = this.firstName && this.firstName[0],
      lastName = this.lastName && this.lastName[0];
    return [firstName || '', lastName || ''].filter(item => item).join('');
  }

  get lastNameWithInitials(): string {
    const firstName = this.firstName && this.firstName[0] + '.',
      middleName = this.middleName && this.middleName[0] + '.';
    return `${this.lastName || ''} ${[firstName || '', middleName || ''].filter(item => item).join(' ')}`.trim();
  }

  get fullName(): string {
    return [this.firstName, this.lastName].filter(item => item).join(' ');
  }

  profilePhotoLink(backend: string, width = 88): string {
    return this.photoFileId ? backend + `/images/${this.photoFileId}/download?width=${width}` : '';
  }

  get profileColor(): string {
    const id = (this as any).profileId || this.id || '';
    return getProfileColor(id);
  }
}
