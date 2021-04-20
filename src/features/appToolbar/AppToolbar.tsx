import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppProgress from './appProgress'
import AppInfo from './appInfo'
import { useSelector } from 'react-redux';
import { selecFilename } from '../appMain/appMainSlice';
import AppSelector from './appSelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    toolbar : {
      display:'flex',
      justifyContent:'space-between'
    },
    toolList : {
      display:'flex',
      alignItems:'center'
    }
  }),
);

export default function AppToolbar() {
  const classes = useStyles();
  const filename = useSelector(selecFilename)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap>
              SNPs and Me { filename.length > 0  ? `[${filename}]` : ''}
            </Typography>
          <div className={classes.toolList}>
            <AppSelector/>
            <AppInfo/>
            <AppProgress/>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}