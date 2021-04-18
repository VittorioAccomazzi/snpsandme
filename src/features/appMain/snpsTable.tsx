import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Snps ,{snp} from '../../genomeLib/snps'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import ForegroundWorker from './appWorker/fWorker'
import { SnpVal } from "./appWorker/bWorker";

const useStyles = makeStyles((theme) => ({
    table: {
        width:"100%"
      },
      container: {
      },
      header :{
          background:"#FAFAFA",
          fontWeight: "bold"
      }
}))

// need to use this mode for usign function calc
const containerStyle = {maxHeight: 'calc(100% - 2em)'}

type TableHeaderSortType = 'ID' | 'Chromosome' | 'Base' | 'Frequency' | 'Publications' 
type AlignType = 'left' | 'right'
type SortDirection = 'asc' | 'desc'
type OnListSort = ( id : TableHeaderSortType, dir : SortDirection ) => void
interface TableHeader {
    id : TableHeaderSortType,
    align : AlignType
    text : string
}
const sortFunctions = {
    ID : sortByID,
    Chromosome : sortByChr,
    Base : sortByBase,
    Frequency : sortByPerc,
    Publications : sortByPub
}

interface snpsTableProps { data : string }

export default function SnpsTable({ data } : snpsTableProps) {
    const classes = useStyles();
    const [snps, setSnps] = useState<SnpVal[]>([])
    let worker = useRef<ForegroundWorker|null>(null)

    useEffect(()=>{
        let list = new Snps(data,["Y","MT"])
        let snps = list.snpList.map((s)=>toSnpVal(s)).sort((a,b)=>sortFunctions.ID(a,b,'asc'))
        setSnps(snps)
        const progress = ( snpsVal : SnpVal[], total : number, done : number )=>{
            snpsVal.forEach((v)=>updateValues(v, snps))
            setSnps([...snps])
        }
        if( worker.current ) worker.current.stop()
        worker.current = new ForegroundWorker(progress)
        worker.current.start(snps.map(s=>toSnp(s)), 'European')
    },[data])

    const onSort = ( id : TableHeaderSortType, dir : SortDirection) =>{
        let list = snps.sort((a,b)=>sortFunctions[id](a,b,dir))
        setSnps([...list])
    }

    return (
            <TableContainer component={Paper} className={classes.container} style={containerStyle}>
                <Table className={classes.table} size="small" stickyHeader aria-label="simple table">
                    <SnpsTableHead sort={onSort}/>
                    <SnpsTableBody list={snps}/>
                </Table>
            </TableContainer>
    )
}

function sortByID( a : SnpVal, b : SnpVal, dir : SortDirection ): number {
    let v1 = parseInt(a.snp.id.substr(2))
    let v2 = parseInt(b.snp.id.substr(2))
    return  dir === 'asc' ? v1-v2 : v2-v1
}

function sortByChr( a : SnpVal, b : SnpVal, dir : SortDirection) : number {
    return sortByTextField(a,b,dir,'chr')
}

function sortByBase(a : SnpVal, b : SnpVal, dir : SortDirection) : number {
    return sortByTextField(a,b,dir,'bases')
}

function sortByTextField(a : SnpVal, b : SnpVal, dir : SortDirection, type : keyof snp) : number {
    let v1 = a.snp[type]
    let v2 = b.snp[type]
    let d  = dir === 'asc' ? 1 : -1
    return d *( v1>v2 ? 1 : -1)
}

function sortByPerc(a : SnpVal, b : SnpVal, dir : SortDirection) : number {
    return sortByNullNumber(a,b,dir,'perc')
}

function sortByPub(a : SnpVal, b : SnpVal, dir : SortDirection) : number {
    return sortByNullNumber(a,b,dir,'pub')
}

function sortByNullNumber(a : SnpVal, b : SnpVal, dir : SortDirection, type : keyof SnpVal) : number {
    let v1 = a[type] ?? 0
    let v2 = b[type] ?? 0
    let d  = dir === 'asc' ? 1 : -1
    return d *( v1>v2 ? 1 : -1)
}

function toSnpVal( s : snp ) : SnpVal {
    return {
        snp: s,
        perc : null,
        pub : 0
    }
}

function toSnp ( s: SnpVal) : snp {
    return s.snp
}

function updateValues(v: SnpVal, snps: SnpVal[]): void {
    let val = snps.find(s => s.snp.id === v.snp.id)
    val!.perc = v.perc
    val!.pub  = v.pub
}

const TableHeaders : TableHeader [] = [
    {
        id : 'ID',
        align : 'left',
        text : "SNP id"
    },
    {
        id : 'Chromosome',
        align : 'right',
        text : 'Chromosome'
    },
    {
        id : 'Base',
        align : 'right',
        text : 'Base'
    },
    {
        id : 'Frequency',
        align : 'right',
        text : 'Frequency'
    },
    {
        id : 'Publications',
        align :'right',
        text : 'Publications'
    }
]

interface SnpsTableHeadProps {sort : OnListSort }

function SnpsTableHead ({sort} : SnpsTableHeadProps) {
    const classes = useStyles();
    const [orderBy, setOrderBy] = useState<TableHeaderSortType>('ID')
    const [direction, setDirection] = useState<SortDirection>('asc')
    const onClick = (id : TableHeaderSortType) => {
        let dir : SortDirection = 'asc'
        if( orderBy === id ){
            dir = direction === 'asc' ? 'desc' : 'asc'
        } 
        setOrderBy(id)
        setDirection(dir)
        sort(id, dir)
    }
    return(
        <TableHead>
        <TableRow>
            {
                TableHeaders.map(header=>(
                    <TableCell align={header.align}  className={classes.header} key={header.id}>
                        <TableSortLabel
                            active={orderBy===header.id}
                            direction={direction}
                            onClick={()=>onClick(header.id)}
                            >
                            {header.text}
                        </TableSortLabel>
                    </TableCell>
                ))
            }
        </TableRow>
      </TableHead>
    )
}

interface SnpsTableBodyProps { list : SnpVal [] }

function SnpsTableBody( { list } : SnpsTableBodyProps) {
    return (
        <TableBody>
        {list.map((el) => (
          <TableRow key={el.snp.id}>
            <TableCell component="th" scope="row"><a  target='_blank' href={`https://www.ncbi.nlm.nih.gov/snp/${el.snp.id}`} rel="noreferrer">{el.snp.id}</a></TableCell>
            <TableCell align="right">{el.snp.chr}</TableCell>
            <TableCell align="right">{el.snp.bases}</TableCell>
            <TableCell align="right">{el.perc ? el.perc.toFixed(2) : "-"}</TableCell>
            <TableCell align="right">{el.perc ? el.pub : "-"} </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
}


