import { createApiCall } from "../lib/util";

// FEATURE API CALLS
export const featureApi = {
  // Create feature
  create: createApiCall('/features/:project_id', 'POST'),
  
  // Delete feature
  delete: createApiCall('/features/:project_id/:id', 'DELETE'),
};
