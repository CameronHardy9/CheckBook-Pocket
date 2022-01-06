import {Link, Outlet} from 'react-router-dom';

function Purchases() {
    return(
        <>
            <h1>Purchases</h1>
            <Link to=":itemId">Item</Link>
            <Outlet />
        </>
    )
}

export default Purchases;