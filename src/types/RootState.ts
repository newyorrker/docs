import Session from '@/models/Session';
import { UserProfile } from '../../../../common/api/models/UserProfile';

export default interface RootState {
  session?: Session;
  urlParams?: { [k: string]: string };
  userProfile?: UserProfile;
}
