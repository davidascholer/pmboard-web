/**
 * API Response Types for PM Board Backend
 * 
 * This file contains TypeScript interfaces for all API response bodies
 * returned by the PM Board application endpoints.
 */

// =============================================================================
// COMMON RESPONSE TYPES
// =============================================================================

export interface ApiError {
  message: string;
  error?: string;
}

export interface ApiSuccess {
  message: string;
}

// =============================================================================
// PRISMA MODEL TYPES (Based on Return Signatures)
// =============================================================================

export interface UserMembership {
  status: 'FREE' | 'STARTUP' | 'TEAM' | 'ENTERPRISE';
  startedAt: string;
  endsAt: string;
}

export interface UserNextMembership {
  status: 'FREE' | 'STARTUP' | 'TEAM' | 'ENTERPRISE';
  startsAt: string;
  endsAt: string;
}

export interface ProjectOwner {
  id: string;
  name: string;
  email: string;
}

export interface ProjectMemberUser {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface ProjectMember {
  id: string;
  userId: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  memberStatus: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  User: ProjectMemberUser;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface ProjectDetails {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  projectType: 'WATERFALL' | 'KANBAN' | 'SCRUM';
  ownerId: string;
  status: 'ACTIVE' | 'ARCHIVED';
  owner: ProjectOwner;
  members: ProjectMember[];
  features: Feature[];
}

export interface UserProject {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  projectType: 'WATERFALL' | 'KANBAN' | 'SCRUM';
  ownerId: string;
  status: 'ACTIVE' | 'ARCHIVED';
  members: ProjectMember[];
  features: Feature[];
}

export interface UserProjectMembership {
  id: string;
  userId: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
  memberStatus: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  project: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    projectType: 'WATERFALL' | 'KANBAN' | 'SCRUM';
    ownerId: string;
  };
}

export interface UserDetails {
  id: string;
  name: string;
  email: string;
  settings: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  membership: UserMembership;
  nextMembership: UserNextMembership | null;
  projectsOwned: UserProject[];
  projectsJoined: UserProjectMembership[];
}

export interface TicketAssigneeUser {
  id: string;
  name: string;
  email: string;
}

export interface TicketAssignee {
  id: string;
  User: TicketAssigneeUser;
}

export interface TicketDetails {
  id: string;
  title: string;
  description: string;
  priority: 'NONE' | 'LOW' | 'MODERATE' | 'HIGH' | 'URGENT';
  status: 'UNASSIGNED' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED';
  section: 'ACTIVE' | 'ARCHIVED' | 'BACKLOG';
  createdAt: string;
  updatedAt: string;
  feature: Feature;
  assignees: TicketAssignee[];
}

export interface TestEntry {
  id: string;
  name: string;
  createdAt: string;
}
