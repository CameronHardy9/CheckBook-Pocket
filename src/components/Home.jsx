import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import BudgetVisual from './BudgetVisual';

function Home(props) {
    const navigate = useNavigate();
    const [setBud, setSetBud] = useState(props.setBud);
    const [currBud, setCurrBud] = useState(props.currBud);
    const [calc, setCalc] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setCalc((currBud / setBud) * 100)
        }, 250)
    }, [])

    return (
    <>
        <BudgetVisual value={calc <= 0 ? 0 : calc} />
    </>
    )
}

export default Home;