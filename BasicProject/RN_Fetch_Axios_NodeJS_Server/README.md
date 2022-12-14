# React 프론트와 Node.js용 서버와의 통신 샘플

> 네이밍은 RN으로 했지만 리엑터 소스임!!

(참고자료) : https://www.youtube.com/watch?v=d6suykcsNeY&t=249s
이 영상을 토대로 작업 했습니다.

### 초기 설정

- 프로젝트 폴더 생성
- client, server 2개 폴더 생성

## 서버 셋팅

### 서버 생성

- VSCode의 터미널 창으로 이동
- server 폴더로 이동
- npm init를 입력후 기본 정보 입력 또는 무시하고 package.json 파일을 생성해준다.
- npm i express 를 설치한다. (node_modules 폴더가 생깁니다.)
- 서버 코드를 작성하기 위해서 app.js 파일을 생성합니다.

### npm 모듈 도움말 보는 방법
```
https://www.npmjs.com/
사이트로 이동합니다.
위에서 설치한 express 를 검색합니다.
해당 내용을 보면 사용방법이 나옵니다. (이 부분 보는것도 익숙해져야 한다.)
```

### 서버 기본 코드 작성
```javascript
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, () => {
    console.log( "Node Server Start!!" );   // 기본 동작 확인을 위해서 작성
})

[서버 실행]
PS E:\GsiProject_2022\2022_00_ReactNativeProject\BasicProject\RN_Fetch_Axios_NodeJS_Server\server> node app.js
Node Server Start!!

```
웹 브라우저를 실행해서 Hello World 실행이 잘되는지 확인하자.

![image](https://user-images.githubusercontent.com/119641015/207501853-b5e1dc1a-4f03-4168-9a58-09ad4609256d.png)

### Todo 리스트 서버 제작
```javascript
const express = require('express')
const app = express()

// express에서 body의 값을 사용할려면 body-parser가 필요합니다.
// https://expressjs.com/en/4x/api.html#req.body 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let id = 2;

const totoList = [{
    id: 1, 
    text: '할일 1',
    done: false;
}];

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('api/todo', (req, res) => {
    // json 형태로 todoList를 보내준다.
    res.json(todoList);
})

app.post('/api/todo', (req, res) => {    
    // body에서 데이터를 꺼내옵니다. 데이터 파서를 사용
    const {text, done} = req.body;
    // Todo 리스트에 추가
    todoList.push({
        id: id++,
        text,
        done,
    });
    // 추가후 성공메시지를 보내준다.
    return req.send('success');
})

app.listen(3000, () => {
    console.log( "Node Server Start!!" );
})
```

### Todo 리스트 서버 테스트

- 웹에서 확인
> Cannot GET /api/todo : 이런 오류가 나왔다.
```javascript
app.get('api/todo', (req, res) => {
    // json 형태로 todoList를 보내준다.
    res.json(todoList);
})

'api/todo' 이 코드를 '/api/todo' 이렇게 변경하였다.
제일 앞쪽에 / 를 추가 하지 않아서 발생한 문제
```
정상적으로 나옴

![image](https://user-images.githubusercontent.com/119641015/207505425-f8ce8a20-7eff-40bf-86cb-0b206a991e1a.png)

### Todo 리스트 서버 Post 신호 보내기 테스트

- POSTMAN을 사용한다.
- https://www.postman.com/ 사이트에서 설치한다.
- 아래와 같이 입력후 테스트 해서 success가 나오면 정상

![image](https://user-images.githubusercontent.com/119641015/207506584-f9741800-78b5-4e94-b714-1eb27764d2a7.png)

### Todo 리스트 서버 보낸 데이터가 잘 저장되었는지 확인하기 위해서 Get 신호 보내기 테스트

![image](https://user-images.githubusercontent.com/119641015/207506744-f4805d44-a722-4f56-8b25-716cafc32a67.png)

### 서버단의 todo 리스트를 가져오고 저장하는 기능까지 완료!!!

## 클라이언트 셋팅

### React 프로젝트 생성

- VSCode의 터미널 창으로 이동
- client 부모 폴더로 이동
- 명령어 입력시 해당 폴더명을 같이 넣어줘야 해서 위쪽 폴더로 이동해서 명령어를 입력
- npx create-react-app client 를 입력후 프로젝트 생성
- npm i express 를 설치한다. (node_modules 폴더가 생깁니다.)
- 서버 코드를 작성하기 위해서 app.js 파일을 생성합니다.

### 불필요한 코드 삭제
```
App.css
App.test.js
index.css
logo.svg
4개 파일을 삭제
이후 삭제한 파일을 삭제한 곳에 임포트 코드 삭제
이후 App.js 파일을 기준으로 정리
```

### Todo List 헤더 추가후 동작 확인
```javascript

function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
    </div>
  );
}

export default App;

```
동작 확인

![image](https://user-images.githubusercontent.com/119641015/207511062-2ad4fedf-9315-4a95-aa7d-28d9cfe6351c.png)

### CORS 오류 수정

실행하면 아래와 같은 오류들이 나오게 된다.

![image](https://user-images.githubusercontent.com/119641015/207515699-fca6f33a-14a1-4c0e-9c23-27801ca4453b.png)

이 부분은 서버단에서 생기는 문제임
서버 코드에 npm 설치후 코드 추가해야한다.

> npm install cors 로 설치함
> 코드에 추가함
```javascript
const cors = require('cors')

app.use(cors());
```
아래와 같이 정상적으로 불러 오는걸 확인할 수 있다.

![image](https://user-images.githubusercontent.com/119641015/207516739-24d7130b-a292-456d-9746-44cd15ed2b02.png)

### CORS 수정후 화면 정상적으로 가져온 모습

![image](https://user-images.githubusercontent.com/119641015/207516903-4cb0630a-4748-42f9-90e2-ff9ecc4bd6cd.png)

### 이후는 코드를 참조하면 된다.

- 해당 데이터는 useState를 사용해서 담는다.
- 해당 데이터를 가져올때는 fetch, axios를 사용한다.
- useEffect를 사용해서 한번만 불러 오도록 한다.
- 처음 App이 실행되면 todoList의 값은 null이 된다. 이때 화면에 렌더링 할때 null인지 아닌지 판단해서 다른 UI를 구성할 수 있다.
- 나머지는 코드 참조


