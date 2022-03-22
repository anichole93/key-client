import React, { useState, useEffect } from "react"
import { getProjects, getProjectsByUser, getPublishedProjects } from "./ProjectManager"
import { getCurrentUser } from "../users/UserManager"
import Project from "./ProjectDetails"
import { ProjectFilters } from "./ProjectFilters"

export const AllProjects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getPublishedProjects().then(p => setProjects(p))
    }, [])

    return (
        <>
        <ProjectFilters setProjects={setProjects} />
        <h1>Browse Published Projects</h1>
        {projects.map((project) => {
            return (
                    <div>{project.title}</div>
                )
            }
        )}
        </>
    )
}