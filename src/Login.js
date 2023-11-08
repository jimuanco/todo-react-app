import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { API_BASE_URL } from "./api-config";
import axios from "axios";

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");
    siginin({ username: username, password: password });
  }

  const siginin = (userDTO) => {
    axios.post(`${API_BASE_URL}/auth/signin`, userDTO)
      .then((response)=>{
        if(response.data.token) {
          localStorage.setItem("ACCESS_TOKEN", response.data.token);
          window.location.href="/";
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
        </Grid>
      </Grid>
      <form noValidate onSubmit={handleSubmit}>
        {" "}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="아이디"
              name="username"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="password"
              id="password"
              label="패스워드"
              name="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              로그인
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Login;