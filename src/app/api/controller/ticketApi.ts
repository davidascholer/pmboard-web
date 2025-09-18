import { createApiCall } from "../lib/util";

// TICKET API CALLS
export const ticketApi = {
  // Get all tickets for project
  getAllByProject: createApiCall("/tickets/:project_id", "GET"),

  // Get specific ticket
  getById: createApiCall("/tickets/:project_id/:ticket_id", "GET"),

  // Create new ticket
  create: createApiCall("/tickets/:project_id", "POST"),

  // Update ticket
  update: createApiCall("/tickets/:project_id/:ticket_id", "PATCH"),

  // Delete ticket
  delete: createApiCall("/tickets/:project_id/:ticket_id", "DELETE"),

  // Add assignee to ticket
  addAssignee: createApiCall(
    "/tickets/add-assignee/:project_id/:ticket_id",
    "PATCH"
  ),

  // Remove assignee from ticket
  removeAssignee: createApiCall(
    "/tickets/remove-assignee/:project_id/:ticket_id",
    "PATCH"
  ),

  // Update ticket description
  updateDescription: createApiCall(
    "/tickets/update-description/:project_id/:ticket_id",
    "PATCH"
  ),

  // Update ticket status
  updateStatus: createApiCall(
    "/tickets/update-status/:project_id/:ticket_id",
    "PATCH"
  ),

  // Update ticket priority
  updatePriority: createApiCall(
    "/tickets/update-priority/:project_id/:ticket_id",
    "PATCH"
  ),

  // Update ticket section
  updateSection: createApiCall(
    "/tickets/update-section/:project_id/:ticket_id",
    "PATCH"
  ),

  // Update ticket title
  updateTitle: createApiCall(
    "/tickets/update-title/:project_id/:ticket_id",
    "PATCH"
  ),

  // Get ticket timelogs
  getByTicket: createApiCall("/tickets/timelog/:project_id/:ticket_id", "GET"),

  // Create timelog entry
  createTicketTimelog: createApiCall(
    "/tickets/timelog/:project_id/:ticket_id",
    "POST"
  ),

  // Update timelog entry
  updateTicketTimelog: createApiCall(
    "/tickets/timelog/:project_id/:ticket_id/:timelog_id",
    "PATCH"
  ),

  // Delete timelog entry
  deleteTicketTimelog: createApiCall(
    "/tickets/timelog/:project_id/:ticket_id/:timelog_id",
    "DELETE"
  ),
};

// Example usage:
/*
// Create a new ticket
const newTicket = await ticketApi.create(
  { title: 'New Feature', description: 'Add new feature' },
  { project_id: '123' }
);

// Update ticket status
await ticketApi.updateStatus(
  { status: 'in-progress' },
  { project_id: '123', ticket_id: '456' }
);
*/
