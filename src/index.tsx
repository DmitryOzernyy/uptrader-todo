import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import App from './App';
import LocalStorage from "./store/localStorage";
import projectJSON from "./projects.json";

let container = document.getElementById('root');
const root = ReactDOM.createRoot(container as Element);

if (!LocalStorage.getItem("projects"))
    LocalStorage.setItem("projects", projectJSON);
root.render(
    <Provider store={store}>
        <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <App />
        </DndProvider>
        </React.StrictMode>
        
    </Provider>,
);