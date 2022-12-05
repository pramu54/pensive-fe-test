import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
    return(
        <>
            <Box sx={{
                margin: 10,
                px: 10,
                py: 5,
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1,
                display: "flex",
                justifyContent: "center",
                alignItem: "center"
            }}>
                <Box>
                    <Typography variant="h1">Are You Lost?</Typography>
                </Box>
            </Box>
        </>
    )
}
export default ErrorPage;