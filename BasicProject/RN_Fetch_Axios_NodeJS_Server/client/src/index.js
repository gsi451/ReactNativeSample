import React from 'react';
import ReactDOM from 'react-dom/client';
import AppFetch from './AppFetch';
import AppAxios from './AppAxios';

// 서버에서 값을 가져올때 기본 제공하는 방식이 Fetch이고
// 라이브러리를 사용하는 방식이 axios라고 한다.

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}
    >
      <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AppFetch />
    <AppAxios />  
  </>
);
