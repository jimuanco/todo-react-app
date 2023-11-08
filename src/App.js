import { Container, List, Paper } from '@mui/material';
import './App.css';
import Todo from "./Todo";
import { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import axios from 'axios';
import { API_BASE_URL } from "./api-config"

function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/todo`)
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((e) => {
        e.response.status == 403 && (window.location.href = "/login");
        console.log("http error");
        console.log(e);
      });
  },[]);

  const addItem = (item) => {
    // item.id= "ID-" + items.length;
    // item.done = false;
    // setItems([...items, item]);
    // console.log("items : ", items);
    axios.post(`${API_BASE_URL}/todo`, item)
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((e) => {
        e.response.status == 403 && (window.location.href = "/login");
        console.log("http error");
        console.log(e);
      });
  }

  const editItem = (item) => {
    // setItems([...items]);
    axios.put(`${API_BASE_URL}/todo`, item)
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((e) => {
        e.response.status == 403 && (window.location.href = "/login");
        console.log("http error");
        console.log(e);
      });
  }

  const deleteItem = (item) => {
    // const newItems = items.filter(e => e.id !== item.id);
    //삭제할 아이템을 제외한 아이템을 다시 배열에 저장
    // setItems([...newItems]); //destructuring 안써도 될 듯?
    axios.delete(`${API_BASE_URL}/todo`, {data: item})
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((e) => {
        e.response.status == 403 && (window.location.href = "/login");
        console.log("http error");
        console.log(e);
      });
  }

  let todoItems = items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {items.map((item) => 
            <Todo item={item} key={item.id} editItem={editItem} deleteItem={deleteItem} />
          )}
        </List>
      </Paper>
    );

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
