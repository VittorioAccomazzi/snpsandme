/* eslint-disable import/no-webpack-loader-syntax */
import comlinkWorker from 'comlink-loader!./bWorker'
import BackgroundWorker, {BackWorkerClassConstructors, SnpVal} from './bWorker'
import {defaultSortField, defaultSortOrder, SortDirection, TableHeaderSortType} from '../appMainSlice'
import {PopulationType} from '../../../genomeLib/frequencyEvaluator'
import Snps ,{snp} from '../../../genomeLib/snps'

const BackWorkerFactory = new comlinkWorker<BackWorkerClassConstructors>()

export type Update = (list :SnpVal[] ) => void

const sortFunctions = {
    ID : sortByID,
    Chromosome : sortByChr,
    Base : sortByBase,
    Frequency : sortByPerc,
    Publications : sortByPub
}

export default class ForegroundWorker {

    private worker : BackgroundWorker | null = null
    private update : Update
    private list : SnpVal [] = []
    private sortId : TableHeaderSortType = defaultSortField
    private sortDir: SortDirection = defaultSortOrder

    constructor( update : Update ) {
        this.update = update
    }

    async Evaluate( data : string, type : PopulationType  ){
        this.worker = await new BackWorkerFactory.default(type)
        let list = new Snps(data,["Y","MT"])
        this.list= await this.worker.Evaluate(list.snpList)
        this.worker = null
        this.doSort()
        this.sendUpdate()
    }

    sort( id : TableHeaderSortType, dir : SortDirection ){
        this.sortId = id
        this.sortDir= dir
        this.doSort()
        this.sendUpdate()
    }

    private doSort() {
        let d  = this.sortDir === 'asc' ? 1 : -1
        this.list = this.list.sort((a,b)=>d*sortFunctions[this.sortId](a,b))
    }

    private sendUpdate(){
        let clone : SnpVal [] = this.list.map(e=>({...e})) //  deep clone
        this.update(clone)
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

