import { Button } from "reactstrap";
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
    <main className="homeMenu">
                    
        <Button className="button" outline size="lg" onClick={() => {
                navigate(`../budget`);
            }}
        >Budget</Button>
        <Button className="button" outline size="lg" onClick={() => {
                navigate(`../purchases`);
            }}
        >Purchases</Button>
    </main>)
}

export default Home;