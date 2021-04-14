import FrequencyCache from '../genomeLib/frequencyCache'
import * as fs from 'fs'
import Downloader from '../genomeLib/downloader'

const snpsList='./src/tools/snpsList.txt'
const numParallel=6
const outFile = 'src/tools/cache.json'

function LoadList(filepath:string) : string [] {
    let items = fs.readFileSync(filepath).toString()
        .split("\n")
        .map(v=>v.trim().toLowerCase())
        .filter((val,idx,arr)=>arr.indexOf(val)===idx) // unique only
    return items
}

async function processCache(){
    if( !fs.existsSync(snpsList)) throw Error(`❌ file ${snpsList} not found !`)
    let list = LoadList(snpsList)
    let fc = new FrequencyCache()
    let start = Date.now()
    const progress = (nDone : number, nTotal : number )=>{
      let elapsed = Date.now()-start
      if( elapsed > 0 ){
        let timeEl = elapsed/nDone
        let remaning= (nTotal-nDone) * timeEl
        let perc = 100*nDone/nTotal
        process.stdout.write(` ${perc.toFixed(0)}% (${nDone}/${nTotal}) done, ${Math.ceil(remaning/(60*1000))} min remaining \r`)
      }
    }
    let downloader = new Downloader(numParallel)
    await fc.downloadCache(list, downloader, progress )
    await fc.save(outFile)
} 


processCache()