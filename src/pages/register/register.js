import { Box, Container, Link, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../commons/buttons/button";
import { EmailField, PasswordField, TextField1 } from "../../commons/textfield/textfield";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    const handleName = (e) => {
        const value = e.target.value;
        setName(value);
    };
    
    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const onRegister = () => {
        axios
        .post("/api/signup", 
            { 
                name: name.toString(),
                email: email.toString(), 
                password: password.toString() 
            })
        .then((res)=>{
            navigate("/");
        }).catch((err)=>{
            console.log(err);
        });
    }

    useEffect(()=>{
        if(name==="" || email==="" || password===""){
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [name, email, password])

    useEffect(()=>{
        let regexpEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
        if (!regexpEmail.test(email)) {
            setIsEmailError(true);
            setEmailError("Email is invalid");
        } else {
            setIsEmailError(false);
            setEmailError("");
        }
    }, [email])

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
                        height: 400,
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
                                <h2>Register</h2>
                            </Box>
                            <Box sx={{marginTop: '20px'}}>
                                <TextField1 
                                    label="Name" 
                                    nameValue={name} 
                                    placeholder="Insert your fullname" 
                                    onChange={(e)=>handleName(e)}
                                />
                            </Box>
                            <Box sx={{marginTop: '10px'}}>
                                <EmailField 
                                    onChange={(e)=>handleEmail(e)} 
                                    emailValue={email}
                                    isError={isEmailError}
                                    helperText={emailError}
                                />
                            </Box>
                            <Box sx={{marginTop: '10px'}}>
                                <PasswordField 
                                    onChange={(e)=>handlePassword(e)} 
                                    passwordValue={password}
                                />
                            </Box>
                            <Box sx={{marginTop: '10px'}}>
                                <PrimaryButton onClick={onRegister} label="Register" isDisabled={isDisabled}/>
                            </Box>
                            <Box sx={{
                                marginTop: '10px',
                                display: 'flex',
                            }}>
                                <Typography variant="body2">Already have an account?</Typography>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={()=>navigate("/")} 
                                >
                                    Login
                                </Link>
                            </Box>
                    </Box>
                </Box>
            </Container>
        </>
    )
}
export default Register;