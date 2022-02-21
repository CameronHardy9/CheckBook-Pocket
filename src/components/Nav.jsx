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
import apiHandler from '../utils/apiHandler';
import {useNavigate, useParams} from 'react-router-dom';

function TopNav(props) {
    const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
            <Button variant="text" sx={{ marginRight: "auto", alignItems: "center" }} onClick={() => {
                navigate("./");
                props.updatePath('');
            }}>
                <span style={{ fontSize: "large", fontWeight: "400", color: "black" }}>CheckBook</span>
                <span style={{ fontSize: "x-small", fontWeight: "400", color: "white", margin: "5px 0 0 2px"}}>pocket</span>
            </Button>
            <Typography variant="h6" component="div" sx={{ fontSize: "large", color: "white" }}>${props.budget}</Typography>
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
    const params = useParams();

    return(
        <Paper sx={{ position: 'static', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box sx={{ width: "auto"}}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Set Budget" icon={<AttachMoneyIcon />} onClick={async () => {
                                const newDoc = await updateBudget(params.id);
                                if(newDoc) {
                                    props.updateUserObject(newDoc);
                                }
                            }} />
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
    const params = useParams();
    
    return(
        <Paper sx={{ position: 'static', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <Box sx={{ width: "auto"}}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Add Purchase" icon={<PlaylistAddIcon />} onClick={async () => {
                                const newDoc = await addPurchase(params.id);
                                if(newDoc) {
                                    props.updateUserObject(newDoc);
                                }
                            }} />
                    <BottomNavigationAction label="Back" icon={<ArrowBackIcon />} onClick={() => {
                        navigate('./');
                        props.updatePath('');
                        }} />
                </BottomNavigation>
            </Box>
        </Paper>
    )
};

async function addPurchase(userId) {
    let store = undefined;
    while(!store) {
        if(store === null){
            return null;
        };
        store = prompt("Store name?");
    }
    
    let amount = undefined;
    while(!amount || amount === 0){
        if(amount === null){
            return null;
        };
        amount = Number(prompt("Purchase Amount?"));
    };

    const date = new Date().toLocaleDateString("en-US").replaceAll("/","-");;

    const body = {
        id: userId,
        store: store,
        amount: amount,
        date: date
    }

    const newDoc = await apiHandler("PUT", body);
    return newDoc;
};

async function updateBudget(userId) {
    let budget = undefined;
    while(!budget || budget === 0){
        if(budget === null){
            return null;
        };
        budget = Number(prompt("New budget?"));
    };

    const body = {
        id: userId,
        budget: budget
    }
    const newDoc = await apiHandler("PUT", body)
    return newDoc;
};

export {
    TopNav,
    BottomNavHome,
    BottomNavBudget,
    BottomNavPurchases
};