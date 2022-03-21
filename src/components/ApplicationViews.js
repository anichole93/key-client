import React from "react"
import { Route } from "react-router-dom"
import { AllProjects } from "./projects/AllProjects"
import { ProjectDetails } from "./projects/ProjectDetails"
import { ProjectDashboard } from "./projects/ProjectDashboard"
import { ProjectForm } from "./projects/ProjectForm"
import { Welcome } from "./Welcome"
import { InterviewForm } from "./interviews/InterviewForm"
import { PlannedInterview } from "./interviews/PlannedInterview"
import { UserProfile } from "./users/UserProfile"
import { InstitutionDetails } from "./institutions/InstitutionDetails"

export const ApplicationViews = () => {
  return (
    <>
    <Route exact path="/">
        <Welcome />
    </Route>
    <Route exact path="/projects">
        <ProjectDashboard />    
    </Route>
    <Route path="/browse">
        <AllProjects />
    </Route>
    <Route path="/projects/new">
        <ProjectForm />
    </Route>
    <Route path="/projects/:projectId(\d+)">
        <ProjectDetails />
    </Route>
    <Route path="/projects/new_interview/:projectId(\d+)">
        <InterviewForm />
    </Route>
    <Route path="/interview/:interviewId(\d+)">
        <PlannedInterview />
    </Route>
    <Route path="/profile/:userId(\d+)">
        <UserProfile />
    </Route>
    <Route path="/institutions/:institutionId(\d+)">
        <InstitutionDetails />
    </Route>
    </>
  )
}