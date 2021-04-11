import * as fs from 'fs'
import SNPs, { snp } from './snps'

export const sampleGenomeFile = 'src/genomelib/test/genome/23andme.txt'

const expected: Partial<snp>[] = [
  {
    id: 'rs28561399',
    chr: '1',
    bases: 'AG'
  },
  {
    id: 'rs74950664',
    chr: '1',
    bases: 'CT'
  },
  {
    id: 'rs79148073',
    chr: '1',
    bases: 'TT'
  },
  {
    id: 'rs1350795',
    chr: '16',
    bases: 'AC'
  },
  {
    id: 'rs7049771',
    chr: 'X',
    bases: 'T'
  },
  {
    id: 'rs3212290',
    chr: 'Y',
    bases: 'A'
  },
  {
    id: 'rs28357673',
    chr: 'MT',
    bases: 'C'
  }
]

const notexpected: string[] = [
  'rs202061838',
  'i707010',
  'rs183919194',
  'rs201578462',
  'rs5961373',
  'i704188',
  'i706820'
]

test('shall parse 23andme file properly', async () => {
  let snps = await SNPs.fromFile(sampleGenomeFile)
  let list = snps.snpList

  expected.forEach(v => {
    let found = list.find(
      snp => snp.bases === v.bases && snp.id === v.id && snp.chr === v.chr
    )
    expect(found).toBeDefined()
  })

  notexpected.forEach(v => {
    let found = list.find(snp => snp.id === v)
    expect(found).toBeUndefined()
  })
})

test('shall provide the SNPs for each chromosome', async () => {
  let snps = await SNPs.fromFile(sampleGenomeFile)
  expected.forEach(v => {
    let list = snps.snpChromosome(v.chr!)
    let found = list.find(
      snp => snp.bases === v.bases && snp.id === v.id && snp.chr === v.chr
    )
    expect(found).toBeDefined()
  })
})

test('Shall filter on load',async ()=>{
  let allSnps = await SNPs.fromFile(sampleGenomeFile)
  let data = fs.readFileSync(sampleGenomeFile)
  let fewSnps = new SNPs(data.toString(),["1"])
  expect(allSnps.snpChromosome("1").length).toBe(fewSnps.snpList.length)
  fewSnps.snpList.forEach((v)=>expect(v.chr).toBe("1"))
})