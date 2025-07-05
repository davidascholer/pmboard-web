import { toast } from "sonner";

/**
  Message, the 2nd param, is returning undefined. I cannot for the life of me figure out why.
*/
// const useAppToast = () => {
//   return function (type: "success" | "error" | "none", message: string) {
//     switch (type) {
//       case "success":
//         // Handle success case
//         toast("Success", {
//           description: message,
//         });
//         break;
//       case "error":
//         // Handle error case
//         toast("Error", {
//           description: message,
//         });
//         break;
//       case "none":
//         // Handle success case
//         toast("", {
//           description: message,
//         });
//         break;
//       default:
//         // Handle default case if needed
//         // This should not happen, but just in case
//         console.warn("Unknown toast type:", type);
//         return; // Exit the function if the type is unknown
//     }
//   };
// };

const useAppToast = () => {
  return function (message: string) {
    // Extract the first word from the message and update the message
    const type = message.split(" ")[0] as "success" | "error" | "none";
    message = message.replace(type, "").trim();
    // Check if the type is valid
    if (!["success", "error", "none"].includes(type)) {
      console.warn("Unknown toast type:", type);
      return; // Exit the function if the type is unknown
    }
    
    // Handle the toast based on the type
    switch (type) {
      case "success":
        // Handle success case
        toast("Success", {
          description: message,
        });
        break;
      case "error":
        // Handle error case
        toast("Error", {
          description: message,
        });
        break;
      case "none":
        // Handle success case
        toast("", {
          description: message,
        });
        break;
      default:
        // Handle default case if needed
        // This should not happen, but just in case
        console.warn("Unknown toast type:", type);
        return; // Exit the function if the type is unknown
    }
  };
};

export default useAppToast;
