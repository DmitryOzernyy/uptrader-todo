import { CommentList } from "../../types/commentsTree";
import { ProjectAction, ProjectState, ProjectActionTypes, ProjectType } from "../../types/projects";
import localStorage from "../localStorage";



const initialState: ProjectState = {
    projects: [],
}

const createProjectObject = (name: string, id: number): ProjectType => {
    return {
        name,
        id,
        tasks: []
    }
}

export const projectReducer = (state = initialState, action: ProjectAction): ProjectState => {
    switch (action.type) {
        case ProjectActionTypes.PROJECTS_LOAD:
            let localProjects: ProjectType[] = localStorage.getItem("projects");
            localProjects.map(project => {
                project.tasks.map(task => {
                    const commentsArray = task.comments;
                    task.comments = new CommentList(-1, []);
                    console.log(commentsArray);
                    if((Array.isArray( commentsArray.comments)))
                    for (let i = 0; i < commentsArray.comments.length; i++) {
                        task.comments.add(commentsArray.comments[i].parent,
                            commentsArray.comments[i].author, commentsArray.comments[i].text);
                    }
                    return task;
                })
                return project;
            })
            return { projects: localProjects }
        case ProjectActionTypes.PROJECT_CREATE:
            const project = createProjectObject(action.payload, state.projects.length);
            localProjects = [...state.projects, project];
            localStorage.setItem("projects", localProjects);
            return { projects: localProjects }
        case ProjectActionTypes.PROJECT_DELETE:
            localProjects = state.projects.filter(project => project.id !== action.payload);
            console.log(localProjects);
            localStorage.setItem("projects", localProjects);
            return { projects: localProjects };
        case ProjectActionTypes.PROJECT_TASK_CREATE:
            console.log(action.payload);
            localProjects = state.projects.map(project => {
                if (project.id === action.payload.project.id)
                    project.tasks.push(action.payload.task);
                return project;
            })
            console.log(localProjects);
            localStorage.setItem("projects", localProjects);
            return { projects: localProjects };
        case ProjectActionTypes.PROJECT_SAVE:
            localProjects = state.projects;
            localStorage.setItem("projects", localProjects);
            return { projects: state.projects }
        default:
            return state;
    }
}