import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import apiHandler from '../utils/apiHandler';

function Purchases(props) {
    const [toggle, setToggle] = useState(true);
    const [show, setShow] = useState({});
    const params = useParams();

    useEffect(() => {
        let purObj = {}
        props.userObject.purchases.forEach((item) => {
            purObj = {...purObj,
            [item.uniqid]: false
            }
        })
        setShow(purObj);
    }, [props.userObject.purchases]);

    const handleClick = (id) => {
        for (const item in show) {
            if (item !== id){
                setShow((curr) => {
                    return {...curr,
                    [item]: false}
                });
            } else if (item === id) {
                setShow((curr) => {
                    return {...curr,
                    [item]: !curr[item]}
                });
            }
        }
      };

    const handleToggle = () => {
        setToggle(!toggle);
    }

    return(
        <div style={{overflow: "scroll", flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
            {props.userObject.purchases.map((item) => {
                return(
                    <div key={item.uniqid}>
                        <Paper onClick={() => {
                                handleClick(item.uniqid);
                                if(!toggle) {
                                    handleToggle();
                                }
                            }} sx={{width: "auto", height: "auto", padding: "20px", margin: "10px 10px 0px 10px"}} elevation={3}>
                            <Stack direction="row" spacing="auto">
                                <span>{item.store}</span>
                                <span>${item.amount.toFixed(2)}</span>
                                <span>{item.date}</span>
                            </Stack>
                        </Paper>
                        <Collapse in={show[item.uniqid]} >
                            <Paper sx={{width: "auto", height: "auto", padding: "10px", margin: "0px 10px 10px 10px", backgroundColor: "transparent"}} elevation={0} square data-key={item.uniqid}>
                                <Stack direction="row" spacing={15} justifyContent="center">
                                    {toggle ? (
                                        <>
                                            <EditIcon fontSize="large" onClick={() => console.log("edit")}/>
                                            <DeleteIcon fontSize='large' onClick={async () => handleToggle()} />
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircleOutlineIcon fontSize="large" onClick={async () => {
                                            const newDoc = await deleteHandler(params.id, item.uniqid);
                                            props.updateUserObject(newDoc);
                                            handleToggle();
                                        }} />
                                            <HighlightOffIcon fontSize="large" onClick={() => {
                                                handleClick(item.uniqid);
                                                handleToggle();
                                                }} />
                                        </>
                                    )}
                                </Stack>
                            </Paper>
                        </Collapse>
                    </div>
                )
            })}
            <Button sx={{padding: '30px'}} onClick={async () => {
                const confirmation = window.confirm('Are you sure you want to delete all purchases?');
                if (confirmation) {
                    const newDoc = await deleteAllHandler(props.userObject, confirmation);
                    props.updateUserObject(newDoc);
                }
            }}>Delete All</Button>
        </div>
    )
};

async function deleteHandler(userId, purchaseId) {
    const newDoc = await apiHandler("DELETE", {id: userId, uniqid: purchaseId});
    return newDoc;
};

async function deleteAllHandler(userObject, confirmation) {
    await apiHandler("DELETE", {id: userObject._id, confirmation: confirmation});
    const newDoc = {
        ...userObject,
        purchases: []
    }
    return newDoc;
}

export default Purchases;