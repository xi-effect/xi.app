import { create } from "zustand";
import { UserProfile, useUserProfileSt } from "./userProfile";
import { UserSettings, useUserSettingsSt } from "./userSettings";

export const useMainSt = create<UserProfile & UserSettings>()((...a) => ({
  ...useUserProfileSt(...a),
  ...useUserSettingsSt(...a),
}));
