import { createApiCall } from "../lib/util";

// PROJECT MEMBER API CALLS
export const projectMemberApi = {
  // Get project members
  getMembers: createApiCall('/project-members/:project_id', 'GET'),
  
  // Add project member
  addMember: createApiCall('/project-members/:project_id', 'POST'),
  
  // Remove project member
  removeMember: createApiCall('/project-members/:project_id/:member_id', 'DELETE'),
  
  // Update member status
  updateStatus: createApiCall('/project-members/update-status/:project_id/:member_id', 'POST'),
  
  // Update member role
  updateRole: createApiCall('/project-members/update-role/:project_id/:member_id', 'POST'),
};
