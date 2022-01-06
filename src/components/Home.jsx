import { Button } from "reactstrap";
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
    <>
                    
        <Button outline block onClick={() => {
                navigate(`../budget`);
            }}
        >Budget</Button>
        <Button outline block onClick={() => {
                navigate(`../purchases`);
            }}
        >Purchases</Button>
    </>)
}

export default Home;