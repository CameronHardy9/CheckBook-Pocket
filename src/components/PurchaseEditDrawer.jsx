import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function PurchaseEditDrawer() {
    const [open, setOpen] = useState(false);

    function toggleDrawer(){
        setOpen(!open);
    };
    
    return (
        <>
            <IconButton onClick={() => toggleDrawer()}>
                <EditIcon fontSize="large" />
            </IconButton>
            <Drawer
                anchor="bottom"
                open={open}
                onClose={() => toggleDrawer()}
            >
                <Box
                    role="presentation"
                    sx={{
                        height: "50vh",
                        padding: '10px',
                        alignItems: 'center'
                    }}
                >
                    <Stack direction='column' sx={{alignItems: 'center'}} spacing={2}>
                    <h2 style={{padding: '20px 0'}}>Edit Purchase</h2>
                        <TextField
                            required
                            error={false}
                            id="store"
                            label="Store"
                            type="text"
                            defaultValue=""
                            helperText={""}
                            sx={{width: '80vw', maxWidth: '400px'}}
                            onChange={(e) => {
                                //TODO: Add change logic
                            }}
                        />
                        <TextField
                            required
                            error={false}
                            id="amount"
                            label="Amount"
                            type="number"
                            defaultValue=""
                            helperText={""}
                            sx={{width: '80vw', maxWidth: '400px'}}
                            onChange={(e) => {
                                //TODO: Add change logic
                            }}
                        />
                        <Button onClick={() => {
                            //TODO: Add functionality for updating user object
                        }}>Update</Button>
                    </Stack>
                </Box>
            </Drawer>
        </>
    );
}
