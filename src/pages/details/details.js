import { Box, Typography } from "@mui/material";

const Details = () => {
    return(
        <>
            <Box sx={{
                margin: 10,
                px: 10,
                py: 5,
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1
            }}>
                <Box>
                    <Typography variant="h4">GPS Summary</Typography>
                </Box>
            </Box>
        </>
    )
}
export default Details;