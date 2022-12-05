import {TaskType} from './task'

export interface ProjectState {
    projects: ProjectType[];
}

export interface ProjectType {
    id: number;
    name: string;
    tasks: TaskType[];
}

export enum ProjectActionTypes {
    PROJECTS_LOAD = 'PROJECTS_LOAD',
    PROJECT_CREATE = 'PROJECT_CREATE',
    PROJECT_DELETE = 'PROJECT_DELETE',
    PROJECT_TASK_CREATE = 'PROJECT_TASK_CREATE',
    PROJECT_SAVE = 'PROJECT_SAVE'
}



interface ProjectsLoadAction {
    type: ProjectActionTypes.PROJECTS_LOAD;
    payload: ProjectType[]
}

interface ProjectCreateAction {
    type: ProjectActionTypes.PROJECT_CREATE;
    payload: string;
}

interface ProjectDeleteAction {
    type: ProjectActionTypes.PROJECT_DELETE,
    payload:number
}

interface ProjectTaskCreateAction {
    type: ProjectActionTypes.PROJECT_TASK_CREATE,
    payload: {
        project: ProjectType,
        task: TaskType
    }
}

interface ProjectSaveAction {
    type: ProjectActionTypes.PROJECT_SAVE;
}

export type ProjectAction = ProjectsLoadAction |
                            ProjectCreateAction |
                            ProjectDeleteAction |
                            ProjectTaskCreateAction |
                            ProjectSaveAction                       