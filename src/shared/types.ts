export type UserProfileType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  birth_date: string;
  profile_picture_url: string;
  last_visit: string;
  date_joined: string;
  settings: UserProfileSettingsType;
  notifications: UserNotificationType[];
  saved_items: number[];
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
  error?: string;
  data?: unknown;
};
