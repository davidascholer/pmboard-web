import { ProjectDetails } from "@/app/api/types/api-responses";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProjectDetails = {
  id: "",
  name: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  projectType: "KANBAN",
  ownerId: "",
  status: "ACTIVE",
  owner: {
    id: "",
    name: "",
    email: "",
  },
  members: [],
  features: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectDetails: (state, action) => {
      const project = action.payload.project;
      state.id = project.id;
      state.name = project.name;
      state.description = project.description;
      state.createdAt = project.createdAt;
      state.updatedAt = project.updatedAt;
      state.projectType = project.projectType;
      state.ownerId = project.ownerId;
      state.status = project.status;
      state.owner = project.owner;
      state.members = project.members;
      state.features = project.features;
    },
    clearProjectDetails: (state) => {
      state.id = initialState.id;
      state.name = initialState.name;
      state.description = initialState.description;
      state.createdAt = initialState.createdAt;
      state.updatedAt = initialState.updatedAt;
      state.projectType = initialState.projectType;
      state.ownerId = initialState.ownerId;
      state.status = initialState.status;
      state.owner = initialState.owner;
      state.members = initialState.members;
      state.features = initialState.features;
    },
  },
});

export const {
    setProjectDetails,
    clearProjectDetails
} = projectSlice.actions;

export default projectSlice.reducer;
