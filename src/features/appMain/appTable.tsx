import React, { useCallback, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableContainer, TablePagination } from "@material-ui/core";
import ForegroundWorker from './appWorker/fWorker'
import { setSnps, selectSnps, selecPopulation, TableHeaderSortType, SortDirection, setLoading, selectPaging, setPage, setRowPerPage } from "./appMainSlice";
import { useDispatch, useSelector } from "react-redux";
import AppTableHeader from './appTableHeader'
import AppTableBody from './appTableBody'
import { useGA4React } from "ga-4-react";
import { SnpVal } from "./appWorker/bWorker";

const useStyles = makeStyles((theme) => ({
    table: {
        width:"100%"
      },
      container: {
      },
      pagination : {
          width:"100%"
      }
}))

// need to use this mode for usign function calc
const containerStyle = {maxHeight: 'calc(100% - 3em)'}

interface AppTableProps { data : string }


export default function AppTable({ data } : AppTableProps) {
    const classes = useStyles()
    let worker = useRef<ForegroundWorker|null>(null)
    const dispatch= useDispatch();
    const snps = useSelector(selectSnps)
    const type = useSelector(selecPopulation)
    const page = useSelector(selectPaging)
    const ga = useGA4React()

    useEffect(()=>{
        const update = (list : SnpVal [] ) =>{
            dispatch(setSnps(list))
            dispatch(setLoading(false))
        }
        if(!worker.current) worker.current = new ForegroundWorker(update)
        dispatch(setLoading(true))
        worker.current.Evaluate(data,type)
    },[data, dispatch,type])


    const onSort = useCallback( ( id : TableHeaderSortType, dir : SortDirection) =>{
        if( worker.current ) worker.current.sort(id, dir )
        if(ga) ga.event('Data Sort', id, '')
    },[ga])

    const handleChangePage = useCallback( ( event : unknown, newPage : number)=>{
        dispatch(setPage(newPage))
    },[dispatch])

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
        dispatch(setRowPerPage(+event.target.value))
    },[dispatch])

    return (
        <>
            <TableContainer component={Paper} className={classes.container} style={containerStyle}>
                <Table className={classes.table} size="small" stickyHeader aria-label="simple table">
                    <AppTableHeader sort={onSort}/>
                    <AppTableBody list={snps.list}/>
                </Table>
            </TableContainer>
            <TablePagination
                className={classes.pagination}
                rowsPerPageOptions={[50, 100, 200, 500]}
                component="div"
                count={snps.list.length}
                rowsPerPage={page.rowPerPage}
                page={page.page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
