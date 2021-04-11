import * as fs from 'fs'


export interface snp {  // tslint:disable-line
    id : string,
    chr: string, 
    bases : string
}

export default class SNPs {  // tslint:disable-line

    private list : snp []

    constructor ( text : string, chrs? : string[] ){
        this.list = []
        let lines = text.split('\n')
        lines.forEach((line)=>{
            if( line.startsWith("rs")) {
                let items = line.split("\t").map((v)=>v.trim())
                if( items.length === 4 ){
                    let chr = items[1].toUpperCase()
                    if( chrs === undefined || chrs.findIndex(v=>v===chr) >=0  ){
                        if( items[3].match(/[AGCT]/) && !Number.isNaN(Number(items[2]))){
                            this.list.push ({
                                id : items[0],
                                chr,
                                bases : items[3].toUpperCase()
                            })
                        }
                    }
                }
            }
        })
    }

    get snpList() : snp [] {
        return this.list
    }

    snpChromosome(chr:string) : snp [] {
        chr = chr.trim().toUpperCase()
        return this.list.filter((v)=>v.chr===chr)
    }

    static async fromFile( file : string ) : Promise<SNPs> {
        if ( fs.existsSync(file)){
            return new Promise((res,rej)=>{
                fs.readFile(file, {}, (err, data)=>{
                    if( err ) rej(err)
                    let obj = new SNPs(data.toString())
                    res(obj)
                })
            })
        } else {
            throw new Error(`file ${file} noy found!`)
        }
    }


}