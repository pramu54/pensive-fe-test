import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const AlertBox = ({isOpen, severity, message, handleClose, onCloseClick}) => {

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    
    //     setIsOpen(false);
    // };

    return(
        <>
            {/* <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar> */}
            <Box sx={{ width: '100%' }}>
                <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={onCloseClick}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        severity={severity}
                    >
                        <strong>{message}</strong>
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )
}
export default AlertBox;