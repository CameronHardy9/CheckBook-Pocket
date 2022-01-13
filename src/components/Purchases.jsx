import {useNavigate, Outlet} from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useState} from 'react';

function Purchases(props) {
    const navigate = useNavigate();

    return(
        <div className='viewWindow' style={{marginTop: "55px"}}>
            {props.purchases.map((item) => {
                return(
                <Paper key={item.uniqid} sx={{width: "auto", height: "auto", padding: "20px", margin: "10px"}} elevation={3}>
                    <Stack direction="row" spacing={"auto"}>
                        <span>{item.store}</span>
                        <span>${item.amount.toFixed(2)}</span>
                        <span>{item.date}</span>
                    </Stack>
                </Paper>
                )
            })}
            <Outlet />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <Box sx={{ width: "auto"}}>
                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="Add Purchase" icon={<PlaylistAddIcon />} onClick={() => console.log("Add Purchase")} />
                        <BottomNavigationAction label="Back" icon={<ArrowBackIcon />} onClick={() => navigate('../')} />
                    </BottomNavigation>
                </Box>
            </Paper>
        </div>
    )
}

export default Purchases;