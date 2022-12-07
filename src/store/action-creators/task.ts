import { ProjectType } from "../../types/projects";
import { TasksAction, TasksActionTypes, TaskType } from "../../types/task"


export const TasksLoadAction = (project: ProjectType): TasksAction => {
    return { type: TasksActionTypes.TASKS_LOAD, payload: { project } }
}

export const TaskCreateAction = (header: string, description: string, priority: number): TasksAction => {
    return { type: TasksActionTypes.TASK_CREATE, payload: { header, description, priority } };
}

export const TaskUpdateStatusAction = (project: ProjectType, task: TaskType, statusUpdate: number): TasksAction => {
    return { type: TasksActionTypes.TASKS_UPDATE_STATUS, payload: { project, task, statusUpdate } };
}

export const TaskUpdateAction = (project: ProjectType, task: TaskType, data: Object): TasksAction => {
    return { type: TasksActionTypes.TASK_UPDATE, payload: { project, task, data } }
}

export const TaskWriteAction = (project: ProjectType, task: TaskType | undefined): TasksAction => {
    return { type: TasksActionTypes.TASK_WRITE, payload: { project, task } };
}