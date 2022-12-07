import { useState } from "react";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypeSelector"

interface propsModalTask {
    taskId:number,
}

const ModalTask: React.FC<propsModalTask> = ({taskId}) => {
    
    const {project} = useTypedSelector(state => state.tasks);
    const [data, setData] = useState(project.tasks.find(task=> task.id === taskId));
    const {TaskUpdateAction, ProjectSaveAction} = useAction();
    
    if(data === undefined)
        return <div>Error load task data!</div>
    const dateStart = new Date(data.createDate);
    const dateEnd = data.endDate !== null ? new Date(data.createDate) : undefined;
    return (
        <div className="modalWindowTask">
            Name: <input type="text" onChange={(e) => setData({...data, ...{name: e.target.value}})} value={data.name}/>
            Description: <input type="text" onChange={(e) => setData({...data, ...{description: e.target.value}})} value={data.description}/>
            <button onClick={()=> {TaskUpdateAction(project, data, data); ProjectSaveAction();}}></button>
            Date Start: <span>{`${dateStart.getDate()}/${dateStart.getMonth()}/${dateStart.getFullYear()}`}</span>
            {dateEnd !== undefined ? <span>{`${dateEnd.getDate()}/${dateEnd.getMonth()}/${dateEnd.getFullYear()}`}</span> : null}
            Priority: <span>{data.priority}</span>
            UnderTask: <div>
                {data.underTask.map(task=> <div>{task.name}</div>)}
            </div>
            Comments: <div>

            </div>
        </div>
    )
}

export default ModalTask