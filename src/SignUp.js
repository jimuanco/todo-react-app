import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { API_BASE_URL } from "./api-config";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {

  const signup = (userDTO) => {
    axios.post(`${API_BASE_URL}/auth/signup`, userDTO)
      .then((response) => {
        window.location.href="/login";
      })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");
    signup({ username: username, password: password });
  }

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              계정 생성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="아이디"
              name="username"
              autoComplete="username"
              autoFocus
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
              계정 생성
            </Button>
          </Grid>
          <Grid item>
            <Link to="/login" variant="body2">
              이미 계정이 있습니까? 로그인하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;