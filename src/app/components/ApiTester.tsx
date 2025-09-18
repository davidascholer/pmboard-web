/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import userApi from "../api/controller/userApi";
import { mfaApi } from "../api/controller/mfaApi";
import { projectApi } from "../api/controller/projectApi";
import { featureApi } from "../api/controller/featureApi";
import { projectMemberApi } from "../api/controller/projectMemberApi";
import { ticketApi } from "../api/controller/ticketApi";
import { signIn, signOut } from "../lib/util";
import { STORAGE_KEYS } from "../lib/constants";

const UPDATED_TOKEN = "951450";

// Types
type TestResult = {
  success: boolean;
  data?: unknown;
  error?: string;
  timestamp: string;
};

const testEndpoint = async <
  T extends (data?: any, params?: any) => Promise<any>
>(
  label: string,
  fn: T,
  data?: Parameters<T>[0],
  params?: Parameters<T>[1]
): Promise<TestResult> => {
  const timestamp = new Date().toLocaleString();
  console.log(`Testing ${label}...`);

  try {
    const result = await fn(data, params);
    console.log(`Success: ${label}`, result);
    return { success: true, data: result, timestamp };
  } catch (error: unknown) {
    console.error(`Error: ${label}`, error);
    return {
      success: false,
      error: (error as Error)?.message || String(error),
      timestamp,
    };
  }
};

// Test data templates
const testData = {
  signIn: { email: "testuser1@test.com", password: "testpassword" },
  signUp: {
    email: "testuser1@test.com",
    password: "testpassword",
    name: "Test User",
  },
  project: { name: "Test Project", description: "A test project" },
  ticket: {
    title: "Test Ticket",
    description: "A test ticket",
    priority: "medium",
  },
  feature: { name: "Test Feature", description: "A test feature" },
  member: { email: "member@example.com", role: "developer" },
  timelog: {
    hours: 2,
    description: "Test work",
    date: new Date().toISOString(),
  },
  settings: { theme: "dark", notifications: true },
};

// Default params for endpoints that need them
const defaultParams = {
  id: "1",
  token: "test-token",
  project_id: "1",
  ticket_id: "1",
  featureId: "1",
  member_id: "1",
  timelog_id: "1",
};

const ApiTester: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  useEffect(() => {
    console.log("Access Token:", accessToken);
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  const TestButton: React.FC<{
    label: string;
    onClick: () => void;
    requiresAuth?: boolean;
  }> = ({ label, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={
          "px-4 py-2 m-1 rounded text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white"
        }
      >
        {label}
      </button>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">API Endpoint Tester</h1>

        <div className="flex items-center gap-4 mb-4">
          <div
            className={`px-3 py-1 rounded ${
              isAuthenticated
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isAuthenticated ? "Signed In" : "Not Signed In"}
          </div>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Authentication</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <TestButton
              label="signIn"
              onClick={() => {
                signIn(testData.signIn);
                setIsAuthenticated(true);
              }}
            />
          </div>

          <div>
            <TestButton
              label="signUp"
              onClick={() => userApi.signUp(testData.signUp)}
            />
          </div>

          <div>
            <TestButton
              label="activate account"
              onClick={() => userApi.activateAccount({ token: UPDATED_TOKEN })}
            />
          </div>
          <div>
            <TestButton
              label="deactivate account"
              onClick={() =>
                userApi.deactivateAccount({ token: UPDATED_TOKEN })
              }
            />
          </div>
          <div>
            <TestButton
              label="sign out"
              onClick={() => {
                signOut();
                setIsAuthenticated(false);
              }}
            />
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">User Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { key: "getAuth", fn: userApi.getAuth, label: "Get Auth User" },
            {
              key: "updateSettings",
              fn: userApi.updateSettings,
              label: "Update Settings",
              data: testData.settings,
            },
            {
              key: "verifyMembership",
              fn: userApi.verifyMembership,
              label: "Verify Membership",
            },
            {
              key: "updatePassword",
              fn: userApi.updatePassword,
              label: "Update Password",
              params: defaultParams,
            },
          ].map(({ key, fn, label, data, params }) => (
            <div key={key}>
              <TestButton
                label={label}
                onClick={() => testEndpoint(key, fn, data, params)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* MFA Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          Multi-Factor Authentication
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: "sendEmailToken",
              fn: mfaApi.sendEmailToken,
              label: "Send Email Token",
            },
            { key: "getToken", fn: mfaApi.getToken, label: "Get MFA Token" },
          ].map(({ key, fn, label }) => (
            <div key={key}>
              <TestButton label={label} onClick={() => testEndpoint(key, fn)} />
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              key: "createProject",
              fn: projectApi.create,
              label: "Create Project",
              data: testData.project,
            },
            {
              key: "getProject",
              fn: projectApi.getById,
              label: "Get Project",
              params: defaultParams,
            },
            {
              key: "updateProjectDescription",
              fn: projectApi.updateDescription,
              label: "Update Description",
              data: { description: "Updated description" },
              params: defaultParams,
            },
            {
              key: "updateProjectStatus",
              fn: projectApi.updateStatus,
              label: "Update Status",
              data: { status: "active" },
              params: defaultParams,
            },
            {
              key: "addFeatureToProject",
              fn: projectApi.addFeature,
              label: "Add Feature",
              data: testData.feature,
              params: defaultParams,
            },
            {
              key: "deleteProject",
              fn: projectApi.delete,
              label: "Delete Project",
              params: defaultParams,
            },
          ].map(({ key, fn, label, data, params }) => (
            <div key={key}>
              <TestButton
                label={label}
                onClick={() => testEndpoint(key, fn, data, params)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              key: "createFeature",
              fn: featureApi.create,
              label: "Create Feature",
              data: testData.feature,
              params: defaultParams,
            },
            {
              key: "deleteFeature",
              fn: featureApi.delete,
              label: "Delete Feature",
              params: defaultParams,
            },
          ].map(({ key, fn, label, data, params }) => (
            <div key={key}>
              <TestButton
                label={label}
                onClick={() => testEndpoint(key, fn, data, params)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Project Members Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Project Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              key: "getMembers",
              fn: projectMemberApi.getMembers,
              label: "Get Members",
              params: defaultParams,
            },
            {
              key: "addMember",
              fn: projectMemberApi.addMember,
              label: "Add Member",
              data: testData.member,
              params: defaultParams,
            },
            {
              key: "updateMemberStatus",
              fn: projectMemberApi.updateStatus,
              label: "Update Member Status",
              data: { status: "active" },
              params: defaultParams,
            },
            {
              key: "updateMemberRole",
              fn: projectMemberApi.updateRole,
              label: "Update Member Role",
              data: { role: "admin" },
              params: defaultParams,
            },
            {
              key: "removeMember",
              fn: projectMemberApi.removeMember,
              label: "Remove Member",
              params: defaultParams,
            },
          ].map(({ key, fn, label, data, params }) => (
            <div key={key}>
              <TestButton
                label={label}
                onClick={() => testEndpoint(key, fn, data, params)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tickets Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              key: "getAllTickets",
              fn: ticketApi.getAllByProject,
              label: "Get All Tickets",
              params: defaultParams,
            },
            {
              key: "getTicket",
              fn: ticketApi.getById,
              label: "Get Ticket",
              params: defaultParams,
            },
            {
              key: "createTicket",
              fn: ticketApi.create,
              label: "Create Ticket",
              data: testData.ticket,
              params: defaultParams,
            },
            {
              key: "updateTicket",
              fn: ticketApi.update,
              label: "Update Ticket",
              data: { title: "Updated Ticket" },
              params: defaultParams,
            },
            {
              key: "updateTicketStatus",
              fn: ticketApi.updateStatus,
              label: "Update Status",
              data: { status: "in-progress" },
              params: defaultParams,
            },
            {
              key: "updateTicketPriority",
              fn: ticketApi.updatePriority,
              label: "Update Priority",
              data: { priority: "high" },
              params: defaultParams,
            },
            {
              key: "addAssignee",
              fn: ticketApi.addAssignee,
              label: "Add Assignee",
              data: { assigneeId: "1" },
              params: defaultParams,
            },
            {
              key: "removeAssignee",
              fn: ticketApi.removeAssignee,
              label: "Remove Assignee",
              data: { assigneeId: "1" },
              params: defaultParams,
            },
            {
              key: "deleteTicket",
              fn: ticketApi.delete,
              label: "Delete Ticket",
              params: defaultParams,
            },
          ].map(({ key, fn, label, data, params }) => (
            <div key={key}>
              <TestButton
                label={label}
                onClick={() => testEndpoint(key, fn, data, params)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Timelogs Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Time Logs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              key: "getTimelogs",
              fn: ticketApi.getByTicket,
              label: "Get Timelogs",
              params: defaultParams,
            },
            {
              key: "createTimelog",
              fn: ticketApi.createTicketTimelog,
              label: "Create Timelog",
              data: testData.timelog,
              params: defaultParams,
            },
            {
              key: "updateTimelog",
              fn: ticketApi.updateTicketTimelog,
              label: "Update Timelog",
              data: { hours: 3 },
              params: defaultParams,
            },
            {
              key: "deleteTimelog",
              fn: ticketApi.deleteTicketTimelog,
              label: "Delete Timelog",
              params: defaultParams,
            },
          ].map(({ key, fn, label, data, params }) => (
            <div key={key}>
              <TestButton
                label={label}
                onClick={() => testEndpoint(key, fn, data, params)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
