import {useNavigate, Outlet} from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useState} from 'react';

function Purchases(props) {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    return(
        <>
            <button onClick={() => navigate("1234")}>item</button>
            <Outlet />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <Box sx={{ width: "auto"}}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Add Purchase" icon={<PlaylistAddIcon />} onClick={() => console.log("Add Purchase")} />
                        <BottomNavigationAction label="Back" icon={<ArrowBackIcon />} onClick={() => navigate('../')} />
                    </BottomNavigation>
                </Box>
            </Paper>
        </>
    )
}

export default Purchases;