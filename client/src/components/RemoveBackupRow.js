import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {removeBackup} from "../helpers/API";

function RemoveBackupRow(props) {

    const onRemoveHandler = async () => {
      await removeBackup(props.row.name, props.token);
      props.backupRemoveHandler();
    };
    
    return (
      <TableRow key={props.row.name}>
        <TableCell component="th" scope="row">{props.row.name}</TableCell>
        <TableCell align="right">{props.row.createdAt}</TableCell>
        <TableCell align="right" onClick = {onRemoveHandler}>Remove</TableCell>
      </TableRow>
    );
}

export default RemoveBackupRow;
