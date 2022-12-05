import { ids } from "webpack";
import { useAction } from "../../hooks/useAction";
import { ProjectType } from "../../types/projects";
import { TaskType, TasksState, TasksAction, TasksActionTypes } from "../../types/task";

const initialState: TasksState = {
    project: <ProjectType>{
        name: "",
        id: -1,
        tasks: []
    }
}

export const tasksReducer = (state = initialState, action: TasksAction): TasksState => {
    //const {ProjectTaskUpdateAction} = useAction();
    switch(action.type){
        case TasksActionTypes.TASKS_LOAD:
            return action.payload;
        case TasksActionTypes.TASKS_UPDATE_STATUS: {
            const {project} = state;
            const {tasks} = project;
            tasks.map(task=>{
                if(task.id === action.payload.taskId)
                    task.status = action.payload.statusUpdate;
                return task;
            });
            return {project};
        }
        // case TasksActionTypes.TASK_CREATE:
        //     return {projectId: state.projectId, tasks: [...state.tasks, createTaskObject(state.tasks.length, header, description, priority)]}
        case TasksActionTypes.TASK_UPDATE: {
            const {project} = state;
            const tasks = project.tasks;
            const {data} = action.payload;
            tasks.filter(task=>{
                if(task.id === action.payload.taskId){
                    console.log(task.status, data.status);
                    if(data.status){
                        if((data.status === 0 || data.status === 1) && task.status === 0){
                            task.status = data.status
                        }
                        if((data.status === 1 || data.status === 2) && task.status === 1){
                            task.status = data.status
                            if(data.status ===  1 && task.workTimeStart === 0){
                               task.workTimeStart = Date.now();
                            }
                        }
                        if(data.status === 2 && task.status === 2){
                            task.status = data.status
                            if(data.status === 2 && task.endDate === null)
                                task.endDate = Date.now();
                        }

                   }
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
            return {project};
        }  
        default:
            return state;
    }
}