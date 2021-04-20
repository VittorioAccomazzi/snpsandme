import FrequencyDownloader from './frequencyDownloder'
import * as fs from 'fs'
import { IDownloader } from './downloader'
import { Frequencies, Frequency } from './snpFrequency'
import { PopulationType } from './frequencyEvaluator'
import { UnknownChromosome } from './frequencyParser'


const FrequencyItemLengh =6 // 2 bases + frequency in with 2 decimals 0.12
const PopulationTypes : PopulationType[] = ['European', 'African', 'EAsian','SAsian']
const UndefinedString : string = "------"
const ChromosomeLen : number = 2
const PublicationLen: number = 2

export type ProgressCallback = ( done : number, total : number ) => void

export default class FrequencyCache extends FrequencyDownloader {
    private cache : Map<string, string>

    constructor(){
        super()
        this.cache = new Map<string,string>()
    }

    load( cacheArray : [string, string][] ){
        this.cache = new Map<string,string>(cacheArray)
    }

    async save( file : string ) {
        let json = JSON.stringify(Array.from(this.cache.entries()))
        await this.saveSerialized(file,json)
    }

    async downloadCache(snps : string[], downloader : IDownloader, callBack : ProgressCallback  ){
        let missing = snps.filter(id=>!this.cache.has(id))
        let nDone = 0
        let process = (snpid : string, freq : Frequencies | null  )=>{
            nDone++
            try {
                let freqString = this.frequenciesToString(freq)
                this.cache.set(snpid,freqString)
                callBack(nDone, missing.length)
            } catch ( err ){
                console.error(`exception raised for ${snpid} and freqency ${freq ? JSON.stringify(freq, null, 1 ) : "null"}`)
            }
        }
        await this.download(missing, downloader, process)
    }

    getFrequency( snpid : string ) : Frequencies | null {
        let freq = null
        let freqString = this.cache.get(snpid)
        if( freqString !=  null ){
            freq = this.stringToFrequencies(freqString)
        }
        return freq
    }

    private stringToFrequencies(freqString: string): any {
        let chr = freqString.substr(0,ChromosomeLen)
        chr = chr.replace("-","")
        let pub = freqString.substr(ChromosomeLen, PublicationLen)
        let freq : Frequencies = { chr, pub }
        PopulationTypes.forEach((el,index) => {
            freq[el]=this.stringToFrequency(freqString.substr(PublicationLen+ChromosomeLen+index*FrequencyItemLengh,FrequencyItemLengh))
        });
        return freq
    }

    private stringToFrequency(freqString: string ) : Frequency | undefined {
        let res = undefined
        if( freqString !== UndefinedString ){
            res =  {
                maj : freqString.charAt(0),
                min : freqString.charAt(1),
                freq : Number.parseFloat(freqString.substr(2))
            }
        }
        return res
    }

    private frequenciesToString(freq: Frequencies | null) : string  {
        let res = UnknownChromosome+"00"+UndefinedString.repeat(PopulationTypes.length)
        if( freq!=null ){
            res = freq.chr.substr(0,ChromosomeLen) // at most 2 elements
            res += "-".repeat(ChromosomeLen-res.length)
            res += freq.pub
            res += PopulationTypes.reduce((res,val)=>res+this.frequencyToString(freq[val]),"")
        }
        return res
    }

    private frequencyToString( freq? : Frequency  ) : string {
        let res = UndefinedString
        if( freq != null  ){
            res = freq.maj+freq.min+freq.freq.toFixed(2)
            res += " ".repeat(FrequencyItemLengh-res.length)
        }
        return res
    }

    private saveSerialized(file: string, content: string) : Promise<void>{
        return new Promise((res,rej)=>{
           fs.writeFile(file,Buffer.from(content), (err)=>{
               if( err!= null ) rej(err)
               res()
           })
        })
   }
}