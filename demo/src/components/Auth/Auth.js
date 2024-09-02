import { Button, FormControl, FormHelperText, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Auth(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername = (value) => {
        setUsername(value);
    }

    const handlePassword = (value) => {
        setPassword(value);
    }

    const sendRequest = (path) => {
        fetch(("/auth/" + path), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: username,
                password: password,
            }),
        })
        .then((res) => {
            if (!res.ok) {
                console.log(res);
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((result) => {
            console.log(result); // Yanıtı konsola yazdırarak inceleyin
            localStorage.setItem("tokenKey", result.accessToken);
            localStorage.setItem("currentUser", result.userId);
            localStorage.setItem("userName", username);
        })
        .catch((err) => console.log(err));
    }
    

    const handleButton = (path) => {
        sendRequest(path);
        navigate("/");
        setUsername("");
        setPassword("");  // navigate.go yerine navigate kullanılıyor
    }
    

    return (
        <FormControl style={{ top: 250 }}>
            <InputLabel>Username</InputLabel>
            <Input onChange={(i) => handleUsername(i.target.value)} />
            <InputLabel style={{ top: 80 }}>Password</InputLabel>
            <Input input style={{ top: 40 }} onChange={(i) => handlePassword(i.target.value)} />
            <Button 
                variant="contained"
                style={{ marginTop: 60, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white' }}
                onClick={()=>handleButton("register")}
            >
                Register
            </Button>
            <FormHelperText style={{ margin: 60, marginTop: 20 }}>Are you already registered?</FormHelperText>
            <Button 
                variant="contained"
                style={{ marginTop: -40, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white' }}
                onClick={()=>handleButton("login")}
            >
                Login
            </Button>
        </FormControl>
    );
}

export default Auth;
