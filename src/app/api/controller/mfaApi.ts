import { createApiCall } from "../lib/util";

// MFA API CALLS
export const mfaApi = {
  // Send MFA token via email
  sendEmailToken: createApiCall('/mfa/email-token', 'POST'),
  
  // Get MFA token
  getToken: createApiCall('/mfa/get-token', 'POST'),
};
