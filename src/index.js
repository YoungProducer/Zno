import path from 'path';
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './store/reducers'
import getFilesFromFolder from './utils/getFilesFromFolder'
import sortFiles from './utils/sortFiles';
import generateVariant from './utils/generateVariant';

const store = createStore(rootReducer)

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div')

root.id = 'root'
document.body.appendChild(root)

const dirname = 'dist/tasks/Математика/Алгебра/Теми/2/Відповіді';
(async () => {
    const files = await getFilesFromFolder('dist/tasks/Математика/Алгебра/Теми/2/Відповіді');
    const sortedFiles = sortFiles(files);
    console.log(sortedFiles);
    generateVariant('dist/tasks/Математика/Алгебра/Теми/2', sortedFiles, 'Відповіді');
})();

// Now we can render our application into it
render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.getElementById('root')
)
