import React, { useState, useReducer } from 'react';
import uuid from 'uuid/v4';

const initalTodos = [
    {
        id: uuid(),
        task: 'Learn React',
        complete: true,
    },
    {
        id: uuid(),
        task: 'Learn Firebase',
        complete: true,
    },
    {
        id: uuid(),
        task: 'Learn GraphQL',
        complete: false,
    },
];

const filterReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_ALL':
            return 'ALL';
        case 'SHOW_COMPLETE':
            return 'COMPLETE';
        case 'SHOW_INCOMPLETE':
            return 'INCOMPLETE';
        default:
            throw new Error();
    }
};

const App = () => {
    const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
    const [todos, setTodos] = useState(initalTodos);
    const [task, setTask] = useState('');

    const handleShowAll = () => {
        dispatchFilter({ type: 'SHOW_ALL' });
    };

    const handleShowComplete = () => {
        dispatchFilter({ type: 'SHOW_COMPLETE' });
    };

    const handleShowIncomplete = () => {
        dispatchFilter({ type: 'SHOW_INCOMPLETE' });
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'ALL') {
            return true;
        }

        if (filter === 'COMPLETE' && todo.complete) {
            return true;
        }

        if (filter === 'INCOMPLETE' && !todo.complete) {
            return true;
        }

        return false;
    });

    const handleChangeCheckbox = id => {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, complete: !todo.complete };
                } else {
                    return todo;
                }
            })
        );
    };

    const handleChangeInput = event => {
        setTask(event.target.value);
    };

    const handleSubmit = event => {
        if (task) {
            setTodos(todos.concat({ id: uuid(), task, complete: false }));
        }

        setTask('');

        event.preventDefault();
    };

    return (
        <div>
            <div>
                <button type="button" onClick={handleShowAll}>
                    Show All
        </button>
                <button type="button" onClick={handleShowComplete}>
                    Show Complete
        </button>
                <button type="button" onClick={handleShowIncomplete}>
                    Show Incomplete
        </button>
            </div>

            <ul>
                {filteredTodos.map(todo => (
                    <li key={todo.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={todo.complete}
                                onChange={() => handleChangeCheckbox(todo.id)}
                            />
                            {todo.task}
                        </label>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={task}
                    onChange={handleChangeInput}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    );
};

export default App;


// import React, { useState, useReducer } from 'react';
// import uuid from 'uuid/v4';

// const initalTodos = [
//   {
//     id: uuid(),
//     task: 'Learn React',
//     complete: true,
//   },
//   {
//     id: uuid(),
//     task: 'Learn Firebase',
//     complete: true,
//   },
//   {
//     id: uuid(),
//     task: 'Learn GraphQL',
//     complete: false,
//   },
// ];

// const filterReducer = (state, action) => {
//   switch (action.type) {
//     case 'SHOW_ALL':
//       return 'ALL';
//     case 'SHOW_COMPLETE':
//       return 'COMPLETE';
//     case 'SHOW_INCOMPLETE':
//       return 'INCOMPLETE';
//     default:
//       throw new Error();
//   }
// };

// const todoReducer = (state, action) => {
//   switch (action.type) {
//     case 'DO_TODO':
//       return state.map(todo => {
//         if (todo.id === action.id) {
//           return { ...todo, complete: true };
//         } else {
//           return todo;
//         }
//       });
//     case 'UNDO_TODO':
//       return state.map(todo => {
//         if (todo.id === action.id) {
//           return { ...todo, complete: false };
//         } else {
//           return todo;
//         }
//       });
//     case 'ADD_TODO':
//       return state.concat({
//         task: action.task,
//         id: uuid(),
//         complete: false,
//       });
//     default:
//       throw new Error();
//   }
// };

// const App = () => {
//   const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
//   const [todos, dispatchTodos] = useReducer(todoReducer, initalTodos);

//   const filteredTodos = todos.filter(todo => {
//     if (filter === 'ALL') {
//       return true;
//     }

//     if (filter === 'COMPLETE' && todo.complete) {
//       return true;
//     }

//     if (filter === 'INCOMPLETE' && !todo.complete) {
//       return true;
//     }

//     return false;
//   });

//   return (
//     <div>
//       <Filter dispatch={dispatchFilter} />
//       <TodoList dispatch={dispatchTodos} todos={filteredTodos} />
//       <AddTodo dispatch={dispatchTodos} />
//     </div>
//   );
// };

// const Filter = ({ dispatch }) => {
//   const handleShowAll = () => {
//     dispatch({ type: 'SHOW_ALL' });
//   };

//   const handleShowComplete = () => {
//     dispatch({ type: 'SHOW_COMPLETE' });
//   };

//   const handleShowIncomplete = () => {
//     dispatch({ type: 'SHOW_INCOMPLETE' });
//   };

//   return (
//     <div>
//       <button type="button" onClick={handleShowAll}>
//         Show All
//       </button>
//       <button type="button" onClick={handleShowComplete}>
//         Show Complete
//       </button>
//       <button type="button" onClick={handleShowIncomplete}>
//         Show Incomplete
//       </button>
//     </div>
//   );
// };

// const TodoList = ({ dispatch, todos }) => (
//   <ul>
//     {todos.map(todo => (
//       <TodoItem key={todo.id} dispatch={dispatch} todo={todo} />
//     ))}
//   </ul>
// );

// const TodoItem = ({ dispatch, todo }) => {
//   const handleChange = () =>
//     dispatch({
//       type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
//       id: todo.id,
//     });

//   return (
//     <li>
//       <label>
//         <input
//           type="checkbox"
//           checked={todo.complete}
//           onChange={handleChange}
//         />
//         {todo.task}
//       </label>
//     </li>
//   );
// };

// const AddTodo = ({ dispatch }) => {
//   const [task, setTask] = useState('');

//   const handleSubmit = event => {
//     if (task) {
//       dispatch({ type: 'ADD_TODO', task });
//     }

//     setTask('');

//     event.preventDefault();
//   };

//   const handleChange = event => setTask(event.target.value);

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={task} onChange={handleChange} />
//       <button type="submit">Add Todo</button>
//     </form>
//   );
// };

// export default App;