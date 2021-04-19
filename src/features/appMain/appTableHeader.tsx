import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";

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

export type TableHeaderSortType = 'ID' | 'Chromosome' | 'Base' | 'Frequency' | 'Publications' 
export type SortDirection = 'asc' | 'desc'
type AlignType = 'left' | 'right'
type OnListSort = ( id : TableHeaderSortType, dir : SortDirection ) => void
interface TableHeader {
    id : TableHeaderSortType,
    align : AlignType
    text : string
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

export default function AppTableHeader ({sort} : SnpsTableHeadProps) {
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
