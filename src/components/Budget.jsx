import Stack from '@mui/material/Stack';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexGrow: 1
    },
    div: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h2: {
        fontWeight: 300,
        fontSize: '40px'
    },
    span: {
        fontWeight: 100,
        fontSize: '50px'
    }
}

function Budget(props) {
    return(
        <div style={styles.container}>
            <Stack spacing={10}>
                <div style={styles.div}>
                    <h2 style={styles.h2}>Set Budget</h2>
                    <span style={styles.span}>${props.setBud}</span>
                </div>
                <div style={styles.div}>    
                    <h2 style={styles.h2}>Remaining Budget</h2>
                    <span style={styles.span}>${props.currBud}</span>
                </div>
            </Stack>
        </div>
    )
}

export default Budget;