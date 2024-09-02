import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { ThemeProvider, createTheme } from '@mui/material/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 800,
    textAlign: "left",
    margin: 20,
  },
  avatar: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  link: {
    textDecoration: "none",
    boxShadow: "none",
    color: "white",
  },
}));

function Post(props) {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { title, text, userId, userName, postId, likes } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] =useState(likes.length);
  const [likeId, setLikeId] = useState(null);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;

  const deleteLike = () => {
    fetch("/likes/"+likeId, {
      method: "DELETE",
      headers: {
        "Authorization" : localStorage.getItem("tokenKey"),
      },
    })
      .catch((err) => console.log("error"));
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    if(isLiked){
      saveLike();
      setLikeCount(likeCount +1)}
    else{ 
      deleteLike();
      setLikeCount(likeCount -1)}
  };

  const handleExpandClick = () => {
    if (!expanded) {
      RefreshComment(); // Yorumları yükle
    }
    setExpanded(!expanded);
    
  };
  
  const checkLikes = () => {
    var likeControl = likes.find((like => ""+like.userId === localStorage.getItem("currentUser")));
    
    if(likeControl != null){
      setLikeId(likeControl.id);
     
    }
    setIsLiked(true);
  }
 
  const saveLike = () => {
    fetch("/likes", { // Eğer likeId varsa, /likes/{likeId} kullanılır, aksi halde /likes/ kullanılır
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        postId: postId,
        userId: userId,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };
  
    
 
  
  const RefreshComment = () => {
    fetch("/comments?postId=" + postId)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {checkLikes();
 
  }, []); // Boş array: sadece bileşen ilk kez render olduğunda çalışacak

  return (
    <div
      className={"postContainer"}
      style={{ display: "flex", justifyContent: "center", padding: "20px" }}
    >
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Card
            sx={{ maxWidth: 800, width: 600, margin: "auto", textAlign: "left" }}
          >
            <CardHeader
              avatar={
                <Link
                  to={{ pathname: "/users/" + userId }}
                  style={{
                    textDecoration: "none",
                    boxShadow: "none",
                    color: "inherit",
                  }}
                >
                  <Avatar
                    sx={{
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    }}
                    aria-label="recipe"
                  >
                    {userName.charAt(0).toUpperCase()}
                  </Avatar>
                </Link>
              }
              title={title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {text}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
  {disabled ? (
    <IconButton disabled onClick={handleLike} aria-label="add to favorites">
      <FavoriteIcon style={!isLiked ? { color: "red" } : null} />
    </IconButton>
  ) : (
    <IconButton onClick={handleLike} aria-label="add to favorites">
      <FavoriteIcon style={!isLiked ? { color: "red" } : null} />
    </IconButton>
  )}
  {likeCount}

  <IconButton aria-label="share">
    <ShareIcon />
  </IconButton>
  <ExpandMore
    expand={expanded}
    onClick={handleExpandClick}
    aria-expanded={expanded}
    aria-label="show more"
  >
    <CommentIcon />
  </ExpandMore>
</CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Container fixed className={classes.container}>
                {error
                  ? "error"
                  : isLoaded
                  ? commentList.map(comment =>
                  (
                    <Comment userId = {14} userName = {"user"} text = {comment.text}  ></Comment>
                  )
                  )
                  : "Loading"}
                  {disabled? "" :<CommentForm userId = {14} userName = {"ahmet"} postId = {postId} ></CommentForm>}
              </Container>
            </Collapse>
          </Card>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Post;
