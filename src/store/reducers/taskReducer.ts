import { ids } from "webpack";
import { useAction } from "../../hooks/useAction";
import { ProjectType } from "../../types/projects";
import { TaskType, TasksState, TasksAction, TasksActionTypes } from "../../types/task";

const initialState: TasksState = {
    project: <ProjectType>{
        name: "",
        id: -1,
        tasks: []
    },
    task: <TaskType>{}
}

export const tasksReducer = (state = initialState, action: TasksAction): TasksState => {
    //const {ProjectTaskUpdateAction} = useAction();
    switch (action.type) {
        case TasksActionTypes.TASKS_LOAD:
            const {project} = action.payload;
            return {...state, project};
        case TasksActionTypes.TASKS_UPDATE_STATUS: {
            const { project, task } = state;
            const { tasks } = project;
            tasks.map(task => {
                if (task.id === action.payload.task.id)
                    task.status = action.payload.statusUpdate;
                return task;
            });
            return { project, task };
        }
        // case TasksActionTypes.TASK_CREATE:
        //     return {projectId: state.projectId, tasks: [...state.tasks, createTaskObject(state.tasks.length, header, description, priority)]}
        case TasksActionTypes.TASK_UPDATE: {
            const { project, task } = state;
            const tasks = project.tasks;
            const { data } = action.payload;
            if (action.payload.task.underTaskFlag === -1){
                tasks.filter(task => {
                    if (task.id === action.payload.task.id) {
                        if (data.status) {
                            if ((data.status === 0 || data.status === 1) && task.status === 0) {
                                task.status = data.status
                            }
                            if ((data.status === 1 || data.status === 2) && task.status === 1) {
                                task.status = data.status
                                if (data.status === 1 && task.workTimeStart === 0) {
                                    task.workTimeStart = Date.now();
                                }
                            }
                            if (data.status === 2 && task.status === 2) {
                                task.status = data.status
                                if (data.status === 2 && task.endDate === null)
                                    task.endDate = Date.now();
                            }

                        }
                        task.underTaskFlag = data.underTaskFlag !== undefined ? data.underTaskFlag : task.underTaskFlag;
                        task.priority = data.priority !== undefined ? data.priority : task.priority;
                        task.name = data.name !== undefined ? data.name : task.name;
                        task.description = data.description !== undefined ? data.description : task.description;
                        task.fileIn = data.fileIn !== undefined ? data.fileIn : task.fileIn;
                        task.underTask = data.underTask !== undefined ? data.underTask : task.underTask;
                        task.comments = data.comments !== undefined ? data.comments : task.comments;
                        task.endDate = data.endDate !== undefined ? data.endDate : task.endDate;
                    }
                    return task;
                });
            } else {
                const task = project.tasks.find(task => task.id === action.payload.task.underTaskFlag)
                if(task === undefined) return state;
                task.underTask.filter(task=>{
                    if (task.id === action.payload.task.id) {
                        if (data.status) {
                            if ((data.status === 0 || data.status === 1) && task.status === 0) {
                                task.status = data.status
                            }
                            if ((data.status === 1 || data.status === 2) && task.status === 1) {
                                task.status = data.status
                                if (data.status === 1 && task.workTimeStart === 0) {
                                    task.workTimeStart = Date.now();
                                }
                            }
                            if (data.status === 2 && task.status === 2) {
                                task.status = data.status
                                if (data.status === 2 && task.endDate === null)
                                    task.endDate = Date.now();
                            }

                        }
                        task.underTaskFlag = data.underTaskFlag !== undefined ? data.underTaskFlag : task.underTaskFlag;
                        task.priority = data.priority !== undefined ? data.priority : task.priority;
                        task.name = data.name !== undefined ? data.name : task.name;
                        task.description = data.description !== undefined ? data.description : task.description;
                        task.fileIn = data.fileIn !== undefined ? data.fileIn : task.fileIn;
                        task.underTask = data.underTask !== undefined ? data.underTask : task.underTask;
                        task.comments = data.comments !== undefined ? data.comments : task.comments;
                        task.endDate = data.endDate !== undefined ? data.endDate : task.endDate;
                    }
                    return task;
                })
            }
            return { project, task };
        }

        case TasksActionTypes.TASK_WRITE: {
            const {task, project} = action.payload;
            
            return state.task === task ? {task: <TaskType>{}, project}: action.payload;
        }
        default:
            return state;
    }
}