import React  from "react";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import { midColor, lowColor, midThreshold, lowThreshold, SnpEl, noColor, unkColor, higColor } from "../appMain/appMainSlice";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
     undefined :{
        background: unkColor,
      },
      novalue : {
        background: noColor,
      },
      high : {
        background: higColor,
      },
      mid : {
        background: midColor,        
      },
      low : {
        background: lowColor,        
      }
}))

interface SnpsTableBodyProps { list : SnpEl [] }

export default function AppTableBody( { list } : SnpsTableBodyProps) {
    const classes = useStyles();
    const classSelector = ( el : SnpEl ) : string => {
        let val = classes.undefined
        if( el.done ){
            if( el.val.perc !== null ){
                val = classes.high
                if( el.val.perc < midThreshold ) val = classes.mid
                if( el.val.perc < lowThreshold ) val = classes.low
    
            } else {
                val = classes.novalue
            }
        }
        return val
    }
    return (
        <TableBody>
        {list.map((el) => (
          <TableRow key={el.val.snp.id} className={classSelector(el)}>
            <TableCell component="th" scope="row"><a  target='_blank' href={`https://www.ncbi.nlm.nih.gov/snp/${el.val.snp.id}`} rel="noreferrer">{el.val.snp.id}</a></TableCell>
            <TableCell align="right">{el.val.snp.chr}</TableCell>
            <TableCell align="right">{el.val.snp.bases}</TableCell>
            <TableCell align="right">{el.val.perc !== null ? el.val.perc.toFixed(2) : "-"}</TableCell>
            <TableCell align="right">{el.val.pub} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
}