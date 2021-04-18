import FrequencyEvaluator from '../../../genomeLib/frequencyEvaluator'
import FrequencyCache from '../../../genomeLib/frequencyCache'
import SnpCache from '../../../tools/cache.json'
import { PopulationType } from '../../../genomeLib/frequencyEvaluator'
import { snp } from '../../../genomeLib/snps'
import Downloder from '../../../genomeLib/downloader'
export type BackWorkerClassConstructors = { new (populationType : PopulationType): BackgroundWorker }

const numChunk = 24
const numDownload = 6
export interface SnpVal  {
    snp : snp,
    perc: number | null,
    pub : number
}

/**
 * background worker class. This class is designed to work on the background 
 * worker, which is a separate thread from the UI. Assuch doesn't have access 
 * to the DOM elements.
 */

export default class BackgroundWorker {

    private fEval: FrequencyEvaluator
    private snps : snp[]= []

    constructor( populationType : PopulationType ){
        let 
        cache = new FrequencyCache()
        cache.load(SnpCache as [string,string][] )
        this.fEval = new FrequencyEvaluator(populationType,cache,true)
    }

    start(snps : snp[] ) : void {
        this.snps = [...snps]
    }

    async Next( ) : Promise<SnpVal[]> {
        let proc = this.snps.splice(0,numChunk)
        let res : SnpVal [] = []
        if( proc.length > 0 ){
            let downloader = new Downloder(numDownload)
            const progress = (snpId : string, perc : number | null, pub:  number) =>{
                let snp = proc.find(v=>v.id===snpId)!
                res.push({snp,perc,pub})
            }
            await this.fEval.evaluate(proc,downloader,progress)
        }
        return res
    }

}