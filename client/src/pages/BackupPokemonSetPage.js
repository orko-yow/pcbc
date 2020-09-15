import React, { useState } from 'react';
import { Grid, Button, MenuItem, Select, Typography } from '@material-ui/core';
import {createBackups} from "../helpers/API";

// hard coded set list:
const setMap = [{"code":"base1"},{"code":"base2"},{"code":"basep"},{"code":"base3"},{"code":"base4"},{"code":"base5"},{"code":"gym1"},{"code":"gym2"},{"code":"neo1"},{"code":"neo2"},{"code":"si1"},{"code":"neo3"},{"code":"neo4"},{"code":"base6"},{"code":"ecard1"},{"code":"ecard2"},{"code":"ecard3"},{"code":"ex1"},{"code":"ex2"},{"code":"ex3"},{"code":"np"},{"code":"ex4"},{"code":"ex5"},{"code":"pop1"},{"code":"ex6"},{"code":"ex7"},{"code":"ex8"},{"code":"ex9"},{"code":"pop2"},{"code":"ex10"},{"code":"ex11"},{"code":"ex12"},{"code":"pop3"},{"code":"ex13"},{"code":"pop4"},{"code":"ex14"},{"code":"ex15"},{"code":"ex16"},{"code":"pop5"},{"code":"dpp"},{"code":"dp1"},{"code":"dp2"},{"code":"pop6"},{"code":"dp3"},{"code":"dp4"},{"code":"pop7"},{"code":"dp5"},{"code":"dp6"},{"code":"pop8"},{"code":"dp7"},{"code":"pl1"},{"code":"pop9"},{"code":"pl2"},{"code":"pl3"},{"code":"pl4"},{"code":"ru1"},{"code":"hgss1"},{"code":"hsp"},{"code":"hgss2"},{"code":"hgss3"},{"code":"hgss4"},{"code":"col1"},{"code":"bwp"},{"code":"bw1"},{"code":"bw2"},{"code":"bw3"},{"code":"bw4"},{"code":"bw5"},{"code":"bw6"},{"code":"dv1"},{"code":"bw7"},{"code":"bw8"},{"code":"bw9"},{"code":"bw10"},{"code":"xyp"},{"code":"bw11"},{"code":"xy0"},{"code":"xy1"},{"code":"xy2"},{"code":"xy3"},{"code":"xy4"},{"code":"xy5"},{"code":"dc1"},{"code":"xy6"},{"code":"xy7"},{"code":"xy8"},{"code":"xy9"},{"code":"g1"},{"code":"xy10"},{"code":"xy11"},{"code":"xy12"},{"code":"smp"},{"code":"sm1"},{"code":"sm2"},{"code":"sm3"},{"code":"sm35"},{"code":"sm4"},{"code":"sm5"},{"code":"sm6"},{"code":"sm7"},{"code":"sm75"},{"code":"sm8"},{"code":"sm9"},{"code":"det1"},{"code":"sm10"},{"code":"sm11"},{"code":"sm115"},{"code":"sma"},{"code":"sm12"},{"code":"swsh1"},{"code":"swsh2"},{"code":"swsh3"}];

function CreateBackupPage(props) {
	const [selectedSet, setSelectedSet] = useState("");

  	const searchTypeHandler = (currentSet) => {
    	if(currentSet) {
      		setSelectedSet(currentSet);
    	}
  	};

	const handleBackup = async () => {
    	if(selectedSet) {
			let result = await createBackups(selectedSet, props.token);
			props.addBackupHandler();
			alert("Backup completed!");
    	}
	}
	
  	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h4">Backup Your Pokemon Cards!</Typography>
			</Grid>
				
			<Grid item xs={12}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Typography>
							Select the set you want to backup:
						</Typography>
					</Grid>
					<Grid item>
						<Select variant="outlined"
							onChange={event=> searchTypeHandler(event.target.value)}
							value={selectedSet}>
							{setMap.map((setCode) => (<MenuItem value={setCode.code} key={setCode.code}>{setCode.code}</MenuItem>))}
						</Select>
					</Grid>
					<Grid item>
						<Button onClick={handleBackup} color="primary" variant="contained">Backup!</Button>
					</Grid>
				</Grid>
			</Grid>
	  	</Grid>
  	);
}

export default CreateBackupPage;
