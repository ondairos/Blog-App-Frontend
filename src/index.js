import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createStore } from 'redux'
import { blogReducer } from './reducers/blogReducer'
import { Provider } from 'react-redux'

//create store for state management-redux-
const store = createStore(blogReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
