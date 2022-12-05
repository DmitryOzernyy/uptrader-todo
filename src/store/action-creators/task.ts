import { ProjectType } from "../../types/projects";
import { TasksAction, TasksActionTypes, TaskType } from "../../types/task"


export const TasksLoadAction = (project: ProjectType): TasksAction => {
    return { type: TasksActionTypes.TASKS_LOAD, payload: { project } }
}

export const TaskCreateAction = (header: string, description: string, priority: number): TasksAction => {
    return { type: TasksActionTypes.TASK_CREATE, payload: { header, description, priority } };
}

export const TaskUpdateStatusAction = (project: ProjectType, taskId: number, statusUpdate: number): TasksAction => {
    return { type: TasksActionTypes.TASKS_UPDATE_STATUS, payload: { project, taskId, statusUpdate } };
}

export const TaskUpdateAction = (project: ProjectType, taskId: number, data: Object): TasksAction => {
    return { type: TasksActionTypes.TASK_UPDATE, payload: { project, taskId, data } }
}