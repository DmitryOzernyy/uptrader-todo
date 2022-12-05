import { createBrowserRouter,RouterProvider } from "react-router-dom";
import ModalWindow from "./components/Modal";
import ProjectList from "./components/ProjectList";
import { useAction } from "./hooks/useAction";
import { useTypedSelector } from "./hooks/useTypeSelector";
import TaskList from './components/TasksList';
import "./style/sass/main.sass";

const router = createBrowserRouter([
    {
      path: "/projects",
      element: <ProjectList />,
    },
    {
        path: "/projects/:projectId",
        element: <TaskList />,
    },
]);

const App = () => {
    
    const {SearchInputAction, ModalWindowActionVisible} = useAction();
    const {search} = useTypedSelector(state => state.search);
    const {isVisible} = useTypedSelector(state => state.modal);
    return (
        <div className="appContainer">
            {isVisible ? <ModalWindow /> : null}
            <header>
                    <div className="logoIcon"></div>
                    <span className="headerName">UT TODO</span>
                
            </header>
            <nav className="controlPanel">
                <div>
                    <button className="createNew" onClick={()=>ModalWindowActionVisible(true)}>Создать новый</button>
                    <input
                    onChange={(evt)=> SearchInputAction(evt.target.value)} 
                    className="searchInput" type="text" placeholder="Введите название" value={search}/>
                </div>
            </nav>
                <RouterProvider router={router} />
        </div>
    )
}

export default App;