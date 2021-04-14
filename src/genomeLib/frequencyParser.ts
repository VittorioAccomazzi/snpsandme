

export interface PopulationFrequency {
    population : string,
    refAllele : string,
    refFreq : number,
    altAllele : string,
    altFreq : number
}

export const UnknownChromosome : string  = "UN"
export default class FrequencyParser { 

    private studies : string []

    constructor ( studies : string [] ){
        this.studies = studies
    }

    parseFrequencies ( text : string ) : PopulationFrequency [][]  {
        let list : PopulationFrequency [][] = []
        let items = text.split("\n")

        this.studies.forEach( study =>{
            let subList : PopulationFrequency [] = []
            items.forEach( item =>{
                if( item.startsWith(study)){
                    try {
                        let sf = this.parseLine(item)
                        subList.push(sf)
                    } catch ( ex ){
                        console.error( `unable to parse line [${item}] because of [${ex}]`)
                    }

                }
            })
            list.push(subList)
        })

        return list
    }

    parseChromosome( text : string ) : string {
        const start="#Position\tchr"
        let chr : string  = UnknownChromosome
        let index = text.indexOf(start)
        if( index > 0 ){
            chr = text.substr(index+start.length,2)
            chr = chr.replace(":","")
        }
        return chr
    }

    parsePublications( text : string ) : string {
        const start="#Publications\t"
        const pubLen = 2
        let pub="00"
        let index = text.indexOf(start)
        if( index > 0 ){
            pub = text.substr(index+start.length,pubLen)
            pub = pub.replace("\t","")
            pub = pub.replace(" ","")
            if(  isNaN(Number.parseInt(pub))) pub="00"
            pub = "0".repeat(pubLen-pub.length)+pub
        }
        return pub
    }

    private parseLine ( line : string ) : PopulationFrequency {
        let items = line.split("\t").map(v=>v.trim())
        let population = items[1]
        if( items.length < 6 ) throw new Error(`invalid string ${line}`)
        let { allele : refAllele, frequency : refFreq } = this.parseAlleles(items[4])
        let { allele : altAllele, frequency : altFreq } = this.parseAlleles(items[5])
        return { population, refAllele, refFreq, altAllele, altFreq}
    }

    private parseAlleles( item : string ) : { allele : string, frequency: number }{
        let alleles = item.split(",")
                        .map(v=>v.trim())
                        .map(v=>this.parseAllele(v))
        // in case of multiple ones, returns the one with highst frequency
        return alleles.reduce((max,val)=>max.frequency > val.frequency ? max : val, alleles[0])
    }

    private parseAllele( item : string ) : { allele : string, frequency: number } {
        let items = item.split("=")
        if( items.length !== 2 || Number.isNaN(Number(items[1]))) throw new Error(`invalid string ${item}`)
        let allele= items[0]
        let frequency = Number.parseFloat(items[1])
        return { allele, frequency }
    }
}