import {Routes, Route, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import apiHandler from './utils/apiHandler';
import Purchases from './components/Purchases';
import Budget from './components/Budget';
import Home from './components/Home';
import {TopNav, BottomNavHome, BottomNavBudget, BottomNavPurchases} from './components/Nav';
import calcBudget from './utils/calcBudget';

function App() {
    const params = useParams();
    const navigate = useNavigate();
    const [userObject, setUserObject] = useState(undefined);
    const [path, setPath] = useState(document.URL.split('/').reverse()[0]);

    useEffect(() => {
        const cache = JSON.parse(window.localStorage.getItem('checkbook_pocket'));
        if (cache?.uid === undefined) {
            navigate('/');
            return;
        }

        if (params.id){
            (async () => {
                const response = await apiHandler("GET", {id: params.id});
                setUserObject(response);
            })()
        }
    },[params.id, navigate])

    const updateUserObject = (data) => {
        if(data.budget && data.purchases) {
            setUserObject(data);
        }
    }

    const updatePath = (path) => {
        setPath(path);
    }

    return(
        <>
            {!!userObject ? (
                <>
                    <TopNav budget={calcBudget(userObject.budget, userObject.purchases)} updatePath={updatePath} />
                    <Routes>
                        <Route path="/" element={<Home setBud={userObject.budget} currBud={calcBudget(userObject.budget, userObject.purchases)} />} />
                        <Route path="budget" element={<Budget setBud={userObject.budget} currBud={calcBudget(userObject.budget, userObject.purchases)} />}/>
                        <Route path="purchases" element={<Purchases userObject={userObject} updateUserObject={updateUserObject} />} />
                    </Routes>
                    {(() => {
                        switch(true) {
                        case path === "budget": 
                            return <BottomNavBudget updatePath={updatePath} updateUserObject={updateUserObject} />
                        case path === "purchases": 
                            return <BottomNavPurchases updatePath={updatePath} updateUserObject={updateUserObject} />
                        default:
                            return <BottomNavHome updatePath={updatePath} />
                    }})()}
                </>
            ):(
                <div className="loaderContainer">
                    <div className="squareLoader"></div>
                </div>
            )}
        </>
    );
};

export default App;