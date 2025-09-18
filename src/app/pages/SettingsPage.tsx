// import { Label } from "@/ui/components/label";
// import { Switch } from "@/ui/components/switch";
// import { SignInMessage } from "../components/SignInMessage";
// import PageContainer from "../components/PageContainer";
// import { Separator } from "@/ui/components/separator";
// import { ErrorResponseType, UserProfileType } from "@/shared/types";
// import { verifyUserSession } from "../api/lib/util";
// import { replaceUserSettings } from "@/state/services/userSlice";
// import { setUserSettings } from "../api/lib/userApi";
// import { AppToolbar } from "../components/app-toolbar/AppToolbar";

// const SettingsPageRow = ({
//   children,
//   label,
// }: {
//   label: React.ReactNode;
//   children: React.ReactNode;
// }) => {
//   return (
//     <>
//       <div className="flex justify-between items-center px-4 my-6">
//         <Label className="text-lg">{label}</Label>
//         {children}
//       </div>
//       <Separator className="m-2" />
//     </>
//   );
// };

// export default function SettingsPage() {

//   const handleUpdateTheme = async (
//     themeMode: UserProfileType["settings"]["theme"]
//   ) => {
//     if (!user) return;

//     const authTokenResponse = await verifyUserSession();
//     if (!authTokenResponse.ok) {
//       console.error("User must be logged in to add edit settings");
//     }

//     const authToken = (authTokenResponse as { authToken: string }).authToken;
//     if (!authToken) {
//       console.error("No auth token found");
//       return;
//     }
//     const response = await setUserSettings({
//       authToken,
//       theme: themeMode,
//     });

//     if (!response.ok) {
//       console.error((response as ErrorResponseType).error);
//       return;
//     }

//     const data = response.data as UserProfileType;
//     const newSettings = data.settings;
//     dispatch(replaceUserSettings(newSettings));
//   };

//   return (
//     <PageContainer toolbar={<AppToolbar back/>}>
//       {user.signedIn ? (
//         <div className="w-full py-4 px-8">
//           {
//             <SettingsPageRow
//               label={
//                 (!user?.settings?.theme ? "System" : user.settings.theme === "dark" ? "Dark" : "Light") + " Theme"
//               }
//             >
//               <Switch
//                 id="settings-theme"
//                 className="cursor-pointer"
//                 checked={user.settings.theme === "dark"}
//                 onCheckedChange={() =>
//                   handleUpdateTheme(
//                     user.settings.theme === "light" ? "dark" : "light"
//                   )
//                 }
//                 aria-readonly
//               />
//             </SettingsPageRow>
//           }
//         </div>
//       ) : (
//         <SignInMessage />
//       )}
//     </PageContainer>
//   );
// }
