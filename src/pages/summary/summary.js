import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SearchField } from "../../commons/textfield/textfield";
import CustomTable from "../../commons/table/table";
import axios from "axios";

const headCells = [
    {
      id: 'id',
      label: 'DeviceID',
    },
    {
      id: 'device_type',
      label: 'Device Type',
    },
    {
      id: 'timestamp',
      label: 'Latest Timestamp',
    },
    {
      id: 'location',
      label: 'Latest Location',
    }
];

const Summary = () => {
    const [gpsData, setGpsData] = useState([]);

    const getData = async() => {
      await axios
      .get(`/api`, {
          headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
          }})
      .then((res) => {
            console.log(res);
            const { data } = res;
            setGpsData(data);
      })
      .catch((err) => {
          console.log(err.response);
      });
    }

    useEffect(()=>{
        getData();
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
                    <Typography variant="h4">GPS Summary</Typography>
                </Box>
                <Box sx={{
                    mt: 5
                }}>
                    <SearchField />
                </Box>
                <Box sx={{
                    mt: 5
                }}>
                    <CustomTable headCells={headCells} data={gpsData}/>
                </Box>
            </Box>
        </>
    )
}
export default Summary;