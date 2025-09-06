/**
 * API Request Types for PM Board Backend
 * 
 * This file contains TypeScript interfaces for all API request bodies,
 * parameters, and query strings used across all routes in the PM Board application.
 */

// =============================================================================
// COMMON TYPES
// =============================================================================

export interface ApiParams {
  [key: string]: string;
}

export interface ApiQuery {
  [key: string]: string | string[] | undefined;
}

// =============================================================================
// USER ROUTES (/pmboard/api/v1/users)
// =============================================================================

// POST /signin
export interface UserSignInRequest {
  email: string;
  password: string;
}

// POST /signup  
export interface UserSignUpRequest {
  email: string;
  password: string;
  name: string;
}

// PATCH /update-password/:token
export interface UpdateUserPasswordRequest {
  email: string;
  newPassword: string;
}

export interface UpdateUserPasswordParams {
  token: string;
}

// PATCH /update-settings
export interface UpdateUserSettingsRequest {
  settings: {
    background?: string;
    theme?: string;
    [key: string]: unknown;
  };
}

// PATCH /activate/:token
export interface UserActivateParams {
  token: string;
}

// PATCH /deactivate/:token  
export interface UserDeactivateParams {
  token: string;
}

// PATCH /update-membership
export interface UpdateMembershipRequest {
  membershipStatus: 'FREE' | 'STARTUP' | 'TEAM' | 'ENTERPRISE';
  expiry: 'MONTH' | 'YEAR';
}

// PATCH /update-next-membership
export interface UpdateNextMembershipRequest {
  membershipStatus: 'FREE' | 'STARTUP' | 'TEAM' | 'ENTERPRISE';
  startsAt: string; // ISO date string
  expiry: 'MONTH' | 'YEAR';
}

// POST /delete/:token
export interface UserDeleteRequest {
  token: string;
}

export interface UserDeleteParams {
  token: string;
}

// =============================================================================
// AUTH ROUTES (/pmboard/api/v1/auth)
// =============================================================================

// GET /refresh - No request body or params needed

// =============================================================================
// MFA ROUTES (/pmboard/api/v1/mfa)
// =============================================================================

// POST /email-token - No request body needed (uses authenticated user)

// POST /get-token - No request body needed (uses authenticated user)

// =============================================================================
// PROJECT ROUTES (/pmboard/api/v1/projects)
// =============================================================================

// GET /:id
export interface GetProjectParams {
  id: string;
}

// POST /
export interface CreateProjectRequest {
  name: string;
  projectType?: 'WATERFALL' | 'KANBAN' | 'SCRUM';
  description?: string;
}

// DELETE /:id
export interface DeleteProjectParams {
  id: string;
}

// PATCH /update-description/:id
export interface UpdateProjectDescriptionRequest {
  description: string;
}

export interface UpdateProjectDescriptionParams {
  id: string;
}

// PATCH /update-status/:id
export interface UpdateProjectStatusRequest {
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface UpdateProjectStatusParams {
  id: string;
}

// PATCH /add-feature/:id
export interface AddFeatureToProjectRequest {
  title: string;
  description?: string;
}

export interface AddFeatureToProjectParams {
  id: string;
}

// PATCH /remove-feature/:id/:featureId
export interface RemoveFeatureFromProjectParams {
  id: string;
  featureId: string;
}

// =============================================================================
// FEATURE ROUTES (/pmboard/api/v1/features)
// =============================================================================

// POST /:project_id
export interface CreateFeatureRequest {
  title: string;
  description?: string;
}

export interface CreateFeatureParams {
  project_id: string;
}

// DELETE /:project_id/:id
export interface DeleteFeatureParams {
  project_id: string;
  id: string;
}

// =============================================================================
// PROJECT MEMBER ROUTES (/pmboard/api/v1/project-members)
// =============================================================================

// GET /:project_id
export interface GetProjectMembersParams {
  project_id: string;
}

// POST /:project_id
export interface AddProjectMemberRequest {
  userId: string;
  role: 'ADMIN' | 'MEMBER';
}

export interface AddProjectMemberParams {
  project_id: string;
}

// DELETE /:project_id/:member_id
export interface RemoveProjectMemberParams {
  project_id: string;
  member_id: string;
}

// POST /update-status/:project_id/:member_id
export interface UpdateProjectMemberStatusRequest {
  memberStatus: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}

export interface UpdateProjectMemberStatusParams {
  project_id: string;
  member_id: string;
}

// POST /update-role/:project_id/:member_id
export interface UpdateProjectMemberRoleRequest {
  role: 'ADMIN' | 'MEMBER';
}

export interface UpdateProjectMemberRoleParams {
  project_id: string;
  member_id: string;
}

// =============================================================================
// TICKET ROUTES (/pmboard/api/v1/tickets)
// =============================================================================

// GET /:project_id
export interface GetTicketsParams {
  project_id: string;
}

// GET /:project_id/:ticket_id
export interface GetTicketParams {
  project_id: string;
  ticket_id: string;
}

// POST /:project_id
export interface CreateTicketRequest {
  title: string;
  description?: string;
  featureId: number;
  priority?: 'NONE' | 'LOW' | 'MODERATE' | 'HIGH' | 'URGENT';
  status?: 'UNASSIGNED' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED';
  section?: 'ACTIVE' | 'ARCHIVED' | 'BACKLOG';
}

export interface CreateTicketParams {
  project_id: string;
}

// PATCH /:project_id/:ticket_id
export interface UpdateTicketRequest {
  title?: string;
  description?: string;
  priority?: 'NONE' | 'LOW' | 'MODERATE' | 'HIGH' | 'URGENT';
  status?: 'UNASSIGNED' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED';
  section?: 'ACTIVE' | 'ARCHIVED' | 'BACKLOG';
  timeLog?: number; // Time in minutes
}

export interface UpdateTicketParams {
  project_id: string;
  ticket_id: string;
}

// DELETE /:project_id/:ticket_id
export interface DeleteTicketParams {
  project_id: string;
  ticket_id: string;
}

// PATCH /add-assignee/:project_id/:ticket_id
export interface AddTicketAssigneeRequest {
  userId: string;
}

export interface AddTicketAssigneeParams {
  project_id: string;
  ticket_id: string;
}

// PATCH /remove-assignee/:project_id/:ticket_id
export interface RemoveTicketAssigneeRequest {
  userId: string;
}

export interface RemoveTicketAssigneeParams {
  project_id: string;
  ticket_id: string;
}

// GET /timelog/:project_id/:ticket_id
export interface GetTimelogParams {
  project_id: string;
  ticket_id: string;
}

// POST /timelog/:project_id/:ticket_id
export interface CreateTimelogRequest {
  minutes: number;
  description?: string;
  date?: string; // ISO date string
}

export interface CreateTimelogParams {
  project_id: string;
  ticket_id: string;
}

// PATCH /timelog/:project_id/:ticket_id/:timelog_id
export interface UpdateTimelogRequest {
  minutes?: number;
  description?: string;
  date?: string; // ISO date string
}

export interface UpdateTimelogParams {
  project_id: string;
  ticket_id: string;
  timelog_id: string;
}

// DELETE /timelog/:project_id/:ticket_id/:timelog_id
export interface DeleteTimelogParams {
  project_id: string;
  ticket_id: string;
  timelog_id: string;
}

// PATCH /update-description/:project_id/:ticket_id
export interface UpdateTicketDescriptionRequest {
  description: string;
}

export interface UpdateTicketDescriptionParams {
  project_id: string;
  ticket_id: string;
}

// PATCH /update-status/:project_id/:ticket_id
export interface UpdateTicketStatusRequest {
  status: 'UNASSIGNED' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED';
}

export interface UpdateTicketStatusParams {
  project_id: string;
  ticket_id: string;
}

// PATCH /update-priority/:project_id/:ticket_id
export interface UpdateTicketPriorityRequest {
  priority: 'NONE' | 'LOW' | 'MODERATE' | 'HIGH' | 'URGENT';
}

export interface UpdateTicketPriorityParams {
  project_id: string;
  ticket_id: string;
}

// PATCH /update-section/:project_id/:ticket_id
export interface UpdateTicketSectionRequest {
  section: 'ACTIVE' | 'ARCHIVED' | 'BACKLOG';
}

export interface UpdateTicketSectionParams {
  project_id: string;
  ticket_id: string;
}

// PATCH /update-title/:project_id/:ticket_id
export interface UpdateTicketTitleRequest {
  title: string;
}

export interface UpdateTicketTitleParams {
  project_id: string;
  ticket_id: string;
}

// =============================================================================
// TEST ROUTES (/pmboard/api/v1/test)
// =============================================================================

// GET / - No request body or params needed

// POST /
export interface CreateTestRequest {
  name: string;
}

// =============================================================================
// COMBINED TYPES FOR UTILITY
// =============================================================================

// Union type of all request bodies
export type ApiRequestBody = 
  | UserSignInRequest
  | UserSignUpRequest
  | UpdateUserPasswordRequest
  | UpdateUserSettingsRequest
  | UpdateMembershipRequest
  | UpdateNextMembershipRequest
  | UserDeleteRequest
  | CreateProjectRequest
  | UpdateProjectDescriptionRequest
  | UpdateProjectStatusRequest
  | AddFeatureToProjectRequest
  | CreateFeatureRequest
  | AddProjectMemberRequest
  | UpdateProjectMemberStatusRequest
  | UpdateProjectMemberRoleRequest
  | CreateTicketRequest
  | UpdateTicketRequest
  | AddTicketAssigneeRequest
  | RemoveTicketAssigneeRequest
  | CreateTimelogRequest
  | UpdateTimelogRequest
  | UpdateTicketDescriptionRequest
  | UpdateTicketStatusRequest
  | UpdateTicketPriorityRequest
  | UpdateTicketSectionRequest
  | UpdateTicketTitleRequest
  | CreateTestRequest;

// Union type of all route parameters
export type ApiRouteParams = 
  | UpdateUserPasswordParams
  | UserActivateParams
  | UserDeactivateParams
  | UserDeleteParams
  | GetProjectParams
  | DeleteProjectParams
  | UpdateProjectDescriptionParams
  | UpdateProjectStatusParams
  | AddFeatureToProjectParams
  | RemoveFeatureFromProjectParams
  | CreateFeatureParams
  | DeleteFeatureParams
  | GetProjectMembersParams
  | AddProjectMemberParams
  | RemoveProjectMemberParams
  | UpdateProjectMemberStatusParams
  | UpdateProjectMemberRoleParams
  | GetTicketsParams
  | GetTicketParams
  | CreateTicketParams
  | UpdateTicketParams
  | DeleteTicketParams
  | AddTicketAssigneeParams
  | RemoveTicketAssigneeParams
  | GetTimelogParams
  | CreateTimelogParams
  | UpdateTimelogParams
  | DeleteTimelogParams
  | UpdateTicketDescriptionParams
  | UpdateTicketStatusParams
  | UpdateTicketPriorityParams
  | UpdateTicketSectionParams
  | UpdateTicketTitleParams;

// =============================================================================
// ENUM TYPES FROM PRISMA SCHEMA
// =============================================================================

export enum MembershipStatus {
  FREE = 'FREE',
  STARTUP = 'STARTUP',
  TEAM = 'TEAM',
  ENTERPRISE = 'ENTERPRISE'
}

export enum Section {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  BACKLOG = 'BACKLOG'
}

export enum Status {
  UNASSIGNED = 'UNASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  COMPLETED = 'COMPLETED'
}

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED'
}

export enum ProjectType {
  WATERFALL = 'WATERFALL',
  KANBAN = 'KANBAN',
  SCRUM = 'SCRUM'
}

export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export enum Priority {
  NONE = 'NONE',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}
