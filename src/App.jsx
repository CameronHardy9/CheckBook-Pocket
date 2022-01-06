import { Outlet, useNavigate, useParams } from "react-router";
import { Navbar, NavbarBrand, NavbarText } from "reactstrap";
import { useEffect, useState } from 'react';
import apiHandler from "./utils/apiHandler";
import calcBudget from "./utils/calcBudget";

function App() {
    const navigate = useNavigate();
    const params = useParams();
    const [userObject, setUserObject] = useState(undefined);

    useEffect(() => {
        console.log("effect")
        if (params.id){
            navigate('home');
            (async () => {
                const response = await apiHandler("GET", {id: params.id});
                setUserObject(response);
            })()
        }
    },[])

    return (
        <>
            {!!userObject ?
                (
                <>
                    <Navbar color="light" container="lg" fixed="" light>
                        <NavbarBrand href={`/${params.id}`}>
                            <span style={{ fontSize: "large", color: "black" }}>CheckBook</span>
                            <span style={{fontSize: "small", color: "gray", marginLeft: "2px",}}>pocket</span>
                        </NavbarBrand>
                        <NavbarText>{`$${calcBudget(userObject.budget, userObject.purchases)}`}</NavbarText>
                    </Navbar>
                    <Outlet/>
                </>
            ) : (
                <div className="loaderContainer">
                    <div className="squareLoader"></div>
                </div>
            )}
        </>
    )
}

export default App;