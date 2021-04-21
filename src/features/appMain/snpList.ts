import ForegroundWorker from './appWorker/fWorker'
import {defaultSortField, defaultSortOrder, SortDirection, TableHeaderSortType, SnpEl} from './appMainSlice'
import {PopulationType} from '../../genomeLib/frequencyEvaluator'
import { SnpVal } from './appWorker/bWorker'
import Snps ,{snp} from '../../genomeLib/snps'

export type Update = (list :SnpEl[] ) => void

const sortFunctions = {
    ID : sortByID,
    Chromosome : sortByChr,
    Base : sortByBase,
    Frequency : sortByPerc,
    Publications : sortByPub
}

export default class SnpList {

    private worker : ForegroundWorker | null = null
    private update : Update
    private list : SnpEl [] = []
    private sortId : TableHeaderSortType = defaultSortField
    private sortDir: SortDirection = defaultSortOrder

    constructor( update : Update ) {
        this.update = update
    }

    start( data : string, type : PopulationType  ){
        if( this.worker ) this.worker.stop()
        const progress = ( vals : SnpVal[] )=>{
            this.merge(vals)
            if( this.sortId === 'Frequency' || this.sortId === 'Publications')  this.doSort()
            this.sendUpdate()
        }
        let list = new Snps(data,["Y","MT"])
        this.list= list.snpList.map(v=>this.toSnpEl(v))
        this.doSort()
        this.worker = new ForegroundWorker(progress)
        this.worker.start(list.snpList, type)
    }

    sort( id : TableHeaderSortType, dir : SortDirection ){
        this.sortId = id
        this.sortDir= dir
        this.doSort()
        this.sendUpdate()
    }

    private doSort() {
        let d  = this.sortDir === 'asc' ? 1 : -1
        this.list = this.list.sort((a,b)=>d*sortFunctions[this.sortId](a.val,b.val))
    }

    private sendUpdate(){
        let clone = this.list.map(e=>({done:e.done, val: {...e.val}})) //  deep clone
        this.update(clone)
    }

    private merge(vals : SnpVal []) {
        this.list.forEach( el =>{
            if( !el.done ){
                let val = vals.find(v=>el.val.snp.id === v.snp.id)
                if( val ){
                    el.done = true
                    el.val.perc = val.perc
                    el.val.pub = val.pub
                }
            }
        })
    }

    private toSnpEl( s : snp ) : SnpEl {
        return {
            val : {
                snp: s,
                perc : null,
                pub : 0
            },
            done : false
        }
    }
}

function sortByID( a : SnpVal, b : SnpVal ): number {
    let v1 = parseInt(a.snp.id.substr(2))
    let v2 = parseInt(b.snp.id.substr(2))
    return  v1-v2
}

function sortByChr( a : SnpVal, b : SnpVal ) : number {
    return sortByTextField(a,b,'chr')
}

function sortByBase(a : SnpVal, b : SnpVal ) : number {
    return sortByTextField(a,b,'bases')
}

function sortByTextField(a : SnpVal, b : SnpVal, type : keyof snp) : number {
    let v1 = a.snp[type]
    let v2 = b.snp[type]
    return  v1>v2 ? 1 : -1
}

function sortByPerc(a : SnpVal, b : SnpVal ) : number {
    let v1 = a.perc ?? 2
    let v2 = b.perc ?? 2
    return v1-v2
}

function sortByPub(a : SnpVal, b : SnpVal ) : number {
    return  a.pub-b.pub
}

