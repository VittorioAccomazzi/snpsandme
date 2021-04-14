import { IDownloader } from './downloader'
import FrequencyDownloader from './frequencyDownloder'
import { Frequencies, Frequency } from './snpFrequency'
import FrequencyCache from './frequencyCache'
import { snp } from './snps'

export type ProgressCallback = ( snpId : string, freq : number | null ) => void
export type PopulationType = 'European' | 'African' | 'EAsian' |  'SAsian'   

export default class FrequencyEvaluator extends FrequencyDownloader {

    private type : PopulationType
    private cache? : FrequencyCache

    constructor( type : PopulationType, cache? : FrequencyCache ){
        super()
        this.type = type
        this.cache= cache
    }

    async evaluate( snps : snp [], downloader : IDownloader, callBack : ProgressCallback ){
        let remaining = this.cacheEvaluator(snps, callBack)
        await this.downloderEvaluator(remaining, callBack, downloader)
    }

    private cacheEvaluator(snps : snp [], callBack: ProgressCallback ) : snp [] {
        let remaining : snp [] = snps
        if( this.cache ){
            remaining = []
            snps.forEach(snp=>{
                let freq = this.cache!.getFrequency(snp.id)
                if( freq != null ){
                    let prob = this.evaluateProbability(freq, snp)
                    callBack(snp.id, prob)
                } else {
                    remaining.push(snp)
                }
            })
        }
        return remaining
    }

    private async downloderEvaluator(snps: snp[], callBack: ProgressCallback, downloader: IDownloader) {
        const process = (snpid: string, freq: Frequencies | null) => {
            let prob = null
            if (freq != null) {
                prob = this.evaluateProbability(freq, snps.find(v => v.id === snpid)!)
            }
            callBack(snpid, prob)
        }
        await this.download(snps.map(v=>v.id), downloader, process)
    }

    private evaluateProbability(freq: Frequencies, s: snp): number | null {
        let prob =null
        if( freq.chr === s.chr){
            let val = freq[this.type]
            if( val ){
                let probs : number [] = s.bases.split("").map(base=>this.baseProbabiliy(base,val!))
                prob = Math.min(...probs)
            }
        } 
        return prob
    }

    private baseProbabiliy(base: string, freq: Frequency ): number {
        let prob =0
        if( base === freq.maj ) prob = freq.freq
        if( base === freq.min ) prob = 1.0-freq.freq
        return prob
    }

}