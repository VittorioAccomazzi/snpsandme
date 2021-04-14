import * as path from 'path'
import * as fs from 'fs'
import { Frequencies } from '../snpFrequency'
import { IDownloader, ProcessCallback } from '../downloader'
import * as shell from 'shelljs'

export const sampleGenomeFile = 'src/genomelib/test/genome/23andme.txt'
export const sampleFolder = 'src/genomelib/test/frequency'
export const tests = [
  {
    file: 'rs2262190_frequency.tsv',
    frequency: {
      chr: '1',
      pub: '08',
      European: {
        maj: 'G',
        freq: 0.79933,
        min: 'A'
      },
      African: {
        maj: 'G',
        freq: 0.9197,
        min: 'A'
      },
      EAsian: {
        maj: 'G',
        freq: 0.789,
        min: 'A'
      },
      SAsian: {
        maj: 'G',
        freq: 0.86,
        min: 'A'
      }
    },
    results: [
      // ALPHA
      [
        {
          population: 'European',
          refAllele: 'A',
          refFreq: 0.20067,
          altAllele: 'G',
          altFreq: 0.79933
        },
        {
          population: 'African',
          refAllele: 'A',
          refFreq: 0.0803,
          altAllele: 'G',
          altFreq: 0.9197
        },
        {
          population: 'South Asian',
          refAllele: 'A',
          refFreq: 0.14,
          altAllele: 'G',
          altFreq: 0.86
        }
      ],
      // 1000Genomes
      [
        {
          population: 'Europe',
          refAllele: 'A',
          refFreq: 0.2078,
          altAllele: 'G',
          altFreq: 0.7922
        },
        {
          population: 'East Asian',
          refAllele: 'A',
          refFreq: 0.1766,
          altAllele: 'G',
          altFreq: 0.8234
        }
      ]
    ]
  },
  {
    file: 'rs2113790_frequency.tsv',
    frequency: {
      chr: 'Y',
      pub: '00',
      European: {
        maj: 'C',
        freq: 0.673,
        min: 'T'
      },
      African: {
        maj: 'T',
        freq: 0.69,
        min: 'C'
      },
      EAsian: {
        maj: 'T',
        freq: 0.7,
        min: 'C'
      },
      SAsian: undefined
    },
    results: [
      // ALPHA
      [
        {
          population: 'European',
          refAllele: 'C',
          refFreq: 0.673,
          altAllele: 'T',
          altFreq: 0.327
        },
        {
          population: 'African',
          refAllele: 'C',
          refFreq: 0.31,
          altAllele: 'T',
          altFreq: 0.69
        },
        {
          population: 'South Asian',
          refAllele: 'C',
          refFreq: 0,
          altAllele: 'T',
          altFreq: 0
        }
      ],
      // 1000Genomes
      [
        // not present.
      ]
    ]
  },
  {
    file: 'rs4535946_frequency.tsv',
    frequency: {
      chr: 'Y',
      pub: '00',
      European: undefined,
      African: undefined,
      EAsian: undefined,
      SAsian: undefined
    },
    results: [
      // ALPHA
      [
        // nothinng
      ],
      // 1000Genomes
      [
        // nothing.
      ]
    ]
  },
  {
    file: 'rs4592207_frequency.tsv',
    frequency: {
      chr: '1',
      pub: '00',
      European: {
        maj: 'T',
        freq: 0.61592,
        min: 'C'
      },
      African: {
        maj: 'T',
        freq: 0.612,
        min: 'C'
      },
      EAsian: {
        maj: 'C',
        freq: 0.672,
        min: 'T'
      },
      SAsian: {
        maj: 'C',
        freq: 0.51,
        min: 'T'
      }
    },
    results: [
      // ALPHA
      [
        {
          population: 'European',
          refAllele: 'T',
          refFreq: 0.61592,
          altAllele: 'C',
          altFreq: 0.38408
        },
        {
          population: 'African',
          refAllele: 'T',
          refFreq: 0.612,
          altAllele: 'C',
          altFreq: 0.388
        },
        {
          population: 'South Asian',
          refAllele: 'T',
          refFreq: 0.49,
          altAllele: 'C',
          altFreq: 0.51
        }
      ],
      // 1000Genomes
      [
        {
          population: 'Europe',
          refAllele: 'T',
          refFreq: 0.6123,
          altAllele: 'C',
          altFreq: 0.3877
        },
        {
          population: 'East Asian',
          refAllele: 'T',
          refFreq: 0.2738,
          altAllele: 'C',
          altFreq: 0.7262
        }
      ]
    ]
  },
  {
    file: 'rs17316592_frequency.tsv',
    frequency: {
      chr: 'Y',
      pub: '00',
      European: {
        maj: 'T',
        freq: 0.99327,
        min: 'G'
      },
      African: {
        maj: 'T',
        freq: 0.999,
        min: 'G'
      },
      EAsian: {
        maj: 'T',
        freq: 0.577,
        min: 'G'
      },
      SAsian: {
        maj: 'T',
        freq: 1.0,
        min: 'G'
      }
    },
    results: [
      // ALPHA
      [
        {
          population: 'European',
          refAllele: 'T',
          refFreq: 0.99327,
          altAllele: 'G',
          altFreq: 0.00673
        },
        {
          population: 'African',
          refAllele: 'T',
          refFreq: 0.999,
          altAllele: 'G',
          altFreq: 0.001
        },
        {
          population: 'South Asian',
          refAllele: 'T',
          refFreq: 1.0,
          altAllele: 'G',
          altFreq: 0.0
        }
      ],
      // 1000Genomes
      [
        {
          population: 'Europe',
          refAllele: 'T',
          refFreq: 1.0,
          altAllele: 'G',
          altFreq: 0.0
        },
        {
          population: 'East Asian',
          refAllele: 'T',
          refFreq: 0.561,
          altAllele: 'G',
          altFreq: 0.439
        }
      ]
    ]
  }
]

export async function* getFrequencyFiles(): AsyncGenerator<
  [
    string,
    {
      population: string
      refAllele: string
      refFreq: number
      altAllele: string
      altFreq: number
    }[][],
    Frequencies
  ]
> {
  for (const test of tests) {
    let filename = path.join(sampleFolder, test.file)
    let filecont = await loadFile(filename)
    yield [filecont, test.results, test.frequency]
  }
}

async function loadFile(filename: string): Promise<string> {
  return new Promise((res, rej) => {
    fs.readFile(filename, {}, (err, data) => {
      if (err) rej(err)
      res(data.toString())
    })
  })
}

export class DownloaderMock implements IDownloader {
  async download(urls: string[], callBack: ProcessCallback) {
    let text = `
#Organism	Homo sapiens
#Position	chr16:16448125 (GRCh38.p12)
#Alleles	T>G
#Publications	2 citations
#
#Frequency Data Table
#################
ALFA	Total	Global	89600	T=0.59859	C=0.40141	PRJNA507278	SAMN10492705
ALFA	European	Sub	75648	T=0.61592	C=0.38408		SAMN10492695
ALFA	Latin American 2	Sub	6718	T=0.4396	C=0.5604		SAMN10492700
ALFA	African	Sub	3698	T=0.6120	C=0.3880		SAMN10492703
ALFA	Other	Sub	2554	T=0.5208	C=0.4792		SAMN11605645
ALFA	Latin American 1	Sub	662	T=0.573	C=0.427		SAMN10492699
ALFA	Asian	Sub	250	T=0.328	C=0.672		SAMN10492704
ALFA	South Asian	Sub	70	T=0.49	C=0.51		SAMN10492702 `
    urls.forEach(url => callBack(null, Buffer.from(text), url))
  }
}

export class DownloaderErrorMock implements IDownloader {
  private urlsReqested: string[] = []
  get urls(): string[] {
    return this.urlsReqested
  }
  async download(urls: string[], callBack: ProcessCallback) {
    this.urlsReqested.push(...urls)
    let textWithValue = `
#Organism	Homo sapiens
#Position	chr16:16448125 (GRCh38.p12)
#Alleles	T>G
ALFA	Total	Global	89600	T=0.59859	C=0.40141	PRJNA507278	SAMN10492705
ALFA	African	Sub	3698	T=0.6120	C=0.3880		SAMN10492703`
    let testWithoutValue = `
#Organism	Homo sapiens
#Position	chrY:16448125 (GRCh38.p12)
#Alleles	T>G
ALFA	Asian	Sub	6	C=0.3	T=0.7		SAMN10492704
ALFA	Latin American 1	Sub	2	C=0.5	T=0.5		SAMN10492699
ALFA	South Asian	Sub	0	C=0	T=0		SAMN10492702
SGDP_PRJ	Global	Study-wide	138	C=0.312	T=0.688	PRJNA586841
  `
    urls.forEach(url => {
      if (url.indexOf('rs2') > 0) {
        // test without any value
        callBack(null, Buffer.from(testWithoutValue), url)
      } else if (url.indexOf('rs7') > 0) {
        // error
        callBack('this is an error', null, url)
      } else {
        // retrn actual value
        callBack(null, Buffer.from(textWithValue), url)
      }
    })
  }
}

export async function withTempFolder(
  test: (folder: string) => Promise<void>
): Promise<void> {
  let tmpFolder = null
  do {
    tmpFolder = path.resolve(
      shell.tempdir(),
      `withFolder_${(Math.random() * 10000).toFixed(0)}`
    )
  } while (fs.existsSync(tmpFolder))
  shell.mkdir(tmpFolder)
  try {
    await test(tmpFolder)
  } finally {
    shell.rm('-rf', tmpFolder)
  }
}
