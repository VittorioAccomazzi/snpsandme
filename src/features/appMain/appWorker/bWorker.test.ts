import BackgroundWorker, {SnpVal} from './bWorker'

const tests : SnpVal [] =[ // notice this relies on the actual cached values.
    {
        snp : {
            bases : 'T',
            chr : 'Y',
            id : 'rs2534636'
        },
        perc : 0.11,
        pub :2
    },
    {
        snp : {
            bases : 'G',
            chr : 'Y',
            id : 'rs2032658'
        },
        perc : 0.58,
        pub :3
    },
    {
        snp : {
            bases : 'T',
            chr : 'Y',
            id : 'rs17307070'
        },
        perc : 0.63,
        pub :1
    },
    {
        snp : {
            bases : 'A',
            chr : 'Y',
            id : 'rs9786326'
        },
        perc : 1.00,
        pub :0
    },
    {
        snp : {
            bases : 'A',
            chr : 'MT',
            id : 'rs28591518'
        },
        perc : 1.00,
        pub :0
    },
    {
        snp : {
            bases : 'A',
            chr : 'MT',
            id : 'rs28713729'
        },
        perc : null,
        pub :0
    }
]

test('Shall report correct values', async()=>{
    let cWorker = new BackgroundWorker( 'European')
    let dWorker = new BackgroundWorker( 'European')
    await testsRun(cWorker, tests)
    await testsRun(dWorker, tests)
})

test('shall invoke return with null values not in the cache', async ()=>{

    let tests2 = [...tests]
    const noCache =    {
        snp : {
            bases : 'A', // Notice this might change in the future.
            chr : '1',    // actual values are in https://www.ncbi.nlm.nih.gov/snp/rs2045332#frequency_tab
            id : 'rs2045332'
        },
        perc : null,
        pub :0
    }
    tests2.push(noCache)
    let cWorker = new BackgroundWorker('European')
    await testsRun(cWorker,tests2)
})


async function testsRun(worker: BackgroundWorker, testList : SnpVal [] ) {
    let snps = testList.map((v) => v.snp)
    worker.start(snps)
    let nReceived = 0
    let  results : SnpVal []= []
    do {
        results = await worker.Next()
        nReceived += results.length
        results.forEach(result => {
            let expected = testList.find((v) => v.snp.id === result.snp.id)!
            expect(result.snp).toStrictEqual(expected.snp)
            expect(result.pub).toBe(expected.pub)
            if (expected.perc) {
                expect(result.perc).not.toBeNull()
                expect(result.perc).toBeCloseTo(expected.perc, 2)
            } else {
                expect(result.perc).toBeNull()
            }
        })
    } while( results.length > 0 )
    expect(nReceived).toBe(testList.length)
}
