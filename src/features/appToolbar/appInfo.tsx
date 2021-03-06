import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { midColor, lowColor, midThreshold, lowThreshold, noColor, higColor, selectSnps, selectLoading } from "../appMain/appMainSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginRight: theme.spacing(2),
    },
    boxHidden :{
      display : 'none'
    },
    boxDisplay :{
      display : 'inline-flex'
    }
  }),
);

export default function AppInfo() {
  const classes = useStyles();
  const snps    = useSelector(selectSnps)
  const loading = useSelector(selectLoading)
  let hPerc=0
  let mPerc=0
  let lPerc=0
  let uPerc=0

  const show = snps.list.length > 0 
  const total = loading ? "-----" : snps.list.length.toString() 

  snps.list.forEach( snp => 
    snp.perc !== null ? (snp.perc < lowThreshold ? lPerc++ : ( snp.perc < midThreshold ? mPerc++ : hPerc++)) : uPerc++  )

  const values = [lPerc, mPerc, hPerc, uPerc]   
  const perc = toPersentages( values )
  const colors = [lowColor, midColor, higColor, noColor]
  const numLow = loading ? "--" : lPerc.toString()

  return (

    <Box position="relative" className={show ? classes.boxDisplay : classes.boxHidden}>
      <Typography align='center' variant="caption" color='secondary' className={classes.margin} noWrap> {`${total} Snps, ${numLow} low frequency`}</Typography>
      <Box
          top={20}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          className={classes.margin}
      >
        {
          perc.map((el,index)=>(
            <div style={{background: colors[index], position:'relative', width: el, height:'5px'}} key={index}/>
          ))
        }
      </Box>
    </Box>

  );
}

function toPersentages(values : number [] ) : string [] {
  let ret : string [] = []
  let sum = values.reduce((s,v)=>s+v,0)
  if( sum > 0 ){
    let per = values.map(v=>Math.floor(100*v/sum))
    let err = 100 - per.reduce((s,v)=>s+v,0) // error in roundinng. Must be positive
    per[per.length-1] += err // to make sure that rounds up to 100
    ret = per.map(v=>`${v}%`)
  }
  return ret
}