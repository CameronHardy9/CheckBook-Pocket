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
    });

    const [errors, setErrors] = useState({
        store: {
            error: false,
            message: undefined
        },
        amount: {
            error: false,
            message: undefined
        }
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
    };

    function inputIsValid() {
        const wordRegex = /\w+/g
        const numRegex = /\d+/g

        const tests = {
            storeExists: {
                field: 'store',
                test: wordRegex.test(fieldData.store),
                message: "Please enter a store name"
            },
            amountExists: {
                field: 'amount',
                test: numRegex.test(fieldData.amount),
                message: "Please enter a purchase amount"
            },
            between1and30Letters: {
                field: 'store',
                test: fieldData.store.length >= 1 && fieldData.store.length <= 30,
                message: "Store name must be between 1 and 30 characters"
            },
            between1and12Numbers: {
                field: 'amount',
                test: fieldData.amount.toString().length >= 1 && fieldData.amount.toString().length <= 12,
                message: "Amount must be between 1 and 12 digits"
            },
            isNumber: {
                field: 'amount',
                test: !isNaN(Number(fieldData.amount)),
                message: "Please only use numbers"
            }
        };

        let failedTest = false;

        for(const item in tests) {
            if(tests[item].test === false) {
                setErrors({
                    ...errors,
                    [tests[item].field]: {
                        error: true,
                        message: tests[item].message
                    }
                })
                failedTest = true;
            }
        };

        if(failedTest) {
            return false;
        }

        clearErrors();
        return true;
    };

    //TODO: FIX BUG - FUNCTION DOES NOT UPDATE STATE PROPERLY TO RESET ERRORS
    function clearErrors() {
        setErrors({
            store: {
                error: false,
                message: undefined
            },
            amount: {
                error: false,
                message: undefined
            }
        });
    }
    
    return (
        <>
            <IconButton onClick={() => toggleDrawer()}>
                <EditIcon fontSize="large" />
            </IconButton>
            <Drawer
                anchor="bottom"
                open={open}
                onClose={() => {
                    toggleDrawer();
                    clearErrors();
                    setFieldData({
                        store: props.purchase.store,
                        amount: props.purchase.amount
                    });
                }}
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
                            error={errors.store.error}
                            id="store"
                            label="Store"
                            type="text"
                            autoFocus={true}
                            defaultValue={fieldData.store}
                            helperText={errors.store.message}
                            sx={{width: '80vw', maxWidth: '400px'}}
                            onBlur={(e) => {
                                setFieldData({
                                    ...fieldData,
                                    store: e.target.value
                                })
                            }}
                        />
                        <TextField
                            required
                            error={errors.amount.error}
                            id="amount"
                            label="Amount"
                            type="number"
                            defaultValue={fieldData.amount}
                            helperText={errors.amount.message}
                            sx={{width: '80vw', maxWidth: '400px'}}
                            onBlur={(e) => {
                                setFieldData({
                                    ...fieldData,
                                    amount: Number(Number(e.target.value).toFixed(2))
                                })
                            }}
                        />
                        <Button onClick={() => {
                            clearErrors();
                            const result = inputIsValid();
                            if(result === true) {
                                updatePurchaseObject();
                                toggleDrawer();
                            }
                        }}>Update</Button>
                    </Stack>
                </Box>
            </Drawer>
        </>
    );
}
