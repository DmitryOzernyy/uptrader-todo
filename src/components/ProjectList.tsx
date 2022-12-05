import React, { useEffect } from 'react';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypeSelector';
import ModalWindow from './Modal';
import ProjectCard from './ProjectCard';

const ProjectList: React.FC = () => {
    const { projects } = useTypedSelector(state => state.project);
    const { search } = useTypedSelector(state => state.search);
    const { isVisible } = useTypedSelector(state => state.modal);
    const { ProjectsLoadAction, TasksLoadAction } = useAction();
    useEffect(() => {
        ProjectsLoadAction();
        TasksLoadAction({id: -1, name: "", tasks: []});
    }, []);
    
    return (
        <div>
                {projects.map(project => {
                    if (project.name.toLowerCase().indexOf(search.toLowerCase()) >= 0) {
                        return (
                            <ProjectCard project={project} />
                        );
                    }
                })
                }
        </div>
    )
}

export default ProjectList;