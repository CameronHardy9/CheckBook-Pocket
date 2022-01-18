import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Portal from '@mui/material/Portal';
import {useState, useRef} from 'react';

function Purchases(props) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const container = useRef(null);

    const handleClick = () => {
        setShow(!show);
        console.log(container)
      };

    return(
        <div style={{overflow: "scroll", flexGrow: 1}}>
            {props.purchases.map((item) => {
                return(
                    <>
                        <Paper ref={container} key={item.uniqid} onClick={handleClick} sx={{width: "auto", height: "auto", padding: "20px", margin: "10px"}} elevation={3}>
                            <Stack direction="row" spacing={"auto"}>
                                <span>{item.store}</span>
                                <span>${item.amount.toFixed(2)}</span>
                                <span>{item.date}</span>
                            </Stack>
                        </Paper>
                        {show ? (
                            <Portal container={container.current}>
                                <span>Hello</span>
                            </Portal>
                        ) : null}
                    </>
                )
            })}
        </div>
    )
}

export default Purchases;