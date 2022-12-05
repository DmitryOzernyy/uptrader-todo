import { ProjectType } from "./projects";
import { CommentList, CommentNode } from "./commentsTree";


export interface TasksState {
    project: ProjectType
}

export interface TaskType {
    id: number,
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
    TASK_UPDATE = 'TASK_UPDATE'
}

interface TaskLoadAction {
    type: TasksActionTypes.TASKS_LOAD;
    payload: TasksState
}

interface TaskUpdateStatusAction {
    type: TasksActionTypes.TASKS_UPDATE_STATUS,
    payload: {
        project: ProjectType,
        taskId: number,
        statusUpdate: number
    }
}

interface TaskUpdateAction {
    type: TasksActionTypes.TASK_UPDATE,
    payload: {
        project: ProjectType,
        taskId: number,
        data: {
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
                            TaskUpdateAction