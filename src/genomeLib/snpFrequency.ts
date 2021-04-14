import FrequencyParser, { PopulationFrequency } from './frequencyParser'


export interface Frequency {
    maj : string,
    freq: number,
    min : string
}
export interface Frequencies {
    chr : string,
    pub : string,
    European? : Frequency,
    African?  : Frequency,
    EAsian?   : Frequency,
    SAsian?   : Frequency
}

const studies = ["ALFA","1000Genomes"]

export default class SnpFrequency {

    private parser : FrequencyParser

    constructor() {
        this.parser = new FrequencyParser( studies)
    }

    Calculate( text : string ) : Frequencies  {
        let pf = this.parser.parseFrequencies(text)
        return {
            chr : this.parser.parseChromosome(text),
            pub : this.parser.parsePublications(text),
            European : this.select(pf, "European", "Europe"),
            African  : this.select(pf, "African", "African"),
            EAsian   : this.select(pf, "Asian", "East Asian"),
            SAsian   : this.select(pf, "South Asian", "South Asian")
        }
    }

    private select (pf : PopulationFrequency [][], key1: string, key2 : string ) : Frequency | undefined {
        let freq = this.search(pf[0],key1)
        if( !freq ) freq = this.search(pf[1],key2)
        return freq;
    }

    private search(pf : PopulationFrequency [], key : string ) : Frequency | undefined {
        let ret = undefined
        let el =  pf.find((v)=>v.population===key)
        if( el ){
            let hasValues = el.altFreq > 0 || el.refFreq > 0
            if( hasValues ){ 
                if( el.refFreq > el.altFreq ){
                    ret = {
                        maj : el.refAllele,
                        freq: el.refFreq,
                        min : el.altAllele
                    }
                } else {
                    ret = {
                        maj : el.altAllele,
                        freq: el.altFreq,
                        min : el.refAllele
                    }
                }
            }
        }
        return ret
    }
}