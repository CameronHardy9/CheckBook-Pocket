import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

export default function TempDrawer() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const cache = window.localStorage.getItem('checkbook_pocket');
        setEmail(JSON.parse(cache).email);
    }, [])

    function toggleDrawer(){
        setOpen(!open);
    };
    
    return (
        <>
            <IconButton onClick={() => toggleDrawer()}>
                <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={() => toggleDrawer()}
            >
                <Box
                    role="presentation"
                    onClick={() => toggleDrawer()}
                    sx={{
                        width: "50vw",
                        maxWidth: "300px"
                    }}
                >
                    <span>{email}</span>
                    <Divider />
                    <Button onClick={() => {
                        window.localStorage.removeItem('checkbook_pocket');
                        navigate('/');
                    }}>Log Out</Button>
                </Box>
            </Drawer>
        </>
    );
}
