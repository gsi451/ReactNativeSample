import { useEffect, useState } from "react";

function App() {
  const [todoList, setTodoList] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:4000/api/todo")
    .then((response) => response.json())
    .then((data) => {
      console.log("패치를 가져와서 todoList배열에 추가");
      setTodoList(data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log('todoList 상태:' + todoList);

  const onSubmitHandler = (e) => {
    const text = e.target.text.value;
    const done = e.target.done.checked; // 체크박스는 checked를 사용
    console.log('onSubmitHandler text:' + text + ', done:' + done);

    fetch('http://localhost:4000/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          text,
          done,
        }),
    }).then(() => {
      fetchData();
    });
  }

  return (
    <div className="App">
      <h1>Todo List (Fetch 기본제공 방식)</h1>

      <form onSubmit={onSubmitHandler}>
        <input name='text'/>
        <input name='done' type='checkbox' />
        <input type='submit' vlaue='추가'/>
      </form>

      {!todoList && <p>Todo 정보를 가져오는중...</p>}
      {todoList &&
        todoList.map((todo) => (
          <div key={todo.id} style={{ display: 'flex' }}>
            <div>{todo.id}</div>
            <div>{todo.text}</div>
            <div>{todo.done ? 'Y' : 'N'}</div>
          </div>
        ))}
    </div>
  );
}

export default App;
