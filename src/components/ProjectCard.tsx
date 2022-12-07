import { useAction } from "../hooks/useAction";
import { ProjectType } from "../types/projects";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


interface propsProjectCard {
    project: ProjectType
}

const ProjectCard: React.FC<propsProjectCard> = ({project}) => {
    const navigate = useNavigate();
    const {ProjectDeleteAction, TasksLoadAction} = useAction();
    let projectCard;
    let linkUrl = `/projects${project.id}`;
    let deleteButtonOver = false;
    return (
        <span onClick={()=> {
            if(!deleteButtonOver) {
                TasksLoadAction(project); 
                navigate(linkUrl);
            } 
        }}>
        <div ref={projectCard} key={project.id} className='project'>
            <span>{project.name}</span>
            <div className="projectCardTaskBox">
                <div className="projectCardDoneTask"><span></span><p>Done : {project.tasks.filter(task=> task.status === 2).length}</p></div>
                <div className="projectCardDevelopmentTask"><span></span><p>Development : {project.tasks.filter(task=> task.status === 1).length}</p></div>
                <div className="projectCardQueueTask"><span></span><p>Queue : {project.tasks.filter(task=> task.status === 0).length}</p></div>
                <div className="btnTrashProject" onMouseEnter={()=> deleteButtonOver = true} onMouseLeave = {()=>deleteButtonOver = false} onClick={(e)=> { console.log(e.currentTarget);ProjectDeleteAction(project.id)}}></div>
            </div>
        </div>
        </span>
    )
}

export default ProjectCard;