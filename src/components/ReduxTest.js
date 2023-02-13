import React from 'react'
import { createStore } from 'redux'

export const ReduxTest = () => {

    // counter Reducer
    const counterReducer = (state = 0, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'DECREMENT':
                return state - 1
            case 'ZERO':
                return 0
            default: // if none of the above matches, code comes here
                return state
        }
    }

    // Reducer is never supposed to be called directly from the application's code. Reducer is only given as a parameter to the createStore-function which creates the store: 
    const store = createStore(counterReducer)
    // store.subscribe()

    return (
        <div>
            <div>
                {store.getState()}
            </div>
            <button
                onClick={e => store.dispatch({ type: 'INCREMENT' })}
            >
                plus
            </button>
            <button
                onClick={e => store.dispatch({ type: 'DECREMENT' })}
            >
                minus
            </button>
            <button
                onClick={e => store.dispatch({ type: 'ZERO' })}
            >
                zero
            </button>
        </div>
    )
}

