/*
 * Axios를 사용해서 네트웍 통신
*/
import { useEffect, useState } from "react";
import axios from 'axios';

const SERVER_URL = 'http://localhost:4000/api/todo';

function App() {
  const [todoList, setTodoList] = useState(null);

  /*
  // 1번방식 : Axios를 사용한 기본방식
  const fetchData = () => {    
    axios.get('http://localhost:4000/api/todo').then((response) => {
      setTodoList(response.data);
    });
  }
  */

  // 2번방식 : Axios를 사용한 기본방식
  const fetchData = async () => {    
    const response = await axios.get(SERVER_URL);
    setTodoList(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log('todoList 상태:' + todoList);

  // Axios 사용한 방식
  const onSubmitHandler = async (e) => {
    const text = e.target.text.value;
    const done = e.target.done.checked; // 체크박스는 checked를 사용
    console.log('onSubmitHandler text:' + text + ', done:' + done);

    // axios를 사용하면 2개의 줄로 만들어 진다.
    await axios.post(SERVER_URL, {text, done});
    fetchData();    
    /*
    fetch(SERVER_URL, {
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
    */
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
