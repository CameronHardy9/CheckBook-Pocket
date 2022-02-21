function Budget(props) {
    return(
        <div style={{flexGrow: 1}}>
            <h2>${props.setBud}</h2>
            <h2>${props.currBud}</h2>
        </div>
    )
}

export default Budget;