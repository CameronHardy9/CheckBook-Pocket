import BudgetVisual from "./BudgetVisual";

function Home(props) {
    return (
        <>
            <BudgetVisual
                value={
                    (props.currBud / props.setBud) * 100
                }
            />
        </>
    );
}

export default Home;
