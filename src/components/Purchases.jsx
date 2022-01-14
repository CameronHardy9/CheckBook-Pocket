import {useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {useState} from 'react';

function Purchases(props) {
    const navigate = useNavigate();

    return(
        <div className='viewWindow' style={{marginTop: "55px"}}>
            {props.purchases.map((item) => {
                return(
                <Paper key={item.uniqid} sx={{width: "auto", height: "auto", padding: "20px", margin: "10px"}} elevation={3}>
                    <Stack direction="row" spacing={"auto"}>
                        <span>{item.store}</span>
                        <span>${item.amount.toFixed(2)}</span>
                        <span>{item.date}</span>
                    </Stack>
                </Paper>
                )
            })}
        </div>
    )
}

export default Purchases;