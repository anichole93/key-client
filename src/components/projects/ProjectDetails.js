import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useHistory } from "react-router-dom"
import { getCompletedInterviewsByProject, getInterviewsByProject, getPlannedInterviewsByProject } from "../interviews/InterviewManager"
import { addConclusions, deleteProject, getSingleProject, publishProject, unPublishProject } from "./ProjectManager"
import { getQuestionsByProject } from "../questions/QuestionManager"

export const ProjectDetails = () => {
    const history = useHistory()
    const { projectId } = useParams()
    const [project, setProject] = useState({})
    const [interviews, setInterviews] = useState([])
    const [completedInterviews, setCompletedInterviews] = useState([])
    const [plannedInterviews, setPlannedInterviews] = useState([])
    const [conclusions, setConclusions] = useState("")
    const [questions, setQuestions] = useState([])


    useEffect(() => {
        getSingleProject(projectId).then(p => setProject(p))
        getInterviewsByProject(projectId).then(i => setInterviews(i))
        getCompletedInterviewsByProject(projectId).then(c => setCompletedInterviews(c))
        getPlannedInterviewsByProject(projectId).then(p => setPlannedInterviews(p))
        getQuestionsByProject(projectId).then(setQuestions)
    }, [projectId])

    
    //add logic for if completed interviews by project >= 1 && complete != null, then display publish button
    const publishButton = () => {
        if (completedInterviews.length >= 1 && project.conclusions != "" && plannedInterviews.length === 0) {
            if (project.public === false) {
            return <button type="submit" onClick={() => {
                publishProject(project.id)
                    .then(getSingleProject(projectId)).then(setProject)
                    .then(history.push(`/projects`))
            }
                } className="button mr-3 mt-3">
                Publish
            </button>
        } else if (project.public === true) {
            return <button type="submit"
                onClick={() => {
                    unPublishProject(project.id)
                    .then(getSingleProject(projectId)).then(setProject)
                    .then(history.push(`/projects`))
                }}
                className="button mr-3 mt-3">
                Unpublish
            </button>
        }
        }
    }



    return (
        <div className="container m-6 p-6 has-background-link-light">
        <section className="box">
        <div className="card is-light">
            <div className="card-header">
                <div className="card-header-title">
                    <div className="title is-2">{project.title}</div>
                </div>
            </div>
            <div className="card-image"> 
                    { project.imgurl != ""
                ?  <img src={project.imgurl}></img>
                : ""
                }
            </div>
            <div className="card-content">
                <div className="title is-4">{project.description}</div>
            </div>
            <div className="card-footer">
                <button className="button mr-3 my-3"><Link to={`/projects/${project.id}/questions`}>Manage Questions</Link></button>
                
                { questions.length > 0
                ? <><button className="button mr-3 my-3"><Link to={`/projects/new_interview/${project.id}`}>Plan an interview</Link></button></>
                : ""
                }
            </div>
            <div className="card-content">
                <div className="title is-4">Planned Interviews</div>
                {
                interviews.map(interview => {
                    if (interview.complete === false) {
                        return <div><Link to={`/interviews/${interview.id}`}>{interview.scheduled_date}</Link></div>
                    }
                })
            }
                <div className="title is-4 my-3">Completed Interviews</div>
                {
                interviews.map(interview => {
                    if (interview.complete === true) {
                        return <div><Link to={`/interviews/${interview.id}/complete`}>{interview.collection_date}</Link></div>
                    }
                })
            }
                { project.conclusions === ""
                ? <form>
                <div className="title is-4">Conclusions</div>
                <label className="label"></label>
                    <input
                        type="textarea"
                        placeholder="conclusions"
                        className="input"
                        required autoFocus
                        onChange={
                            (evt) => {
                                const copy = evt.target.value
                                setConclusions(copy)
                            }
                        } />
                <button className="button" onClick={() => { addConclusions(conclusions, projectId) }}>Save</button>
                </form>
                : <><div className="title is-4 mt-5">Conclusions</div> 
                <div className="title is-5">{project.conclusions}</div></>
                }
            </div>
            <div className="card-footer">
                {publishButton()}
                { project.public === true
                ? ""
                : <button className="button mr-3 my-3"><Link to={`/projects/${projectId}/edit`}>Edit Project</Link></button>
                }
                <button className="button mr-3 my-3" onClick={() => {
                            deleteProject(project.id)
                                .then(setProject)
                                .then(() => {history.push("/projects")})
                        }}>Delete Project</button>
            </div> 
        </div>
        </section>
    </div>
    )
}