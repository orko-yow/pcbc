import React, {useState } from 'react';
import { Grid, Button, Typography, TextField } from '@material-ui/core';
import { login } from "../helpers/Auth";

function AuthenticationPage(props) {
	const [userName, setUserName] = useState("");
	const [secret, setSecret] = useState("");

	const loginButtonHandler = async () => {
		if (userName && secret) {
			let loginSuccess = await login(userName, secret);
			if (loginSuccess === true) {
				props.loginHandler(loginSuccess);
			} else {
				alert("Try again!");
				setSecret("");
			}				
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={8}>
				<Grid container>
    		    	<Grid item xs={2}>
            			<Typography>Username:</Typography>
          			</Grid>
          			<Grid item>
              			<TextField value= {userName} onChange={(event) => setUserName(event.target.value)} />
          			</Grid>
        		</Grid>
			</Grid>
			<Grid item xs={4}></Grid>
			<Grid item xs={8}>
				<Grid container>
    		    	<Grid item xs={2}>
            			<Typography>Secret:</Typography>
          			</Grid>
          			<Grid item>
              			<TextField type="password" value= {secret} onChange={(event) => setSecret(event.target.value)} />
          			</Grid>
        		</Grid>
			</Grid>
			<Grid container alignItems="flex-end" justify="flex-start" direction="row">
				<Button onClick={loginButtonHandler} color="primary" variant="contained">
                	Login
              	</Button>
			</Grid>
		</Grid>);
}

export default AuthenticationPage;