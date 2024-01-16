import React, { useState } from 'react'
import Create from './Create'

function Home() {
    const [todos, setTodos] = useState([])

    return (
        <div className='home'>
            <h2>Todo List</h2>
            <Create />
            {
                todos.length === 0
                ?
                <div><h5>Aún no hay tareas</h5></div>
                :
                todos.map(todo => (
                    <div>
                        {todo}
                    </div>
                ))
            }
        </div>
    )
}

export default Home