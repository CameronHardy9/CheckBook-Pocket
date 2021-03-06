import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../utils/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import apiHandler from '../utils/apiHandler';

const app = initializeApp(firebaseConfig);

function Login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        auth: undefined,
        email: undefined,
        password: undefined
    })

    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
        const cache = JSON.parse(window.localStorage.getItem('checkbook_pocket'));
        if(cache?.uid) {
            navigate(`/${cache.uid}`);
        }

        const auth = getAuth(app);
        setLoginData({...loginData,
            auth: auth});
    },[])

    function handleError(message) {
        setErrorMessage(`Error: ${message}`);
        setTimeout(() => {
            setErrorMessage(undefined);
        }, 3000)
    }

    function signIn(user) {
        window.localStorage.setItem('checkbook_pocket', JSON.stringify(user));
        navigate(`/${user.uid}`);
    }

    return (
        <div style={styles.main}>
            <h1 style={{padding: "20px"}}>Checkbook Pocket</h1>
            <Stack direction='column' sx={{flexGrow: 1, marginTop: '15vh'}} spacing={2}>
                    <TextField
                        required
                        error={errorMessage}
                        id="email"
                        label="Email"
                        type="email"
                        defaultValue=""
                        helperText={""}
                        sx={styles.field}
                        onChange={(e) => {
                            setLoginData({...loginData,
                            email: e.target.value})
                        }}
                    />
                    <TextField
                        required
                        error={errorMessage}
                        id="password"
                        label="Password"
                        type="password"
                        defaultValue=""
                        helperText={errorMessage || " "}
                        sx={styles.field}
                        onChange={(e) => {
                            setLoginData({...loginData,
                            password: e.target.value})
                        }}
                    />
                <Button onClick={() => {
                    signInWithEmailAndPassword(loginData.auth, loginData.email, loginData.password)
                    .then((userCredential) => {
                        // Signed in 
                        signIn(userCredential.user);
                    })
                    .catch((error) => {
                        handleError(error.code.split('/')[1].replaceAll('-',' '));
                    });
                }}>Sign In</Button>
                <Button onClick={() => {
                        createUserWithEmailAndPassword(loginData.auth, loginData.email, loginData.password)
                        .then(async (userCredential) => {
                            // Signed in & add user to DB
                            await apiHandler('POST', {id: userCredential.user.uid});
                            signIn(userCredential.user);
                        })
                        .catch((error) => {
                            handleError(error.code.split('/')[1].replaceAll('-', ' '));
                        });
                    }}>Create Account</Button>
            </Stack>
        </div>
    )
}

export default Login;

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1
    },
    field: {
        width: '70vw',
        maxWidth: '300px' 
    }
}