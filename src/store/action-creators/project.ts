import { ProjectAction, ProjectActionTypes, ProjectType } from "../../types/projects"
import { TaskType } from "../../types/task";

export const ProjectsLoadAction = () => {
    return {type: ProjectActionTypes.PROJECTS_LOAD}
}

export const ProjectCreateAction = (name: string): ProjectAction => {
    return {type: ProjectActionTypes.PROJECT_CREATE, payload: name};
}

export const ProjectDeleteAction = (id: number): ProjectAction => {
    return {type: ProjectActionTypes.PROJECT_DELETE, payload: id}
}

export const ProjectTaskCreateAction = (project: ProjectType, task: TaskType): ProjectAction => {
    return {type: ProjectActionTypes.PROJECT_TASK_CREATE, payload: {project, task}}
}

export const ProjectSaveAction = () : ProjectAction => {
    return {type: ProjectActionTypes.PROJECT_SAVE};
}