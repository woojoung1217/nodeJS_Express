//fetch
//axios

import { useEffect, useState } from "react";
import axios from "axios";

function App2() {
  const [todoList, setTodoList] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/api/todo")
      .then((response) => response.json())
      .then((data) => setTodoList(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmithandler = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    fetch("http://localhost:4000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        done,
      }),
    }).then(() => {
      fetchData();
    });
  };

  const onDelete = (index) => {
    // 클릭한 버튼의 인덱스를 받아와서 해당 인덱스의 todo 항목을 삭제
    const deletedTodo = todoList[index];

    // 삭제 요청 보내기
    fetch(`http://localhost:4000/api/todo/${deletedTodo.id}`, {
      method: "DELETE",
    }).then(() => {
      // 삭제 요청이 성공하면 해당 항목을 todoList에서 제거
      const updatedTodoList = [...todoList];
      updatedTodoList.splice(index, 1); // 해당 인덱스의 항목을 삭제
      setTodoList(updatedTodoList);
    });
  };

  return (
    <div className="App">
      <h1>TODO LIST</h1>

      <form onSubmit={onSubmithandler}>
        <input name="text" />
        <input name="done" type="checkbox" />
        <input type="submit" value="추가" />
      </form>
      {todoList.map((todo, index) => (
        <div key={todo.id} style={{ display: "flex" }}>
          <div>{todo.id}.</div>
          <div>{todo.text}</div>
          <div>{todo.done ? "Y" : "N"}</div>
          <button
            onClick={() => {
              onDelete(index);
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default App2;
