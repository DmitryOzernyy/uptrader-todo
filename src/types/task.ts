import { ProjectType } from "./projects";
import { CommentList, CommentNode } from "./commentsTree";


export interface TasksState {
    project: ProjectType,
    task: TaskType | undefined
}

export interface TaskType {
    id: number,
    underTaskFlag: number,
    name: string,
    description: string,
    createDate: number,
    workTimeStart: number,
    endDate: number | null,
    priority: number,
    fileIn: unknown,
    status: number,
    underTask: TaskType[],
    comments: CommentList
}

export enum TasksActionTypes {
    TASKS_LOAD = 'TASK_LOAD',
    TASKS_UPDATE_STATUS = 'TASKS_UPDATE_STATUS',
    TASK_CREATE = 'TASK_CREATE',
    TASK_UPDATE = 'TASK_UPDATE',
    TASK_WRITE = 'TASK_WRITE',
}

interface TaskLoadAction {
    type: TasksActionTypes.TASKS_LOAD;
    payload: {
        project: ProjectType,
    }
}

interface TaskUpdateStatusAction {
    type: TasksActionTypes.TASKS_UPDATE_STATUS,
    payload: {
        project: ProjectType,
        task: TaskType,
        statusUpdate: number
    }
}

interface TaskWriteAction {
    type: TasksActionTypes.TASK_WRITE,
    payload: {
        project: ProjectType;
        task: TaskType | undefined;
    }
}

interface TaskUpdateAction {
    type: TasksActionTypes.TASK_UPDATE,
    payload: {
        project: ProjectType,
        task: TaskType,
        data: {
            underTaskFlag?: number;
            name?: string,
            description?: string,
            priority?: number,
            fileIn?: unknown,
            status?: number,
            underTask?: TaskType[],
            comments?: CommentList,
            endDate?: number | null
        }
    }
}

interface TaskCreateAction {
    type: TasksActionTypes.TASK_CREATE,
    payload: {
        header: string,
        description: string,
        priority: number
    }
}

export type TasksAction =   TaskLoadAction |
                            TaskCreateAction |
                            TaskUpdateStatusAction |
                            TaskUpdateAction | 
                            TaskWriteAction