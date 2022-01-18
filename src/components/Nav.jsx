import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {useNavigate} from 'react-router-dom';

function TopNav(props) {
    const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
            <Button variant="text" sx={{ marginRight: "auto", alignItems: "flex-end" }} onClick={() => {
                navigate("./");
                props.updatePath('');
            }}>
                <span style={{ fontSize: "large", color: "black", textAlign: "bottom" }}>CheckBook</span>
                <span style={{ fontSize: "x-small", color: "white", textAlign: "bottom" }}>pocket</span>
            </Button>
            <Typography variant="h6" component="div" sx={{ fontSize: "large" }}>${props.budget}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

function BottomNavHome(props) {
    const navigate = useNavigate(); 

    return(
        <Paper sx={{ position: 'static', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box sx={{ width: "auto"}}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Budget" icon={<AccountBalanceWalletIcon />} onClick={() => {
                        navigate('budget');
                        props.updatePath('budget');
                        }} />
                    <BottomNavigationAction label="Purchases" icon={<FormatListBulletedIcon />} onClick={() => {
                        navigate('purchases');
                        props.updatePath('purchases');
                        }} />
                </BottomNavigation>
            </Box>         
        </Paper>
    )
};

function BottomNavBudget(props) {
    const navigate = useNavigate();

    return(
        <Paper sx={{ position: 'static', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box sx={{ width: "auto"}}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Set Budget" icon={<AttachMoneyIcon />} onClick={() => console.log("Set Budget")} />
                    <BottomNavigationAction label="Back" icon={<ArrowBackIcon />} onClick={() => {
                        navigate('./');
                        props.updatePath('');
                        }} />
                </BottomNavigation>
            </Box>
        </Paper>
    )
};

function BottomNavPurchases(props) {
    const navigate = useNavigate();
    
    return(
        <Paper sx={{ position: 'static', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box sx={{ width: "auto"}}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Add Purchase" icon={<PlaylistAddIcon />} onClick={() => console.log("Add Purchase")} />
                    <BottomNavigationAction label="Back" icon={<ArrowBackIcon />} onClick={() => {
                        navigate('./');
                        props.updatePath('');
                        }} />
                </BottomNavigation>
            </Box>
        </Paper>
    )
};

export {
    TopNav,
    BottomNavHome,
    BottomNavBudget,
    BottomNavPurchases
};