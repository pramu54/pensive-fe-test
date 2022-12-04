import { Box, Container, Link, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../commons/buttons/button";
import { EmailField, PasswordField, TextField1 } from "../../commons/textfield/textfield";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            navigate("/")
        })
    }

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
                                {console.log("name: " ,name)}
                            </Box>
                            <Box sx={{marginTop: '10px'}}>
                                <EmailField 
                                    onChange={(e)=>handleEmail(e)} 
                                    emailValue={email}
                                />
                                {console.log("email: " ,email)}
                            </Box>
                            <Box sx={{marginTop: '10px'}}>
                                <PasswordField 
                                    onChange={(e)=>handlePassword(e)} 
                                    passwordValue={password}
                                />
                                {console.log("password: " ,password)}
                            </Box>
                            <Box sx={{marginTop: '10px'}}>
                                <PrimaryButton onClick={onRegister} label="Register"/>
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