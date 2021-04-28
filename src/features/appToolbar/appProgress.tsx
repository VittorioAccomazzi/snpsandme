import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoading, selectSnps } from '../appMain/appMainSlice'
import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconDisplay:{
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(4),
        color : 'white'
    },
    iconHidden:{
        display: 'none'
    }
  }),
);


export default function AppProgress() {
    const classes = useStyles();
    const snps    = useSelector(selectSnps)
    const loading = useSelector(selectLoading)
    const showProgres = loading
    const showIcon = !loading && snps.list.length > 0
    return(
        <>
            <Box position="relative" display="inline-flex">
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                <HourglassFullIcon className={ showProgres ? classes.iconDisplay : classes.iconHidden} fontSize='large' />
                <CheckCircleRoundedIcon className={ showIcon ? classes.iconDisplay : classes.iconHidden} fontSize='large' />
                </Box>
            </Box>
        </>
    )
}





