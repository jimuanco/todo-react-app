import { AppBar, Button, Container, Grid, List, Paper, Toolbar, Typography } from '@mui/material';
import './App.css';
import Todo from "./Todo";
import { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import axios from 'axios';
import { API_BASE_URL } from "./api-config"

function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/todo`, {headers: addTokenInHeaders()})
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
    axios.post(`${API_BASE_URL}/todo`, item, {headers: addTokenInHeaders()})
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
    axios.put(`${API_BASE_URL}/todo`, item, {headers: addTokenInHeaders()})
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
    axios.delete(`${API_BASE_URL}/todo`, {data: item, headers: addTokenInHeaders()})
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((e) => {
        e.response.status == 403 && (window.location.href = "/login");
        console.log("http error");
        console.log(e);
      });
  }

  const addTokenInHeaders = () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    let headers = new Headers();
    if (accessToken && accessToken !== null) {
      headers = {Authorization: "Bearer " + accessToken};
    }
    return headers;
  }

  const signout = () => {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href="/login";
  }

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

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
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );
}

export default App;
