import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function Purchases(props) {
    const handleClick = (id) => {
        const element = document.querySelector(`[data-key='${id}']`)
        element.hidden = !element.hidden;
      };

    return(
        <div style={{overflow: "scroll", flexGrow: 1}}>
            {props.purchases.map((item) => {
                return(
                    <div key={item.uniqid}>
                        <Paper onClick={() => handleClick(item.uniqid)} sx={{width: "auto", height: "auto", padding: "20px", margin: "10px"}} elevation={3}>
                            <Stack direction="row" spacing="auto">
                                <span>{item.store}</span>
                                <span>${item.amount.toFixed(2)}</span>
                                <span>{item.date}</span>
                            </Stack>
                        </Paper>
                        <Paper sx={{width: "auto", height: "auto", padding: "10px", margin: "10px", backgroundColor: "#c6c6c6"}} variant='outlined' data-key={item.uniqid} hidden>
                            <Stack direction="row" spacing={20} justifyContent="center">
                                <DeleteIcon fontSize='large' sx={{color: "white"}} onClick={() => console.log("Delete")} />
                                <HighlightOffIcon fontSize='large' sx={{color: "white"}} onClick={() => console.log("Cancel")} />
                            </Stack>
                        </Paper>
                    </div>
                )
            })}
        </div>
    )
}

export default Purchases;