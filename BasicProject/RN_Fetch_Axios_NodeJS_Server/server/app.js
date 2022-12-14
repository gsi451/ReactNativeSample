const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

// express에서 body의 값을 사용할려면 body-parser가 필요합니다.
// https://expressjs.com/en/4x/api.html#req.body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let id = 2;

// 사용법: await sleep(1000)
// 테스트를 위해서 임의로 속도를 늦게 준다.
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const todoList = [
  {
    id: 1,
    text: "할일 1",
    done: false,
  },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/todo", (req, res) => {
  // json 형태로 todoList를 보내준다.
  // 임시로 테스트를 위해서 속도를 느리게 한다.
  sleep(1000).then(() => {res.json(todoList);})  

  // 그냥 사용할때는 이 코드를...
  // res.json(todoList);
});

app.post("/api/todo", (req, res) => {
  // body에서 데이터를 꺼내옵니다. 데이터 파서를 사용
  const { text, done } = req.body;
  console.log("req.body : ", req.body);
  
  // Todo 리스트에 추가
  todoList.push({
    id: id++,
    text,
    done,
  });
  // 추가후 성공메시지를 보내준다.
  return res.send("success");
});

app.listen(4000, () => {
  console.log("Node Server Start!!");
});
