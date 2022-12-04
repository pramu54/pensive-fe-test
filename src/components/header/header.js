import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../../commons/buttons/button";

const HeaderMenu = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        axios
        .post("/api/logout", {}, {
            headers: { Authorization : `Bearer ${localStorage.getItem("token")}` }
        })
        .then((res)=>{
            console.log(res);
            localStorage.clear();
        }).catch((err)=>{
            console.log(err);
        }).finally(()=>{
            navigate("/");
        });
    }

    return(
        <>
            <Box sx={{
                width: 'auto',
                height: '50px',
                display: 'flex',
                border: 1,
                borderColor: 'primary.main',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                bgcolor: 'primary.main', 
                color: 'primary.contrastText'
            }}>
                <Box sx={{
                    mr: 3
                }}>
                    <SecondaryButton label="Logout" onClick={onLogout} color="inherit"/>
                </Box>
            </Box>
        </>
    )
}
export default HeaderMenu;