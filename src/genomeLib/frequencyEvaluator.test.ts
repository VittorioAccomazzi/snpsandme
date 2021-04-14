import { IDownloader, ProcessCallback } from './downloader'
import FrequencyCache from './frequencyCache'
import FrequencyEvaluator, {
  PopulationType
} from './frequencyEvaluator'
import SNPs, { snp } from './snps'
import {
  DownloaderErrorMock,
  DownloaderMock,
  sampleGenomeFile
} from './test/testUtils'

const population: PopulationType = 'European'
const expectedResult = [
  {
    id: 'rs2123002',
    val: 0.38408
  },
  {
    id: 'rs77976294',
    val: 0.61592
  },
  {
    id: 'rs9302554',
    val: 0.38408
  },
  {
    id: 'rs2005345',
    val: 0.0
  }
]

test('Shall Evaluate freqency properly', async () => {
  let snps = await SNPs.fromFile(sampleGenomeFile)
  let chr16 = snps.snpChromosome('16')
  let downloader = new DownloaderMock()
  let nCallbacks = 0
  let nExpected = 0
  let progress = (id: string, freq: number | null) => {
    expect(freq).not.toBeNull()
    nCallbacks++
    let expRes = expectedResult.find(v => v.id === id)
    if (expRes != null) {
      nExpected++
      expect(expRes.val).toBe(freq)
    }
  }
  let freqEval = new FrequencyEvaluator(population)
  await freqEval.evaluate(chr16, downloader, progress)
  expect(nCallbacks).toBe(chr16.length)
  expect(nExpected).toBe(expectedResult.length)
})

test('Shall return null when data is not present', async () => {
  let snps = await SNPs.fromFile(sampleGenomeFile)
  let chr16 = snps.snpChromosome('16')
  let downloader = new DownloaderErrorMock()
  let nCallbacks = 0
  let progress = (id: string, freq: number | null) => {
    nCallbacks++
    if (id.startsWith('rs2') || id.startsWith('rs7')) {
      expect(freq).toBeNull()
    } else {
      expect(freq).not.toBeNull()
    }
  }
  let freqEval = new FrequencyEvaluator('African')
  await freqEval.evaluate(chr16, downloader, progress)
  expect(nCallbacks).toBe(chr16.length)
})

test('Shall use the cache properly', async () => {
  let snps = await SNPs.fromFile(sampleGenomeFile)
  let chr16 = snps.snpChromosome('16')

  // cache some of the snps
  let snpsCache = chr16.filter((v, i) => i < chr16.length / 2).map(v=>v.id) // half of the snps in chr16
  let cacheDownloader = new DownloaderErrorMock()
  let cache = new FrequencyCache()
  await cache.downloadCache(snpsCache, cacheDownloader, (i, j) => {}) // generate the cache
  expect(cacheDownloader.urls.length).toBe(snpsCache.length)

  // Evaluation
  let evalDownloader = new DownloaderErrorMock()
  let nCallbacks = 0
  let progress = (id: string, freq: number | null) => {
    nCallbacks++
    if (id.startsWith('rs2') || id.startsWith('rs7')) {
      expect(freq).toBeNull()
    } else {
      expect(freq).not.toBeNull()
    }
  }
  let freqEval = new FrequencyEvaluator('African', cache)
  await freqEval.evaluate(chr16, evalDownloader, progress)
  expect(nCallbacks).toBe(chr16.length)
  expect(evalDownloader.urls.length).toBe(chr16.length - snpsCache.length)
  evalDownloader.urls.forEach(url => {
    let found = cacheDownloader.urls.find(v => v === url)
    expect(found).toBeUndefined()
  })
})

export class DownloaderMultiple implements IDownloader {
  async download(urls: string[], callBack: ProcessCallback) {
    let text = `
    #URL	https://www.ncbi.nlm.nih.gov/snp/rs2015062/download/frequency
    #NCBI Reference SNP (rs) Report ALPHA	rs2015062
#Current Build	154
#Released	April 27, 2020
#Organism	Homo sapiens
#Position	chrMT:7028 (GRCh38.p12)
#Alleles	C>G / C>T
#Variation Type	SNV (Single Nucleotide Variation)
#Publications	0 citations
#
#Frequency Data Table
#################
#Study	Population	Group	Samplesize	Ref Allele	Alt Allele	BioProject ID	BioSample ID
ALFA	Total	Global	32152	C=0.40302	G=0.00006, T=0.59691	PRJNA507278	SAMN10492705
ALFA	European	Sub	27232	C=0.42035	G=0.00007, T=0.57958		SAMN10492695
ALFA	Other	Sub	4036	C=0.3424	G=0.0000, T=0.6576		SAMN11605645
ALFA	African	Sub	740	C=0.173	G=0.000, T=0.827		SAMN10492703
ALFA	Asian	Sub	132	C=0.008	G=0.000, T=0.992		SAMN10492704
ALFA	Latin American 1	Sub	6	C=0.0	G=0.0, T=1.0		SAMN10492699
ALFA	South Asian	Sub	4	C=0.0	G=0.0, T=1.0		SAMN10492702
ALFA	Latin American 2	Sub	2	C=0.0	G=0.0, T=1.0		SAMN10492700
SGDP_PRJ	Global	Study-wide	484	C=0.000	T=1.000	PRJNA586841`
    urls.forEach(url => callBack(null, Buffer.from(text), url))
  }
}

test('shall evaluate correctly when multipe alleles are present', async () => {
  let snps: snp[] = [
    {
      chr: 'MT',
      id: 'rs2015062',
      bases: 'T'
    }
  ]
  let downloader = new DownloaderMultiple()
  let freqEval = new FrequencyEvaluator(population)
  const progress = (id: string, freq: number | null) => {
    expect(freq).not.toBeNull()
    expect(freq).toBe(0.57958)
  }
  await freqEval.evaluate(snps, downloader, progress)
})
