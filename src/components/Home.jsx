import {useState, useEffect} from 'react';
import BudgetVisual from './BudgetVisual';

function Home(props) {
    const [calc, setCalc] = useState(0)

    useEffect(() => {
        if (props.currBud > 0) {
            setTimeout(() => {
                setCalc((props.currBud / props.setBud) * 100)
            }, 250)
        }
    }, [props.currBud, props.setBud])

    return (
    <>
        <BudgetVisual value={calc <= 0 ? 0 : calc} />
    </>
    )
}

export default Home;