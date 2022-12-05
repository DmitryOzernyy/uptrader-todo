
import { useDispatch } from "react-redux";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { CommentList } from "../types/commentsTree";
import { ProjectType } from "../types/projects";
import { TaskType } from "../types/task";
const createTaskObject = (id: number, name: string, description: string, priority: number): TaskType => {
    return {
        id,
        name,
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
    const {ModalWindowActionVisible, ProjectCreateAction, TaskCreateAction, ProjectTaskCreateAction} = useAction();
    const {project} = useTypedSelector(state=>state.tasks);
    let taskId = project.tasks.length;
    //let projectId = project ? project.id : -1;
    let name = "";
    let description = ""
    return (
        <form className="modalWindow" action="">
            <div>Name <input type="text" onChange={(e)=> name = e.target.value} /></div>
            {project.id !== -1 ? <div>Description <input type="text" onChange={(e)=> description = e.target.value} /></div> : null}
            <button onClick={()=>{
                project.id === -1 ? ProjectCreateAction(name) : ProjectTaskCreateAction(project, createTaskObject(taskId, name, description, 0));
                ModalWindowActionVisible(false)
            }}>Create</button>
            <button onClick={(e)=>{
                ModalWindowActionVisible(false)
            }}>Close</button>
        </form>
    )
}

export default ModalWindow;