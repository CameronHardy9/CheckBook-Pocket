import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {useState} from 'react';

function Budget(props) {
    const navigate = useNavigate();
    const [currBud, setCurrBud] = useState(props.currBud);
    const [setBud, setSetBud] = useState(props.setBud);

    return(
        <>
            <h2>${setBud}</h2>
            <h2>${currBud}</h2>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <Box sx={{ width: "auto"}}>
                    <BottomNavigation
                        showLabels
                    >
                        <BottomNavigationAction label="Set Budget" icon={<AttachMoneyIcon />} onClick={() => console.log("Set Budget")} />
                        <BottomNavigationAction label="Back" icon={<ArrowBackIcon />} onClick={() => navigate('../')} />
                    </BottomNavigation>
                </Box>
            </Paper>
        </>
    )
}

export default Budget;