import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';

export default function Nav(props) {
    const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
            <Button variant="text" sx={{ marginRight: "auto", alignItems: "flex-end" }} onClick={() => {
                navigate("./");
            }}>
                <span style={{ fontSize: "large", color: "black", textAlign: "bottom" }}>CheckBook</span>
                <span style={{ fontSize: "x-small", color: "white", textAlign: "bottom"}}>pocket</span>
            </Button>
            <Typography variant="h6" component="div" sx={{ fontSize: "large" }}>${props.budget}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};