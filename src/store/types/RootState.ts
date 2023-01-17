import { AxiosInstance } from "axios";
import { UserProfile } from "../../../../../common/api/models/UserProfile";
import { Session } from "@/types/Session";

export interface RootState {
  session?: Session | null;
  client?: AxiosInstance;
  spinner: boolean;
  isTokenUpdating: boolean;
  profile: UserProfile | null;
}
