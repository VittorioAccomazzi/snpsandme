import React, {useState}  from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {isMobile} from 'react-device-detect';

const localStorageKey="SnpsAndMeHelpReadStatus";
const localStorageValue = "Read";

const MapHelp = ()=>{
    let [open,setOpen] = useState<boolean>(!getReadHelpStatus());

    const onClose = () =>{
        setOpen(false);
    }

    const onDismiss = ()=>{
        onClose();
        setReadHelpStatus()
    }

    return (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='lg'
    >
        <DialogTitle id="alert-dialog-title">{"SNPs and Me"}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Drag and drop your 23andme file and the browser will color code the part of the genome (called <a href='https://en.wikipedia.org/wiki/Single-nucleotide_polymorphism'>SNP</a>) based on their frequency.
            You will be able to find the part which are <i>rare among the population</i> and so the ones which make you <i>unique</i> !<br/><br/>
            Click on the SNP ID to find out information about it from the <a href="https://www.ncbi.nlm.nih.gov/">National Center for Biochnology Information</a>.
            </DialogContentText>
            {
                !isMobile && (
                    <DialogContentText id="alert-dialog-description" align='center' >
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/lUS8Q2-EbyY" title="Snp and me" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </DialogContentText>
                )
            }
            <DialogContentText id="alert-dialog-description">
                <b>🖐 Privacy Statement:</b> this application <u><i>does not</i></u> store nor transmit your genomic information. All the analysis is done locally in your browser.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={onClose} color="primary">
            close
        </Button>
        <Button onClick={onDismiss} color="primary" autoFocus>
            dismiss forever
        </Button>
     </DialogActions> 
      </Dialog>);
}
export default MapHelp;

function getReadHelpStatus(){
    let isRead = false
    try {
        let value = localStorage.getItem(localStorageKey);
        if( value ){
            isRead = (value===localStorageValue);
        }
    } catch {
        // ignore
    }
    return isRead
}

function setReadHelpStatus(){
    try {
        localStorage.setItem(localStorageKey,localStorageValue);
    } catch {
        // ignore
    }

}
