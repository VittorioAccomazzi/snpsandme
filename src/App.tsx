import React from "react";
import {
  createMuiTheme,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import {
  MuiThemeProvider,
  CssBaseline,
  Hidden,
} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import AppMain from  './features/appMain/appMain';
import AppToolbar from './features/appToolbar/appToolbar'
import AppVersion from './features/appVersion/appVersion'
import AppHelp from './features/appHelp/appHelp'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#fff"
    },
    background: {
      default: "#fff"
    }
  }
});

const styles: (theme: Theme) => StyleRules<string> = theme =>
  createStyles({
    app: {
      textAlign: "center" 
    },
    main :{
      position:'absolute',
      top:'55px',
      right: '0px',
      left:'0px',
      bottom: '0px',
      background : 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

type AppProps = {} & WithStyles<typeof styles>;

const App = ({ classes }: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <div className={classes.app}>
      <AppToolbar/>
      <div className={classes.main}>
        <AppMain />
      </div>
      <Hidden smDown >
        <AppVersion label="version : " forkme={false} baseURL="https://github.com/VittorioAccomazzi/snpsandme" />
      </Hidden>
      <AppHelp/>
    </div>
  </MuiThemeProvider>
);

export default withStyles(styles)(App);
