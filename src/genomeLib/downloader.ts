import fetch from 'node-fetch'

export type ProcessCallback = ( error : string | null,  data : Buffer | null, url : string) => void

export interface IDownloader {
    download(urls : string [], callBack : ProcessCallback) : Promise <void>
}

interface IFetchedData { 
    error : string | null,  
    data : Buffer | null, 
    index : number, 
    url : string 
}
  

export default class Downloader  implements IDownloader{

    private nDownloaders : number

    constructor( numParallel : number ) {
        this.nDownloaders = numParallel
    }

    async download( urls :  string [],  callBack : ProcessCallback) :  Promise<void> {

        urls = [...urls] // clone the array.
        let nDownloads = Math.min(urls.length, this.nDownloaders)

        // the start array
        let promises = Array(nDownloads).fill(new Promise<void>((res)=>res())).map((v,index)=>{
            let url = urls.pop()
            return this.safeFetch(url!,index)
        })
        let indexes = Array(nDownloads).fill(0).map((v,i)=>i) // holds the list of index of promises

        while(promises.length > 0 ){
            let res = await Promise.race(promises)
            callBack( res.error, res.data, res.url )
            if( urls.length > 0  ){
                // launch a new fetch
                let url = urls.pop()
                promises[res.index] =  this.safeFetch(url!, res.index) // reuse
            } else {
                // here is a workaround, since we need to identify the promise
                // which is fullfilled and remove it. Its index value might not be longer
                // valid since other promises have been removed
                let resIndex = indexes.findIndex((v)=>v===res.index)
                promises.splice(resIndex, 1) 
                indexes.splice(resIndex,1)
            }
        }
    }


    
    private async safeFetch( url : string, index : number ) : Promise<IFetchedData>{
        let out : IFetchedData= { error : null, data : null, index, url }
        try {
            let ret = await fetch(url)
            out.data = await ret.buffer()
        } catch( ex ){
            out. error = ex.toString()
        }
        return out
    }


}