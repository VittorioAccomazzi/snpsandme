import React  from "react";
import { TableBody, TableCell, TableRow } from "@material-ui/core";
import { midColor, lowColor, midThreshold, lowThreshold, noColor, unkColor, higColor, selectPaging } from "../appMain/appMainSlice";
import { makeStyles } from '@material-ui/core/styles';
import { SnpVal } from "./appWorker/bWorker";
import { useSelector } from "react-redux";

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

interface SnpsTableBodyProps { list : SnpVal [] }

export default function AppTableBody( { list } : SnpsTableBodyProps) {
    const classes = useStyles();
    const page = useSelector(selectPaging)
    const classSelector = ( el : SnpVal ) : string => {
        let val = classes.undefined
        if( el.perc !== null ){
            val = classes.high
            if( el.perc < midThreshold ) val = classes.mid
            if( el.perc < lowThreshold ) val = classes.low

        } else {
            val = classes.novalue
        }
        return val
    }

    return (
        <TableBody>
        {list.filter((v,i)=> i>= page.page * page.rowPerPage && i<(page.page+1)*page.rowPerPage).map((el) => (
          <TableRow key={el.snp.id} className={classSelector(el)}>
            <TableCell component="th" scope="row"><a  target='_blank' href={`https://www.ncbi.nlm.nih.gov/snp/${el.snp.id}`} rel="noreferrer">{el.snp.id}</a></TableCell>
            <TableCell align="right">{el.snp.chr}</TableCell>
            <TableCell align="right">{el.snp.bases}</TableCell>
            <TableCell align="right">{el.perc !== null ? el.perc.toFixed(2) : "-"}</TableCell>
            <TableCell align="right">{el.pub} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
}