import React, {useState, useCallback, useEffect} from 'react'
import  { useDropzone } from "react-dropzone"
import { FileWithPath } from "file-selector";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography';
import SnpTable from './appTable'
import { useDispatch } from 'react-redux';
import { setFilename, setPage } from './appMainSlice';
import { useGA4React } from 'ga-4-react';

const useStyles = makeStyles((theme) => ({
    root: {
            width:'100%',
            height:'100%',
            padding:'4px'
        },
        drop :{
            width:'100%',
            height:'100%',
            borderWidth:'2px',
            borderStyle: 'dotted',
            borderColor: theme.palette.primary.light,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            "&:hover": {
                borderColor: theme.palette.primary.dark
              },
            "& .AddIcn" :{
                fontSize:80,
                color: theme.palette.primary.light
            },
            "&:hover .AddIcn" :{
                fontSize:80,
                color: theme.palette.primary.dark
            },
            "& .text" :{
            textAlign:'center',
            color:theme.palette.primary.light 
            },
            "&:hover .text" :{
                textAlign:'center',
                color:theme.palette.primary.dark 
            }
        },
        noDisplay : {
            display:'none'
        }
    }))

    export default function AppMain(){
        const classes = useStyles();
        const [text, setText] = useState<string|null>(null)
        const [error, setError] = useState<string|null>(null)
        const dispatch = useDispatch()
        const ga = useGA4React()

        useEffect(()=>{
            if( ga ) ga.pageview('main')
        },[]) // eslint-disable-line  -- ga not added on purpose

        const onDrop = useCallback(async (files: FileWithPath[]) =>  {
            let list = files.filter((file)=>file.path && (file.path.toLowerCase().endsWith('.txt')||file.path.toLowerCase().indexOf('.23andme.')>0))
            if( list.length > 0 ) {
                let file = list[0]
                let data = await readFile(file)
                if( sanityCheck(data)){
                    setText(data)
                    dispatch(setFilename(file.name))
                    dispatch(setPage(0))
                    if(ga) ga.event('Valid File Load', 'valid file', '')
                } else {
                    setText(null)
                    setError(`${file.name} is not valid`)
                    if(ga) ga.event('Invalid File Content', 'invalid file content', '')
                }
            } else {
                setText(null)
                setError(`unable to load ${files[0].name}`)
                if(ga) ga.event('Invalid File Type', 'invalid file type', '')
            }
        }, [setText, dispatch]) // eslint-disable-line  -- ga not added on purpose

        const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    
        return (
            <div className={classes.root}>
                    <div {...getRootProps()} className={classes.root}>
                            <div className={ isDragActive ? classes.drop : classes.noDisplay}>
                                <ArrowDownwardIcon className="AddIcn"/>
                                <Typography className="text">Drop the file here.</Typography>
                            </div> 
                            {
                                text !== null ?
                                <>
                                    <SnpTable data={text}/>
                                </> :
                                <div className={isDragActive ? classes.noDisplay : classes.drop}>
                                    <input {...getInputProps()} />
                                    <AddIcon className="AddIcn"/>
                                    {
                                        error !== null ?
                                        <>
                                            <Typography className="text">🖐 {error}</Typography>
                                        </> :
                                        <></>
                                    }   
                                    <>
                                        <Typography className="text">Drag and Drop here your 23andme txt file.</Typography>
                                        <Typography className="text">or click here to select the file.</Typography>
                                    </>
                                </div> 
                            }
                    </div>
            </div>
        )
    }

    async function readFile ( file : FileWithPath ) : Promise<string> {
        return new Promise((res)=>{
            let reader = new FileReader()
            reader.onloadend = ()=> res(reader.result as string)
            reader.readAsText(file)
        })
    }

    // Sanity check that the file is a valid
    // 23andme SNP file.
    const key1 = "This data file generated by 23andMe"
    const key2 = "# rsid	chromosome	position	genotype"
    function sanityCheck(data:string) : boolean {
        return data.indexOf(key1) > 0 && data.indexOf(key2) > 0
    }
