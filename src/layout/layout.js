import { Box } from "@mui/material";
import HeaderMenu from "../components/header/header";

const LayoutProvider = ({content}) => {
    return(
        <>
            <HeaderMenu />
            <Box sx={{minHeight: '100vh'}}>
                {content}
            </Box>
        </>
    )
}
export default LayoutProvider;