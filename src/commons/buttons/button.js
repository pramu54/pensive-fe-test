import { Button } from "@mui/material"

const PrimaryButton = ({onClick, label}) => {
    return(
        <>
            <Button 
                color='primary'
                variant="contained"
                onClick={onClick}
            >
                {label}
            </Button>
        </>
    )
}

const SecondaryButton = ({onClick, label, color}) => {
    return(
        <>
            <Button 
                onClick={onClick}
                color={color}
                variant="text"
            >
                {label}
            </Button>
        </>
    )
}
export {PrimaryButton, SecondaryButton};