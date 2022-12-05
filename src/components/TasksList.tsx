import { useEffect, useRef } from "react";
import { useDrop } from 'react-dnd'
import { useTypedSelector } from "../hooks/useTypeSelector"
import Task from "./Task";
import { useAction } from "../hooks/useAction";
import ModalTask from "./ModaTask";


const TaskQeueneStatus = [
    "taskQuene",
    "taskDevelopment",
    "taskDone"
]

const TaskQueneName = [
    "QUENE",
    "DEVELOPMENT",
    "DONE"
]

interface ItemType {
    taskId: number
}

interface DustbinProps {
    classNameIndex: number
}

const TaskQuene: React.FC<DustbinProps> = ({ classNameIndex }) => {
    const { project } = useTypedSelector(state => state.tasks);
    const { search } = useTypedSelector(state => state.search);
    const { TaskUpdateAction, TaskUpdateStatusAction, ProjectSaveAction } = useAction();
    
    const node = useRef(null);
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: "TASK",
            drop: (item: ItemType, monitor) => { TaskUpdateAction(project, item.taskId, {status: classNameIndex}); ProjectSaveAction() },
            collect: (monitor) => {
                return {
                    isOver: !!monitor.isOver(),
                    canDrop: !!monitor.canDrop(),

                }
            },
        }),
        [TaskQeueneStatus[classNameIndex]],
    )
    return (
        <div className={TaskQeueneStatus[classNameIndex]}>
            { null/*<ModalTask taskId={0}/>*/}
            <h1 className="taskListName">{TaskQueneName[classNameIndex]}{ }</h1>
                <div ref={drop} className={'taskQueneContainer'} >
                    {project?.tasks.map(task => {
                        if (task.status === classNameIndex && task.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >= 0)
                            return <Task id={project.id} task={task} />
                    })
                    }
                </div>
        </div>
    )
}

const TaskList: React.FC = () => {
    const { TasksLoadAction, TaskUpdateStatusAction, ProjectSaveAction } = useAction();
    const { project } = useTypedSelector(state => state.tasks);
    const { isVisible } = useTypedSelector(state => state.modal);
    let status = -1;

    if (project === undefined)
        return <div>Error to load task from project!</div>

    useEffect(() => {
        TasksLoadAction(project);
    }, [])

    return (
        <div className="taskList">

            <h1 className="headerProject">{project.name}</h1>
            <TaskQuene classNameIndex={0} />
            <TaskQuene classNameIndex={1} />
            <TaskQuene classNameIndex={2} />
            {/* <div ref={drop}  className="taskQuene">{project?.tasks.map(task => { if (task.status === 0) return <Task id={project.id} task={task} /> })}</div>
                <div ref={drop} className="taskDevelopment">{project?.tasks.map(task => { if (task.status === 1) return <Task id={project.id} task={task} /> })}</div>
                <div ref={drop} className="taskDone">{project?.tasks.map(task => { if (task.status === 2) return <Task id={project.id} task={task} /> })}</div> */}
        </div>
    )
}

export default TaskList;