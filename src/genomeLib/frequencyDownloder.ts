import {IDownloader} from './downloader'
import SnpFrequency, { Frequencies } from './snpFrequency'
import {snp} from './snps'
 
export type ProcessCallback = ( snpId : string, freq : Frequencies | null ) => void

const baseURL = 'https://www.ncbi.nlm.nih.gov/snp/{SNP}/download/frequency'
const snpKey = "{SNP}"

export default abstract class FrequencyDownloader {

    protected async download( snps : string [], downloader : IDownloader, callBack : ProcessCallback ){
        let snpFrequency = new SnpFrequency()
        let urls = snps.map(v=>baseURL.replace(snpKey,v))
        let snpStartIndex = baseURL.indexOf(snpKey)
        let snpEndText = baseURL.substr(snpStartIndex+snpKey.length)
        const process = ( error : string | null , data : Buffer | null, url:string ) => { // tslint:disable-line
            let snpid = url.substr(snpStartIndex).replace(snpEndText,'')
            let freq : Frequencies | null = null
            if( data ){
                let text = data.toString()
                freq = snpFrequency.Calculate(text)
            }
            callBack(snpid, freq )
        }
        await downloader.download(urls, process)
    }

}