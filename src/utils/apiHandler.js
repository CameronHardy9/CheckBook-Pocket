async function apiHandler (method, body) {
    let string = "";

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
        let response = await fetch(`https://family-budget-app-server.herokuapp.com/api/${body.id}/${string}`, {
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