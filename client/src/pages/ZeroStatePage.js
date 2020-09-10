import React from "react";
import { Grid, Typography} from '@material-ui/core';

function ZeroStatePage() {
	return (
		<Grid container spacing={5}>
			<Grid item xs={12}>
				<Typography variant="h4">Pokemon Cards Backup Center (PCBC)</Typography>
			</Grid>
			<Grid item>
				<Typography paragraph>Welcome to PCBC! Start by backing up a set of pokemon cards.</Typography>
				<Typography paragraph>Once you have stored some cards, you can search them or delete the entire backup.</Typography>
			</Grid>
		</Grid>);
}

export default ZeroStatePage;