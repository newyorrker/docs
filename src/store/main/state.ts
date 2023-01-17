import { RootState } from "@/store/types/RootState";

export const state: RootState = {
  session: null,
  client: undefined,
  spinner: true,
  isTokenUpdating: false,
  profile: null
};
