import { Box, Container, Link, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertBox from "../../commons/alert/alert";
import { PrimaryButton } from "../../commons/buttons/button";
import { EmailField, PasswordField } from "../../commons/textfield/textfield";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsOpen(false);
    };


    const onLogin = () => {
        axios
        .post("/api/login", {},
            { 
                auth: {
                    username: email,
                    password: password
                } 
            })
        .then((res)=>{
            const { loginToken } = res.data.response.message;
            localStorage.setItem("token", loginToken);
            navigate("/summary");
        }).catch((err)=>{
            const { data } = err.response;
            setErrorMessage(data.response.message);
            setIsOpen(true);
        })
    }

    useEffect(()=>{
        if(email==="" || password===""){
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [email, password])

    return(
        <>
            <Container maxWidth="xs">
                <Box sx={{
                    display: 'flex', 
                    flexDirection: "column", 
                    justifyContent: 'center', 
                    minHeight: "100vh"}}>
                    <Box sx={{
                        width: 300,
                        height: 300,
                        border: '1px solid',
                        borderColor: 'primary.main',
                        borderRadius: 1,
                        display: 'flex', 
                        flexDirection: "column", 
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 4
                    }}>
                        <Box>
                            <h2>Login</h2>
                        </Box>
                        <Box sx={{marginTop: '20px'}}>
                            <EmailField 
                                onChange={(e)=>handleEmail(e)} 
                                emailValue={email}
                            />
                        </Box>
                        <Box sx={{marginTop: '10px'}}>
                            <PasswordField
                                onChange={(e)=>handlePassword(e)}
                                passwordValue={password}
                            />
                        </Box>
                        <Box sx={{marginTop: '10px'}}>
                            <PrimaryButton onClick={onLogin} label="Login" isDisabled={isDisabled}/>
                        </Box>
                        <Box sx={{
                            marginTop: '10px',
                            display: 'flex',
                        }}>
                            <Typography variant="body2">Don't have an account?</Typography>
                            <Link
                                component="button"
                                variant="body2"
                                onClick={()=>navigate("/register")} 
                            >
                                Register
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <AlertBox 
                isOpen={isOpen} 
                severity="error" 
                message={errorMessage} 
                handleClose={handleClose} 
                onCloseClick={() => {setIsOpen(false)}}
            />
        </>
    )
}
export default Login;