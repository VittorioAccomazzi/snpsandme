import { IDownloader } from './downloader'
import FrequencyDownloader from './frequencyDownloder'
import { Frequencies, Frequency } from './snpFrequency'
import FrequencyCache from './frequencyCache'
import { snp } from './snps'

export type ProgressCallback = ( snpId : string, perc : number | null, pub : number ) => void
export type PopulationType = 'European' | 'African' | 'EAsian' |  'SAsian' 

interface EvalResult {
    perc : number | null, // frequency of the aminoacid
    pub : number // number of publications.
}  

export default class FrequencyEvaluator extends FrequencyDownloader {

    private type : PopulationType
    private cache? : FrequencyCache
    private noFetch? : boolean

    constructor( type : PopulationType, cache? : FrequencyCache, noFetch? : boolean ){
        super()
        this.type = type
        this.cache= cache
        this.noFetch = noFetch
    }

    async evaluate( snps : snp [], downloader : IDownloader, callBack : ProgressCallback ){
        let remaining = this.cacheEvaluator(snps, callBack)
        if( this.noFetch ){
            this.returnUnknown(remaining, callBack)
        } else {
            await this.downloderEvaluator(remaining, callBack, downloader)
        }
    }

    private cacheEvaluator(snps : snp [], callBack: ProgressCallback ) : snp [] {
        let remaining : snp [] = snps
        if( this.cache ){
            remaining = []
            snps.forEach(snp=>{
                let freq = this.cache!.getFrequency(snp.id)
                if( freq != null ){
                    let {perc, pub} = this.evaluatePercentage(freq, snp)
                    callBack(snp.id, perc, pub)
                } else {
                    remaining.push(snp)
                }
            })
        }
        return remaining
    }

    private async downloderEvaluator(snps: snp[], callBack: ProgressCallback, downloader: IDownloader) {
        const process = (snpid: string, freq: Frequencies | null) => {
            let perc : number | null = null
            let pub : number =0
            if (freq != null) {
                ({perc, pub} = this.evaluatePercentage(freq, snps.find(v => v.id === snpid)!))
            }
            callBack(snpid, perc, pub)
        }
        await this.download(snps.map(v=>v.id), downloader, process)
    }

    private evaluatePercentage(freq: Frequencies, s: snp): EvalResult {
        let perc =null
        let pub = parseInt(freq.pub)
        if( freq.chr === s.chr){
            let val = freq[this.type]
            if( val ){
                let probs : number [] = s.bases.split("").map(base=>this.basePercentage(base,val!))
                perc = Math.min(...probs)
            }
        } 
        return  {perc,pub}
    }

    private basePercentage(base: string, freq: Frequency ): number {
        let prob =0
        if( base === freq.maj ) prob = freq.freq
        if( base === freq.min ) prob = 1.0-freq.freq
        return prob
    }

    private returnUnknown(remaining: snp[], callBack: ProgressCallback) {
        remaining.forEach(val =>callBack(val.id, null, 0))
    }

}


