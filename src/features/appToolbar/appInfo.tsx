import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { lowThreshold, selectSnps } from '../appMain/appMainSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      marginRight: theme.spacing(2),
    }
  }),
);

export default function AppInfo() {
  const classes = useStyles();
  const snps    = useSelector(selectSnps)
  let hPerc=0
  let lPerc=0
  let nPerc=0

  snps.list.forEach( snp => snp.val.perc ? ( snp.val.perc < lowThreshold ? lPerc ++ : hPerc++ ) : nPerc++ )
  let total = hPerc+lPerc+nPerc
  return (
    <Typography variant="caption" color='secondary' className={classes.text}>
      { total > 0 ?
          `${total} Snps, ${lPerc} low frequency` :
          ''
      }
    </Typography>

  );
}