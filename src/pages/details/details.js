import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
    const params = useParams();
    const [gpsDetails, setGpsDetails] = useState([]);

    const getDetails = async() => {
        await axios
        .get(`/api/${params.device_id}`, {
            headers : {
                  Authorization : `Bearer ${localStorage.getItem('token')}`
            }})
        .then((res) => {
              const { data } = res;
              setGpsDetails(data);
              console.log(data);
        })
        .catch((err) => {
            console.log(err.response);
        });
      }
  
      useEffect(()=>{
        getDetails();
      }, [])

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
                    <Typography variant="h4">{gpsDetails[0].device_id}</Typography>
                    <Typography variant="h5">{gpsDetails[0].device_type}</Typography>
                    <Box sx={{
                        mt: 5
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Box sx={{
                                    border: 1,
                                    borderColor: 'primary.main',
                                    borderRadius: 1,
                                    padding: 3
                                }}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Timestamp</TableCell>
                                                    <TableCell align="center">Location</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {gpsDetails.map((row) => (
                                                    <TableRow
                                                        key={row.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="center" component="th" scope="row">
                                                            {row.timestamp}
                                                        </TableCell>
                                                        <TableCell align="center">{row.location}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
                                <Box sx={{
                                    border: 1,
                                    borderColor: 'primary.main',
                                    borderRadius: 1,
                                    padding: 3
                                }}>
                                    {/* <Typography variant="h4">{gpsDetails[0].device_id}</Typography> */}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Details;