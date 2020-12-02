import React, { useState, useMemo } from "react";
import { v4 as uuid } from "uuid";

const App = () => {
    const [todos, setTodos] = useState([
        { id: uuid(), title: "imparare React" },
        { id: uuid(), title: "imparare gli state" },
        { id: uuid(), title: "imparare i componenti funzionali" },
    ]);
    const [task, setTask] = useState("");
    const [term, setTerm] = useState("");
    const [search, setSearch] = useState("");

    const onChangeTerm = (e) => {
        setTerm(e.target.value);
    };

    const onChangeSeach = (e) => {
        setSearch(term);
    };

    const onChangeTask = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === "") return;

        setTodos([...todos, { title: task }]);
        setTask("");
    };

    let filterTodos = useMemo(
        () =>
            todos.filter((todo) => {
                console.log("esecuzione della funzione filtro");
                return todo.title.toLowerCase().includes(search.toLowerCase());
            }),
        [search]
    );

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={term}
                    placeholder="cerca"
                    onChange={onChangeTerm}
                />
                <button type="button" onClick={onChangeSeach}>
                    cerca
                </button>
            </form>
            <ListTodos todos={filterTodos} />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={task}
                    placeholder="aggiungi todo"
                    onChange={onChangeTask}
                />
            </form>
        </div>
    );
};

const ListTodos = ({ todos }) => {
    return (
        <ul>
            {todos.map((item, i) => (
                <Todo key={i} todo={item} />
            ))}
        </ul>
    );
};

const Todo = ({ todo }) => {
    return <li key={todo.id}>{todo.title}</li>;
};

export default App;
