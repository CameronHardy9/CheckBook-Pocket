import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../utils/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Button from '@mui/material/Button';

const app = initializeApp(firebaseConfig);

function Login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        auth: undefined,
        email: undefined,
        password: undefined
    })

    const [newOrExisting, setNewOrExisting] = useState(undefined);

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
        <>
            {newOrExisting === undefined && (
                <div style={styles.main}>
                    <h1>Checkbook Pocket</h1>
                    <div style={styles.buttonGroup}>
                        <Button sx={styles.button} onClick={() => {
                            setTimeout(() => {
                                setNewOrExisting("New");
                            }, 500)
                        }}>New User</Button>
                        <Button sx={styles.button} onClick={() => {
                            setTimeout(() => {
                                setNewOrExisting("Existing");
                            }, 500)
                        }}>Existing User</Button>
                    </div>
                </div>
            )}
            {
                newOrExisting && (
                    <>
                        <h1>{newOrExisting} User</h1>
                        <span>Email</span>
                        <input type="email" onBlur={(i) => {
                            setLoginData({...loginData,
                            email: i.target.value})
                        }}/>
                        <span>Password</span>
                        <input type="password" onBlur={(i) => {
                            setLoginData({...loginData,
                            password: i.target.value})
                        }}/>
                        <span style={{color: 'red'}}>{errorMessage}</span>
                        <button onClick={() => {
                            if(newOrExisting === "New") {
                                createUserWithEmailAndPassword(loginData.auth, loginData.email, loginData.password)
                                .then((userCredential) => {
                                    // Signed in 
                                    signIn(userCredential.user);
                                })
                                .catch((error) => {
                                    handleError(error.code.split('/')[1].replaceAll('-', ' '));
                                });
                            } else if(newOrExisting === "Existing") {
                                signInWithEmailAndPassword(loginData.auth, loginData.email, loginData.password)
                                    .then((userCredential) => {
                                        // Signed in 
                                        signIn(userCredential.user);
                                    })
                                    .catch((error) => {
                                        handleError(error.code.split('/')[1].replaceAll('-',' '));
                                    });
                            }
                        }}>Submit</button>
                        <button onClick={() => {
                            setNewOrExisting(undefined);
                        }}>Back</button>
                    </>
                )
            }    
        </>
    )
}

export default Login;

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    button: {
        width: '100vw',
        padding: '20px 0px'
    }
}