import React, { useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableContainer } from "@material-ui/core";
import SnpList from './snpList'
import { setSnps, selectSnps, SnpEl, selecPopulation } from "./appMainSlice";
import { useDispatch, useSelector } from "react-redux";
import AppTableHeader, { TableHeaderSortType, SortDirection } from './appTableHeader'
import AppTableBody from './appTableBody'

const useStyles = makeStyles((theme) => ({
    table: {
        width:"100%"
      },
      container: {
      }
}))

// need to use this mode for usign function calc
const containerStyle = {maxHeight: 'calc(100% - 2em)'}

interface snpsTableProps { data : string }


export default function AppTable({ data } : snpsTableProps) {
    const classes = useStyles()
    let worker = useRef<SnpList|null>(null)
    const dispatch= useDispatch();
    const snps = useSelector(selectSnps)
    const type = useSelector(selecPopulation)

    useEffect(()=>{
        const update = (list : SnpEl [] ) =>{
            dispatch(setSnps(list))
        }
        if(!worker.current) worker.current = new SnpList(update)
        worker.current.start(data,type)
    },[data, dispatch,type])


    const onSort = ( id : TableHeaderSortType, dir : SortDirection) =>{
        if( worker.current ) worker.current.sort(id, dir )
    }

    return (
            <TableContainer component={Paper} className={classes.container} style={containerStyle}>
                <Table className={classes.table} size="small" stickyHeader aria-label="simple table">
                    <AppTableHeader sort={onSort}/>
                    <AppTableBody list={snps.list}/>
                </Table>
            </TableContainer>
    )
}
