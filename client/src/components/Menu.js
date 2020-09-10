import React from 'react';
import { MenuList, MenuItem } from '@material-ui/core';

function Menu(props) {
    const backupButtonHandler = () => {
        props.onSelectMenu("backup");
    };
    const restoreButtonHandler = () => {
        props.onSelectMenu("remove");
    };
    const searchButtonHandler = () => {
        props.onSelectMenu("search");
    };
    const logoutButtonHandler = () => {
      props.onSelectMenu("logout");
    };

  return (
    <MenuList>
            <MenuItem onClick={backupButtonHandler}>Backup</MenuItem>
            <MenuItem onClick={restoreButtonHandler}>Remove</MenuItem>
            <MenuItem onClick={searchButtonHandler}>Search</MenuItem>
            <MenuItem onClick={logoutButtonHandler}>Logout</MenuItem>
    </MenuList>
  );
}

export default Menu;
