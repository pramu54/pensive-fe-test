import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

const TextField1 = ({label, nameValue, placeholder, onChange}) => {
    return(
        <>
            <TextField 
                required
                id="outlined-required"
                label={label}
                variant="standard"
                value={nameValue}
                placeholder={placeholder}
                onChange={onChange}
                sx={{width: '250px'}}
            />
        </>
    )
}

const PasswordField = ({onChange, passwordValue}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <>
            <FormControl sx={{ m: 1, width: '250px' }} variant="standard">
                <InputLabel htmlFor="standard-password-input">Password</InputLabel>
                <Input
                    id="standard-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordValue}
                    onChange={onChange}
                    variant="standard"
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
                </FormControl>
        </>
    )
}

const EmailField = ({onChange, emailValue}) => {

    return(
        <>
            <TextField 
                required
                id="outlined-required-email"
                label="Email"
                variant="standard"
                value={emailValue}
                placeholder="Enter your email"
                onChange={onChange}
                sx={{width: '250px'}}
            />
        </>
    )
}

const SearchField = () => {
    return(
        <>
            <FormControl variant="outlined">
                <OutlinedInput
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    size="small"
                    placeholder="Search by Device ID/Type"
                    sx={{
                        width: "250px"
                    }}
                />
            </FormControl>
        </>
    )
}
export {TextField1, PasswordField, EmailField, SearchField};