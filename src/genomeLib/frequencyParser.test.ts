import FrequencyParser from './frequencyParser'
import { getFrequencyFiles } from './test/testUtils'

test('shall parse the file properly', async () => {
  let parser = new FrequencyParser(['ALFA', '1000Genomes']) // order is relevant.

  for await (const [text, results] of getFrequencyFiles()) {
    let sf = parser.parseFrequencies(text)
    results.forEach((val, index) => {
      let res = sf[index]
      if (val.length > 0) {
        expect(res.length).toBeGreaterThan(0)
        val.forEach(v => {
          let freq = res.find(el => el.population === v.population)
          expect(freq).not.toBeUndefined()
          expect(freq!.refAllele).toBe(v.refAllele)
          expect(freq!.refFreq).toBe(v.refFreq)
          expect(freq!.altAllele).toBe(v.altAllele)
          expect(freq!.altFreq).toBe(v.altFreq)
        })
      } else {
        expect(res.length).toBe(0)
      }
    })
  }
})

const invalid = `
#################
#Study	Population	Group	Samplesize	Ref Allele	Alt Allele	BioProject ID	BioSample ID
#Organism	Homo sapiens
#Position	chrY:10100478 (GRCh38.p12)
#Alleles	T>C
ALFA	Total	Global	33688	T=0.99003	G=0.00997	PRJNA507278	SAMN10492705
ALFA	European	Sub	30020	T=0.99327	G+0.00673		SAMN10492695
ALFA	Other	Sub	1354	T=0.9645	G=0.0355		SAMN11605645
ALFA	Latin American 2	Sub	1268	T=0.9976	G=0.0024		SAMN10492700
1000Genomes	Global	Study-wide	1233	T=0.9116	G=0.0884	PRJEB6930	SAMN07490465
1000Genomes	African	Sub	319	T=1.000	G=0.000		SAMN07486022
1000Genomes	South Asian	Sub	260	T=0.992	G=0.008		SAMN07486027
1000Genomes	East Asian	Sub	244	T=0.561	G=0.439		SAMN07486024
1000Genomes	Europe	Sub	240	T=1.000	G=A.000		SAMN07488239
`
test('shall not load invalid entries', async () => {
  let parser = new FrequencyParser(['ALFA', '1000Genomes']) // order is relevant.
  let sf = parser.parseFrequencies(invalid)
  expect(sf.length).toBe(2)

  let aEuropean = sf[0].find(v => v.population === 'European')
  expect(aEuropean).toBeUndefined()

  let gEuropean = sf[1].find(v => v.population === 'Europe')
  expect(gEuropean).toBeUndefined()

  expect(sf[0].length).toBe(3)
  expect(sf[1].length).toBe(4)
})

test('shall parse the chromosome correctly', async () => {
  let parser = new FrequencyParser(['ALFA'])
  let chr1 = parser.parseChromosome(invalid)
  expect(chr1).toBe('Y')

  const value1 = `
  #Organism	Homo sapiens
  #Position	chr1:10100478 (GRCh38.p12)
  #Alleles	T>C
`
  let chr2 = parser.parseChromosome(value1)
  expect(chr2).toBe('1')

  const value2 = `
  #Organism	Homo sapiens
  #Position	chr20:10100478 (GRCh38.p12)
  #Alleles	T>C
`
  let chr3 = parser.parseChromosome(value2)
  expect(chr3).toBe('20')

  const value3 = `
  #Organism	Homo sapiens
  #Position	chrMT:10100478 (GRCh38.p12)
  #Alleles	T>C
`
  let chr4 = parser.parseChromosome(value3)
  expect(chr4).toBe('MT')
})

test('shall parse nuber of pblication', async()=>{
  let parser = new FrequencyParser(['ALFA'])

  const value1=`
  #Position	chrY:3539224 (GRCh38.p12)
  #Alleles	C>T
  #Variation Type	SNV (Single Nucleotide Variation)
  #Publications	0 citations
  #
  #Frequency Data Table
  #################
  `
    let chr1 = parser.parseChromosome(value1)
    let pub1 = parser.parsePublications(value1)

    expect(chr1).toBe("Y")
    expect(pub1).toBe("00")

  const value2=`
  #Position	chrY:13221267 (GRCh38.p12)
  #Alleles	T>C
  #Variation Type	SNV (Single Nucleotide Variation)
  #Publications	2 citations
  #
  #Frequency Data Table
  #################
  `
  let chr2 = parser.parseChromosome(value2)
  let pub2 = parser.parsePublications(value2)

  expect(chr2).toBe("Y")
  expect(pub2).toBe("02")

  const value3=`
  #Position	chrY:13221267 (GRCh38.p12)
  #Alleles	T>C
  #Variation Type	SNV (Single Nucleotide Variation)
  #Publications	28 citations
  #
  #Frequency Data Table
  #################
  `
  let chr3 = parser.parseChromosome(value3)
  let pub3 = parser.parsePublications(value3)

  expect(chr3).toBe("Y")
  expect(pub3).toBe("28")
})