import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import apiHandler from "../utils/apiHandler";

export default function PurchaseEditDrawer(props) {
    const [open, setOpen] = useState(false);
    const [fieldData, setFieldData] = useState({
        store: props.purchase.store,
        amount: props.purchase.amount
    })

    function toggleDrawer(){
        setOpen(!open);
    };

    async function updatePurchaseObject() {
        const updatedPurchaseObject = props.userObject.purchases.map((item) => {
            if(item.uniqid === props.purchase.uniqid) {
                const newItem = {
                    ...item,
                    store: fieldData.store,
                    amount: fieldData.amount
                }
                return newItem;
            }
            return item;
        })

        const result = await apiHandler('PUT', {
            id: props.userObject._id, 
            body: {purchases: updatedPurchaseObject}
            })

        if(result.modifiedCount) {
            props.updateUserObject({
                ...props.userObject,
                purchases: updatedPurchaseObject
            });
        }
    }
    
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
                            defaultValue={fieldData.store}
                            helperText={""}
                            sx={{width: '80vw', maxWidth: '400px'}}
                            onChange={(e) => {
                                setFieldData({
                                    ...fieldData,
                                    store: e.target.value
                                })
                            }}
                        />
                        <TextField
                            required
                            error={false}
                            id="amount"
                            label="Amount"
                            type="number"
                            defaultValue={fieldData.amount}
                            helperText={""}
                            sx={{width: '80vw', maxWidth: '400px'}}
                            onChange={(e) => {
                                setFieldData({
                                    ...fieldData,
                                    amount: Number(e.target.value)
                                })
                            }}
                        />
                        <Button onClick={() => {
                            updatePurchaseObject();
                            toggleDrawer();
                        }}>Update</Button>
                    </Stack>
                </Box>
            </Drawer>
        </>
    );
}
