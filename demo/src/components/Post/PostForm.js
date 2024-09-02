import React, { useState } from "react";
import { styled } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import { InputAdornment } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign: "left",
    margin: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white"
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PostForm(props) {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const { userId, userName, refreshPost } = props;
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSent(false);
  };

  const savePost = () => {
  const token = localStorage.getItem("tokenKey");
  console.log("Token:", token); // Token'ı kontrol et

  if (!token) {
    console.log("No token found, please log in.");
    return;
  }

  fetch("/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),    },
    body: JSON.stringify({
      title: title,
      userId: userId,
      text: text,
    }),
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
}


  const handleSubmit = () => {
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPost();
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  return (
    <div>
      <Snackbar open={isSent} autoHideDuration={1200} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          POST başarıyla yayınlandı!
        </Alert>
      </Snackbar>
      <div className="postContainer" style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="sm">
            <Card sx={{ maxWidth: 800, width: 600, margin: 'auto', textAlign: 'left' }}>
              <CardHeader
                avatar={
                  <Link to={`/users/${userId}`} style={{ textDecoration: "none", boxShadow: "none", color: "inherit" }}>
                    <Avatar sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }} aria-label="recipe">
                      {userName.charAt(0).toUpperCase()}
                    </Avatar>
                  </Link>
                }
                title={
                  <OutlinedInput
                    id="outlined-adorment-amount"
                    multiline
                    placeholder="Title"
                    inputProps={{ maxLength: 25 }}
                    fullWidth
                    value={title}
                    onChange={(e) => handleTitle(e.target.value)}
                  />
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <OutlinedInput
                    id="outlined-adorment-amount"
                    multiline
                    placeholder="text"
                    inputProps={{ maxLength: 250 }}
                    fullWidth
                    value={text}
                    onChange={(e) => handleText(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: "white" }}
                          onClick={handleSubmit}
                        >
                          POST
                        </Button>
                      </InputAdornment>
                    }
                  />
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </React.Fragment>
      </div>
    </div>
  );
}

export default PostForm;
