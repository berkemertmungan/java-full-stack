import React from "react";
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@mui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useNavigate } from "react-router-dom";
import { LockOpen } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    textAlign:'left'
  },
  link: {
    textDecoration: 'none',
    boxShadow:"none",
    color: 'white',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  let navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("userName");
    navigate(0);  // Sayfayı yeniden yüklemek için
  }

  return(
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">Home</Link>
          </Typography>
          <Typography variant="h6">
            {localStorage.getItem("currentUser") == null ? (
              <Link className={classes.link} to="/auth">Login/Register</Link>
            ) : (
              <div>
                <IconButton className={classes.link} onClick={onClick}>
                  <LockOpen />
                </IconButton>
                <Link className={classes.link} to={`/users/${localStorage.getItem("currentUser")}`}>Profile</Link>
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
