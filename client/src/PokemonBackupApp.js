import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Menu from "./components/Menu";
import AuthenticationPage from "./pages/AuthenticationPage";
import BackupPage from "./pages/BackupPokemonSetPage";
import RemovePage from "./pages/RemoveBackupPage";
import SearchPage from "./pages/SearchCardsPage";
import ZeroStatePage from "./pages/ZeroStatePage";
import { getAllBackups } from "./helpers/API";
import { logout, checkIsLoggedIn } from "./helpers/Auth";

const useStyles = makeStyles({
    root: {
      border: 0,
      borderRadius: 3,
      padding: '20px 30px',
    }
});

function BackupCx() {
    const classes = useStyles();
    const [currentAction, setCurrentAction] = useState(null);
    const [backups, setBackups] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());

    useEffect(()=> {
        if(isLoggedIn === true && backups === null) {
            refreshBackups();
        }
      });

    const buttonHandler = (action) => {
        setCurrentAction(action);
        if (currentAction === "logout") {
            logout();
            setIsLoggedIn(false);
        }
    };

    const refreshBackups = async () => {
        if (isLoggedIn === true) {
            let allBackups = await getAllBackups();
            setBackups(allBackups);                
        }
    };

    const displayContent = () => {
        if (!isLoggedIn) {
            return (<AuthenticationPage loginHandler={setIsLoggedIn}></AuthenticationPage>);
        } else {
            if(currentAction === "backup") {
                return (<BackupPage addBackupHandler={refreshBackups}></BackupPage>);
            } else if(currentAction === "remove") {
                return (<RemovePage backups={backups} removeBackupHandler={refreshBackups}></RemovePage>);
            } else if(currentAction === "search") {
                return (<SearchPage></SearchPage>);
            } else {
                return (<ZeroStatePage></ZeroStatePage>);
            }    
        }
    }
    return (
        <Grid container className={classes.root} spacing={1} direction="column">
            <Grid item>
                <Grid container>
                </Grid>
                <Grid container>
                    <Grid item xs={2}>
                        {isLoggedIn === true && (<Menu onSelectMenu={buttonHandler}></Menu>)}
                    </Grid>
                    <Grid item xs={10}>
                        {displayContent()}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
  );
}

export default BackupCx;
