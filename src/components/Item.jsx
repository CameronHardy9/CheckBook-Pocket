import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {useNavigate} from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import {useState} from 'react';

function Item() {
    const navigate = useNavigate();

    return(
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box sx={{ width: "auto"}}>
                <BottomNavigation
                    showLabels
                >
                    <BottomNavigationAction label="Delete" icon={<DeleteOutlineIcon />} onClick={() => navigate('../')} />
                    <BottomNavigationAction label="Cancel" icon={<CancelIcon />} onClick={() => navigate('../')} />
                </BottomNavigation>
            </Box>
        </Paper>
    )
}

export default Item;