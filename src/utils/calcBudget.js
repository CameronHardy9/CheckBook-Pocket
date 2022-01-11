function calcBudget(budget, purchases) {
    const selectedBudget = budget;
    let spending = 0;

    purchases.forEach((item) => {
        spending += item.amount;
    })

    return (selectedBudget - spending).toFixed(2);
}

export default calcBudget;