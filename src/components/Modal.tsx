
import { useDispatch } from "react-redux";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { CommentList } from "../types/commentsTree";
import { ProjectType } from "../types/projects";
import { TaskType } from "../types/task";
const createTaskObject = (id: number, name: string, underTaskFlag: number, description: string, priority: number): TaskType => {
    return {
        id,
        name,
        underTaskFlag,
        description,
        createDate: Date.now(),
        workTimeStart: 0,
        endDate: null,
        fileIn: null,
        status: 0,
        priority,
        underTask: [],
        comments: new CommentList(-1, new Array())
    }
}




const ModalWindow: React.FC = () => {
    const { ModalWindowActionVisible, ProjectCreateAction, ProjectTaskCreateAction, ModalWindowChangeTypeAction, TaskUpdateAction, ProjectSaveAction } = useAction();
    const { project, task } = useTypedSelector(state => state.tasks);
    const { window } = useTypedSelector(state => state.modal);
    let taskId = project.tasks.length;
    //let projectId = project ? project.id : -1;
    let name = "";
    let description = ""

    if (window === 0) {
        return (
            <form className="modalWindow" action="">
                <div>Name <input type="text" onChange={(e) => name = e.target.value} /></div>
                <button onClick={() => {
                    ProjectCreateAction(name)
                    ModalWindowActionVisible(false)
                }}>Create</button>
                <button onClick={(e) => {
                    ModalWindowActionVisible(false)
                }}>Close</button>
            </form>
        )
    }

    if (window === 1) {
        return (
            <form className="modalWindow" action="">
                <div>Name <input type="text" onChange={(e) => name = e.target.value} /></div>
                <div>Description <input type="text" onChange={(e) => description = e.target.value} /></div>
                <button onClick={() => {
                    ProjectTaskCreateAction(project, createTaskObject(taskId, name, -1, description, 0));
                    ModalWindowActionVisible(false)
                }}>Create</button>
                <button onClick={(e) => {
                    ModalWindowActionVisible(false)
                }}>Close</button>
            </form>
        )
    }

    if (window === 2 && task !== undefined) {
        return (
            <form className="modalWindow" action="">
                <div>Name <input type="text" onChange={(e) => name = e.target.value} /></div>
                <div>Description <input type="text" onChange={(e) => description = e.target.value} /></div>
                <button onClick={() => {
                    createTaskObject(taskId, name, -1, description, 0);
                    TaskUpdateAction(project, task, {underTask: [...task.underTask, createTaskObject(task.underTask.length, name, task.id, description, 0)],} )
                    ModalWindowActionVisible(false);
                    ModalWindowChangeTypeAction(1);
                    ProjectSaveAction();
                }}>Create</button>
                <button onClick={(e) => {
                    ModalWindowActionVisible(false)
                    ModalWindowChangeTypeAction(1);
                }}>Close</button>
            </form>
        )
    }

    return (
        <div>Error to load modal!</div>
    )
}

export default ModalWindow;