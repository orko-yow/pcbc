import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import RemoveBackupRow from "../components/RemoveBackupRow";

function RemoveBackupPage(props) {

    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
    
    const classes = useStyles();

    const onRemoveHandler = () => {
      props.removeBackupHandler();
    };
  const renderContent = () => {
    if (props.backups && props.backups.length > 0) {
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Time Created</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.backups.map((backup) => (
                <RemoveBackupRow
                  row={backup}
                  token={props.token}
                  backupRemoveHandler={onRemoveHandler}
                  key={backup.name}>
                </RemoveBackupRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return (<Typography>Sorry! Couldn't find any backup</Typography>);
    }
  }
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4">Remove Backups</Typography>
      </Grid>
      <Grid item xs={12}>
        {renderContent()}
      </Grid>
    </Grid>)
}

export default RemoveBackupPage;
