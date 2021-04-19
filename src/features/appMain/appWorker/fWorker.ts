/* eslint-disable import/no-webpack-loader-syntax */
import comlinkWorker from 'comlink-loader!./bWorker'
import BackgroundWorker, {BackWorkerClassConstructors, SnpVal} from './bWorker'
import { PopulationType } from '../../../genomeLib/frequencyEvaluator'
import { snp } from '../../../genomeLib/snps'


const BackWorkerFactory = new comlinkWorker<BackWorkerClassConstructors>()

export type Progress = (values : SnpVal[] ) => void

 interface IDataQuery {
     snps : snp [],
     type  : PopulationType
 }
 const Timer = 200 // in ms
/**
 * Foreground worker class. This class is designed to work  on the UI Javascript thread
 */
export default class ForegroundWorker {

    private worker : BackgroundWorker | null = null // null when no computation is occurring
    private data : IDataQuery | null = null // null when no comptation is reqested
    private timerID : number | null= null // null when not defined.
    private progress : Progress

    constructor( progress : Progress ){
        this.progress = progress
    }

    async start( snps : snp[], type : PopulationType ) : Promise<void> {
        if( this.worker ) throw Error(`foreground worked invoked while processing.`)
        this.data = { snps, type }
        this.worker = await new BackWorkerFactory.default(this.data.type)
        this.worker.start(this.data.snps)
        this.startWorker()
    }

    stop(){
        if( this.timerID ) window.clearTimeout( this.timerID )
        this.timerID = null
        this.data = null
    }

    private async startWorker() : Promise<void> {

        this.worker!.start(this.data!.snps)

        const doWork = async ()=> {
            if( this.data && this.worker ){
                this.timerID = null
                let res = await this.worker.Next()
                if( this.data && this.worker ){ // need to re test becase ight have changed in the await above.
                    if( res.length > 0 ){
                        this.progress(res)
                        this.timerID = window.setTimeout(doWork, Timer)
                    } else {
                        this.worker = null // we have completed.
                        console.log('Completly Done...')
                    }
                }
            }
        }

        doWork()
    }

}