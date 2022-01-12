import {Routes, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import apiHandler from './utils/apiHandler';
import Purchases from './components/Purchases';
import Item from './components/Item';
import Budget from './components/Budget';
import Home from './components/Home';
import Nav from './components/Nav';
import calcBudget from './utils/calcBudget';

function App() {
    const params = useParams();
    const [userObject, setUserObject] = useState(undefined);
    

    useEffect(() => {
        console.log("effect")
        if (params.id){
            (async () => {
                const response = await apiHandler("GET", {id: params.id});
                setUserObject(response);
            })()
        }
    },[])

    const updateUserObject = (data) => {
        if(data.budget && data.purchases) {
            setUserObject(data);
        }
    }

    return(
        <>
            {!!userObject ? (
                <>
                    <Nav budget={calcBudget(userObject.budget, userObject.purchases)}/>
                    <Routes>
                        <Route path="/" element={<Home setBud={userObject.budget} currBud={calcBudget(userObject.budget, userObject.purchases)} />} />
                        <Route path="budget" element={<Budget setBud={userObject.budget} currBud={calcBudget(userObject.budget, userObject.purchases)} />}/>
                        <Route path="purchases" element={<Purchases purchases={userObject.purchases} />}>
                            <Route path=":itemId" element={<Item />} />
                        </Route>
                    </Routes>
                </>
            ):(
                <div className="loaderContainer">
                    <div className="squareLoader"></div>
                </div>
            )}
        </>
    );
}

export default App;