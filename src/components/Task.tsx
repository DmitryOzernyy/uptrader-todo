import { CSSProperties, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { idText } from "typescript";

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

const Task: React.FC<propsTask> = ({ id, task }) => {
    //const ref = useRef();
    const [isVisible, setVisible] = useState(false);
    const [{ isDragging, opacity }, drag, preview] = useDrag(
        () => ({
            type: "TASK",
            item: {
                projectId: id,
                taskId: task.id
            },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
                opacity: monitor.isDragging() ? 0.4 : 1
            }),
        }),
        [],
    )
    const { name, description, underTask } = task;
    return (
        <div ref={drag} style={{ ...style, opacity }} className="task">
            <div className="headerTask">
                <span className="taskName">{name}</span>
                <img onClick={() => setVisible(isVisible ? false : true)} className={`btnTaskOpen ${isVisible ? 'openTask' : 'closeTask'}`} src="https://cdn-icons-png.flaticon.com/512/271/271228.png" alt="" />
            </div>
            {isVisible && <div className="bodyTask">
                <span className="taskDescription">{description}</span>
                <div className="taskTime">
                    <span className="taskDateCreate">Date created: {dateFromTask(task.createDate)}</span>
                    {task.workTimeStart !== 0 ? <span className="taskWorkTime">Work Time: {Math.ceil((Date.now() - task.workTimeStart) / (1000 * 3600 * 24))} day</span> : null}
                    {task.endDate !== null ? <span className="taskDateEnd">Date end: {dateFromTask(task.endDate)}</span> : null}
                </div>
                {underTask.length !== 0 && <span>Under tasks:</span> && underTask.map(task =>
                    <Task id={task.id} task={task}/>
                )
                }
                <CommentsContainer taskId={task.id}/>
            </div>}

        </div>
    )
}

export default Task;