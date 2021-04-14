import FrequencyCache from './frequencyCache'
import SNPs from './snps'
import {
  DownloaderErrorMock,
  DownloaderMock,
  sampleGenomeFile,
  withTempFolder
} from './test/testUtils'
import * as path from 'path'
import * as fs from 'fs'

test('shall cache all the snps', async () => {
  let snps = await SNPs.fromFile(sampleGenomeFile)
  let chr16 = snps.snpChromosome('16').map(v=>v.id)
  let downloader = new DownloaderMock()
  let done = 0
  const progress = (nDone: number, nTotal: number) => {
    done = nDone
  }
  // first download the cache
  let fc = new FrequencyCache()
  await fc.downloadCache(chr16, downloader, progress)
  expect(done).toBe(chr16.length)

  let snpFound = 'rs12935776'
  let snpNotFd = 'rs13308842'
  let snpFreq = {
    chr: '16',
    pub: '02',
    European: {
      maj: 'T',
      min: 'C',
      freq: 0.62
    },
    African: {
      maj: 'T',
      min: 'C',
      freq: 0.61
    },
    EAsian: {
      maj: 'C',
      min: 'T',
      freq: 0.67
    },
    SAsian: {
      maj: 'C',
      min: 'T',
      freq: 0.51
    }
  }

  let freqFound = fc.getFrequency(snpFound)
  expect(freqFound).not.toBeNull()
  expect(freqFound).toStrictEqual(snpFreq)

  let freqNotFd = fc.getFrequency(snpNotFd)
  expect(freqNotFd).toBeNull()
})

test('shall handle undefined snps', async () => {
  let snps = await SNPs.fromFile(sampleGenomeFile)
  let chr16 = snps.snpChromosome('16').map(v=>v.id)
  let downloader = new DownloaderErrorMock()
  let done = 0
  const progress = (nDone: number, nTotal: number) => {
    done = nDone
  }
  // first download the cache
  let fc = new FrequencyCache()
  await fc.downloadCache(chr16, downloader, progress)
  expect(done).toBe(chr16.length)

  // now check that some values have not been found
  let noVal1 = 'rs72783260' // case in which there is an error
  let noVal2 = 'rs2017610' // case in which there is no information
  let withVal = 'rs8056247' // should have european values
  let empty = {
    chr: 'UN',
    pub: "00",
    European: undefined,
    African: undefined,
    SAsian: undefined,
    EAsian: undefined
  }
  let value1 = {
    chr: 'Y',
    pub: "00",
    European: undefined,
    African: undefined,
    SAsian: undefined,
    EAsian: {
      maj: 'T',
      min: 'C',
      freq: 0.7
    }
  }
  let value2 = {
    chr: '16',
    pub: '00',
    European: undefined,
    African: {
      maj: 'T',
      min: 'C',
      freq: 0.61
    },
    SAsian: undefined,
    EAsian: undefined
  }

  let res1 = fc.getFrequency(noVal1)
  expect(res1).toStrictEqual(empty)

  let res2 = fc.getFrequency(noVal2)
  expect(res2).toStrictEqual(value1)

  let res3 = fc.getFrequency(withVal)
  expect(res3).toStrictEqual(value2)
})

test('Shall save and load the cache', async () => {
  withTempFolder(async folder => {
    let snps = await SNPs.fromFile(sampleGenomeFile)
    let chr16 = snps.snpChromosome('16').map(v=>v.id)
    let downloader = new DownloaderErrorMock()
    const progress = (nDone: number, nTotal: number) => {}
    // first download the cache
    let fc1 = new FrequencyCache()
    await fc1.downloadCache(chr16, downloader, progress)
    // save
    let file = path.join(folder, 'testCache.json')
    await fc1.save(file)
    expect(fs.existsSync(file)).toBe(true)
    // now load it
    let content = fs.readFileSync(file).toString()
    let saved = JSON.parse(content) as [string, string][]
    let fc2 = new FrequencyCache()
    fc2.load(saved)
    // make sure that they are the same
    chr16.forEach(el => {
      let val1 = fc1.getFrequency(el)
      let val2 = fc2.getFrequency(el)
      expect(val1).toStrictEqual(val2)
    })
  })
})
