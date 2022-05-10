async function apiHandler (method, body) {
    let string = "";

    // TODO: Add route for generating new user profile
    if(method === "POST" && body.id) {
        string = "";
    }

    if(method === "PUT" && body.store && body.amount && body.date) {
        string = `add/${body.store}/${body.amount}/${body.date}`;
    }

    if(method === "PUT" && body.budget) {
        string = `budget/${body.budget}`;
    }

    if(method === "DELETE") {
        string = `delete/${body.uniqid}`;
    }

    try {
        // Live endpoint - https://family-budget-app-server.herokuapp.com/api/
        let response = await fetch(`http://localhost:8080/api/${body.id}/${string}`, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            method: method
        })
        let data = await response.json();
        return data;
    }
    catch (e){
        console.error(e);
    }
    
}

export default apiHandler;