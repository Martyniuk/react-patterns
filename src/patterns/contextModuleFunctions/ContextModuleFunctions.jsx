import * as React from 'react'

import { TodoContextProvider } from './context'
import { TodoForm, TodoList } from './components'

function ContextModuleFunctions() {

    return (
        <TodoContextProvider>
            <h3>Context Module Functions</h3>
            <TodoForm />
            <TodoList />
        </TodoContextProvider>
    )
}

export { ContextModuleFunctions }