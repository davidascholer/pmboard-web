// import { SignInMessage } from "../components/SignInMessage";
// // import { getFarmsByIds } from "@/shared/api";
// import { Separator } from "@/ui/components/separator";
// import {
//   formatUTCDateToLocal,
//   // filterNotificationsFromFarms,
// } from "@/shared/utils";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/ui/components/accordion";
// import PageContainer from "../components/PageContainer";
// import { Button } from "@/ui/components/button";
// import { ApiResponseType, UserProfileType } from "@/shared/types";
// import { cn } from "@/ui/lib/utils";
// import { setUserNotifications } from "@/state/services/userSlice";
// import { AppToolbar } from "../components/app-toolbar/AppToolbar";
// // import { set } from "date-fns";

// export default function NotificationsPage() {

//   const handleDeleteNotification = async (creation_date: string) => {
//     const authTokenResponse = await verifyUserSession();
//     if (!authTokenResponse.ok) {
//       console.error("User must be logged in to add edit settings");
//     }

//     const authToken = (authTokenResponse as { authToken: string }).authToken;
//     if (!authToken) {
//       console.error("No auth token found");
//       return;
//     }

//     const response = await removeUserProfileNotification({
//       authToken: authToken,
//       creation_date,
//     });

//     const data = response.data as {
//       notifications: UserProfileType["notifications"];
//     };
//     const updatedNotifications = data.notifications;
//     dispatch(setUserNotifications(updatedNotifications));
//   };

//   const handleNotificationIsRead = async (creation_date: string) => {
//     const authTokenResponse = await verifyUserSession();
//     if (!authTokenResponse.ok) {
//       console.error("User must be logged in to add edit settings");
//     }

//     const authToken = (authTokenResponse as { authToken: string }).authToken;
//     if (!authToken) {
//       console.error("No auth token found");
//       return;
//     }
//     const response: ApiResponseType = await setUserProfileNotificationToRead({
//       authToken: authToken,
//       creation_date,
//     });
//     const data = response.data as {
//       notifications: UserProfileType["notifications"];
//     };
//     const updatedNotifications = data.notifications;
//     dispatch(setUserNotifications(updatedNotifications));
//   };

//   return (
//     <PageContainer className="w-full" toolbar={<AppToolbar back/>}>
//       {user.signedIn ? (
//         <div id="notifications" className="w-full text-start">
//           <h1 className="text-2xl w-full text-center mb-8">Notifications</h1>

//           {user.notifications.length === 0 ? (
//             <h1 className="h1-4">You have no notifications</h1>
//           ) : (
//             <>
//               {user.notifications.map((notification, index) => (
//                 <div
//                   key={index}
//                   className={cn(
//                     "w-full flex justify-between items-center",
//                     notification.is_read && "bg-gray-500/10"
//                   )}
//                 >
//                   <Accordion type="single" collapsible>
//                     <AccordionItem value="item-1" className="w-full">
//                       <AccordionTrigger
//                         onClick={() =>
//                           handleNotificationIsRead(notification.creation_date)
//                         }
//                         className="p-4 cursor-pointer"
//                       >
//                         <div className="flex flex-wrap justify-between gap-8 text-xs sm:text-lg w-full">
//                           <span className="mr-16">
//                             {formatUTCDateToLocal(notification.creation_date)}
//                           </span>
//                         </div>
//                       </AccordionTrigger>
//                       <AccordionContent>
//                         <>
//                           <p className="p-4 text-sm">{notification.message}</p>
//                           <Separator />
//                         </>
//                       </AccordionContent>
//                     </AccordionItem>
//                   </Accordion>
//                   <Button
//                     className="bg-red-500 text-sidebar-primary-foreground mx-2 cursor-pointer"
//                     onClick={() =>
//                       handleDeleteNotification(notification.creation_date)
//                     }
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>
//       ) : (
//         <SignInMessage />
//       )}
//     </PageContainer>
//   );
// }
