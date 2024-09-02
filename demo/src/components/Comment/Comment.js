import { Avatar, CardContent, OutlinedInput, Typography } from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import { InputAdornment } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    comment: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    link: {
        textDecoration: "none",
        boxShadow: "none",
        color: "inherit", // Daha uygun bir renk ayarı
    },
}));

function Comment(props) {
    const { text, userId, userName } = props;
    const classes = useStyles();

    return (
        <CardContent className={classes.comment}>
            <OutlinedInput
            disabled
            id="outlined-adornment-amount"
            multiline
            inputProps={{maxLength : 25 }}
            fullWidth
            value = {text}
            startAdornment = {
            <InputAdornment position="start">
            <Link className={classes.link} to={{ pathname: '/users/' + userId }}>
                <Avatar aria-label="recipe" className={classes.small}>
                    {userName.charAt(0).toUpperCase()}
                </Avatar>
            </Link>
            </InputAdornment>

            }
            style={{color : "black", backgroundColor:'white'}}
            ></OutlinedInput>
        </CardContent>
    );
}

export default Comment;