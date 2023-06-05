import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ClientRequest } from 'http';
import {useState } from 'react';
import Image from 'next/image';
import { alpha, styled } from '@mui/material/styles';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSetEmail = (emailText) => {
        setEmail(emailText.target.value)
    }
    const handleSetPassword = (passwordText) => {
        setPassword(passwordText.target.value)
    }

    const signUpHandler = async () => {
        try {
            const data = {email: email, password: password}
            await fetch('/api/volunteeraccounts', {
                method: "POST",
                body: JSON.stringify(data),
            });
        } catch (e) {
            console.error(e)
        }
    }

    return (
        // className="auth-bg" 
        <Grid2 container className="auth-bg" justifyContent="center" textAlign="center" direction="column"
            sx={{
                width: '100vw',
                height: '100vh',
            }}>
            <Grid2 sx={{
                marginTop: '25px',
                width: '100%',
                height: '25%',
            }}>
                <Image className="auth-logo" src="/logo-long.png" width={956*0.3} height={295*0.3} alt="ALP-logo" sx={{
                        marginBottom: "10 !important",
                }}/>
                <h2 className='auth-heading'> Volunteer Portal Login </h2>
            </Grid2>
            <Grid2>
                <Grid2 xs display="flex" justifyContent="center">
                    <Box
                        sx={{
                            width: 300,
                            height: 300,
                        }}>
                        <TextField fullWidth required id="email" label="Email" variant="outlined" 
                            value={email}
                            onChange={handleSetEmail}
                            sx={{
                                mt: 2,
                                mb: 2
                            }}/>
                        <TextField fullWidth 
                            required id="password" label="Password" variant="outlined" 
                            value={password} onChange={handleSetPassword}
                            sx={{
                                mt: 2,
                                mb: 2
                            }}/>
                        <Button variant="contained"
                            sx={{
                                marginTop: 3,
                            }}>Login</Button>
                        <Button variant="contained"
                            onClick={signUpHandler}
                            sx={{
                                marginTop: 3,
                                marginLeft: 3,
                            }}>Sign Up</Button>
                    </Box>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}

export default Login