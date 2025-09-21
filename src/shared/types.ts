import { UserMembership, UserProject, UserProjectMembership } from "@/app/api/types/api-responses";

export type UserProfileType = {
  // id: string;
  name: string;
  email: string;
  settings: Record<string, unknown> | null;
  createdAt: string;
  // updatedAt: string;
  // isActive: boolean;
  membership: UserMembership;
  // nextMembership: UserNextMembership | null;
  projectsOwned: UserProject[];
  projectsJoined: UserProjectMembership[];
};

export type UserAccountVerifyType = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
};

export type UserNotificationType = {
  is_read: boolean;
  message: string;
  creation_date: string;
};

export type UserSettingsType = {
  mode: "light" | "dark";
};

export type GenericObjectType = { [key: string]: string | number | boolean };

// Response types
export type AppResponseType = {
  ok: boolean;
  status: number;
};

export type ErrorResponseType = AppResponseType & {
  error: string;
};

export type UserProfileSettingsType = {
  theme: "light" | "dark";
};

export type ApiResponseType = {
  ok: boolean;
  status: number;
  message: string;
  data?: unknown;
};

export type ThemeProviderStateType = {
  theme: ColorThemeType;
  changeTheme: () => void;
};
export type ColorThemeType = "light" | "dark" | "system";
export const PM_BOARD_COLOR_THEME_KEY = "pm-board-color-theme";
