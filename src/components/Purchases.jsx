import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import {useParams} from 'react-router-dom';
import apiHandler from '../utils/apiHandler';

function Purchases(props) {
    const params = useParams();

    const handleClick = (id) => {
        const element = document.querySelector(`[data-key='${id}']`)
        element.hidden = !element.hidden;
      };

    return(
        <div style={{overflow: "scroll", flexGrow: 1}}>
            {props.purchases.map((item) => {
                return(
                    <div key={item.uniqid}>
                        <Paper onClick={() => handleClick(item.uniqid)} sx={{width: "auto", height: "auto", padding: "20px", margin: "10px 10px 0px 10px"}} elevation={3}>
                            <Stack direction="row" spacing="auto">
                                <span>{item.store}</span>
                                <span>${item.amount.toFixed(2)}</span>
                                <span>{item.date}</span>
                            </Stack>
                        </Paper>
                        <Paper sx={{width: "auto", height: "auto", padding: "10px", margin: "0px 10px 10px 10px", backgroundColor: "transparent"}} elevation={0} square data-key={item.uniqid} hidden>
                            <Stack direction="row" spacing={20} justifyContent="center">
                                <DeleteIcon fontSize='large' onClick={async () => {
                                    const newDoc = await deleteHandler(params.id, item.uniqid);
                                    props.updateUserObject(newDoc);
                                }} />
                            </Stack>
                        </Paper>
                    </div>
                )
            })}
        </div>
    )
};

async function deleteHandler(userId, purchaseId) {
    const newDoc = await apiHandler("DELETE", {id: userId, uniqid: purchaseId});
    return newDoc;
};

export default Purchases;