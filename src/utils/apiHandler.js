async function apiHandler (method, body) {
    let string = "";

    if(method === "POST" && body.id) {
        string = "";
    }

    if(method === "PUT" && body.body) {
        string = "purchases";
    }

    if(method === "PUT" && body.store && body.amount && body.date) {
        string = `add/${body.store}/${body.amount}/${body.date}`;
    }

    if(method === "PUT" && body.budget) {
        string = `budget/${body.budget}`;
    }

    if(method === "DELETE" && body.uniqid) {
        string = `delete/${body.uniqid}`;
    }

    if(method === "DELETE" && body.confirmation === true) {
        string = 'deleteAll';
    }

    try {
        let response = await fetch(`https://family-budget-app-server.herokuapp.com/api/${body.id}/${string}`, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            method: method,
            body: JSON.stringify(body?.body)
        })
        let data = await response.json();
        return data;
    }
    catch (e){
        console.error(e);
    }
    
}

export default apiHandler;