import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

function Budget(props) {
    const navigate = useNavigate();
    const [currBud, setCurrBud] = useState(props.currBud);
    const [setBud, setSetBud] = useState(props.setBud);

    return(
        <>
            <h2>${setBud}</h2>
            <h2>${currBud}</h2>
        </>
    )
}

export default Budget;