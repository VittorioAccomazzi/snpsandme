import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { selecPopulation as selectPopulation, setPopulation } from '../appMain/appMainSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MenuItem, TextField } from '@material-ui/core';
import { PopulationType } from '../../genomeLib/frequencyEvaluator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    combobox: {
      marginRight: theme.spacing(2),
      background: 'transparent'
    },
    textColor :{
        color : 'white',
        borderWidth: '1px',
        borderColor: 'white !important'
    },
    icon: {
        fill: 'white',
    },
  }),
);

export default function AppSelector() {
    const classes = useStyles();
    const type  = useSelector(selectPopulation)
    const dispatch = useDispatch()

    const options : string [] = ['European', "African", "East Asian", "South Asian"]
    const types : PopulationType[]   = ['European', 'African', 'SAsian', 'EAsian']
    const typeName= options[types.indexOf(type)]
    return (

        <TextField className={classes.combobox}  variant='outlined' size='small'
            select
            value={typeName}
            onChange={(e)=>{
                let val = types[options.indexOf(e.target.value ?? 'European')]
                dispatch(setPopulation(val))
            }}
            InputProps={{
                classes: {
                    root: classes.textColor,
                    notchedOutline: classes.textColor
                  }
            }}
            SelectProps={{
                classes: { icon: classes.icon },
              }}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}  >
                    {option}
                </MenuItem>
            ))}
      </TextField>
    )
}