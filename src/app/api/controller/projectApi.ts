import { createApiCall } from "../lib/util";

// PROJECT API CALLS
export const projectApi = {
  // Get project by ID
  getById: createApiCall("/projects/:id", "GET"),

  // Create new project
  create: createApiCall("/projects", "POST"),

  // Delete project
  delete: createApiCall("/projects/:id", "DELETE"),

  // Update project description
  updateDescription: createApiCall("/projects/update-description/:id", "PATCH"),

  // Update project status
  updateStatus: createApiCall("/projects/update-status/:id", "PATCH"),

  // Add feature to project
  addFeature: createApiCall("/projects/add-feature/:id", "PATCH"),

  // Remove feature from project
  removeFeature: createApiCall(
    "/projects/remove-feature/:id/:featureId",
    "PATCH"
  ),
};

// Example usage:
/*
// Get a project by ID
const project = await projectApi.getById(undefined, { id: '123' });
*/
