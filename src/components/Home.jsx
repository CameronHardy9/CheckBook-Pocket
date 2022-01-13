import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BudgetVisual from './BudgetVisual';

function Home(props) {
    const navigate = useNavigate();
    const [setBud, setSetBud] = useState(props.setBud);
    const [currBud, setCurrBud] = useState(props.currBud);
    const [calc, setCalc] = useState(0)
    /* (currBud / setBud) * 100 */

    useEffect(() => {
        setTimeout(() => {
            setCalc(100)
        }, 250)
    }, [])

    return (
    <>
        <BudgetVisual value={calc <= 0 ? 0 : calc} />
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box sx={{ width: "auto"}}>
                <BottomNavigation
                    showLabels
                >
                    <BottomNavigationAction label="Budget" icon={<AccountBalanceWalletIcon />} onClick={() => navigate('budget')} />
                    <BottomNavigationAction label="Purchases" icon={<FormatListBulletedIcon />} onClick={() => navigate('purchases')} />
                </BottomNavigation>
            </Box>         
        </Paper>  
    </>
    )
}

export default Home;