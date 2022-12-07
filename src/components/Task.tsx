import { CSSProperties, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { idText } from "typescript";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypeSelector";

import { TaskType } from "../types/task"
import CommentsContainer from "./CommentLits";
import CommentList from "./CommentLits";

const style: CSSProperties = {

}

interface propsTask {
    id: number,
    task: TaskType,
}

function dateFromTask(dateUTC: number): string {
    const date = new Date(dateUTC);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const TaskControlStatusButtons: React.FC<propsTask> = ({id, task}) =>{
    const { TaskUpdateAction, TaskWriteAction } = useAction();
    const { project } = useTypedSelector(state => state.tasks)
    return (
        <div className="taskControlStatusButtonsContainer">
            {
                (task.status === 0 && <button onClick={()=>TaskUpdateAction(project, task, {status: 1})}>Start task</button>) ||
                (task.status === 1 && <button onClick={()=>TaskUpdateAction(project, task, {status: 2})}>Complete task</button>) ||
                (task.status === 2 && <button onClick={()=>TaskUpdateAction(project, task, {status: 1})}>Return to the task</button>)
            }
        </div>
    )
}

const Task: React.FC<propsTask> = ({ id, task }) => {
    const {TaskUpdateAction, ModalWindowChangeTypeAction, ModalWindowActionVisible, TaskWriteAction} = useAction();
    const [isVisible, setVisible] = useState(false);
    const {tasks} = useTypedSelector(state=>state);
    const [{ opacity }, drag] = useDrag(
        () => ({
            type: "TASK",
            item: {
                projectId: id,
                task: task
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
                opacity: monitor.isDragging() ? 0.4 : 1
            }),
        }),
        [],
    )
    const { name, description, underTask } = task;

    if(task.underTaskFlag === -1 && tasks.task !== undefined){
        return (
            <div ref={drag} style={{ ...style, opacity }} className="task">
            <div className={`headerTask`}>
                <span className="taskName">{name}</span>
                <img onClick={() => TaskWriteAction(tasks.project, task)} className={`btnTaskOpen ${tasks.task.id === task.id ? 'openTask' : 'closeTask'}`} src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="" />
            </div>
            {(  tasks.task !== undefined && tasks.task.id === task.id) &&
            <div className="bodyTask">
                <TaskControlStatusButtons id={id} task={task} />
                <span className="taskDescription">{description}</span>
                <div className="taskTime">
                    <span className="taskDateCreate">Date created: {dateFromTask(task.createDate)}</span>
                    {task.workTimeStart !== 0 ? <span className="taskWorkTime">Work Time: {Math.ceil((Date.now() - task.workTimeStart) / (1000 * 3600 * 24))} day</span> : null}
                    {task.endDate !== null ? <span className="taskDateEnd">Date end: {dateFromTask(task.endDate)}</span> : null}
                </div>
                <div className="underTaskContainer">
                    Under Task: <div onClick={()=>{ModalWindowChangeTypeAction(2), ModalWindowActionVisible(true)}}>+</div>
                    {underTask.length !== 0 && <span>Under tasks:</span> && underTask.map(task =>
                        <Task id={task.id} task={task} />
                    )}
                </div>

                <CommentsContainer task={task} />
            </div>}

        </div>
        )
    }


    return (
        <div ref={drag} style={{ ...style, opacity }} className="task">
            <div className={`headerTask ${task.underTaskFlag !== -1 ? `headerUnderTask${task.status}`: ""}`}>
                <span className="taskName">{name}</span>
                <img onClick={() => setVisible(!isVisible)} className={`btnTaskOpen ${isVisible ? 'openTask' : 'closeTask'}`} src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="" />
            </div>
            { isVisible &&  <div className="bodyTask">
                <TaskControlStatusButtons id={id} task={task} />
                <span className="taskDescription">{description}</span>
                <div className="taskTime">
                    <span className="taskDateCreate">Date created: {dateFromTask(task.createDate)}</span>
                    {task.workTimeStart !== 0 ? <span className="taskWorkTime">Work Time: {Math.ceil((Date.now() - task.workTimeStart) / (1000 * 3600 * 24))} day</span> : null}
                    {task.endDate !== null ? <span className="taskDateEnd">Date end: {dateFromTask(task.endDate)}</span> : null}
                </div>
            </div>}

        </div>
    )
}

export default Task;