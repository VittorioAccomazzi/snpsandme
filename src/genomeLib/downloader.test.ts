import Downloader from './downloader'

test(
  'shall download correctly',
  async () => {
    let urls = [
      'https://www.ncbi.nlm.nih.gov/snp/rs2113790/download/frequency',
      'https://www.ncbi.nlm.nih.gov/snp/rs4442317/download/frequency',
      'https://www.ncbi.nlm.nih.gov/snp/rs6603781/download/frequency',
      'https://www.ncbi.nlm.nih.gov/snp/rs3737721/download/frequency',
      'https://www.ncbi.nlm.nih.gov/snp/rs2291889/download/frequency',
      'https://www.ncbi.nlm.nih.gov/snp/rs12021879/download/frequency'
    ]
    const numDownloaders = 4
    let nFiles = 0
    const process = (
      error: string | null,
      data: Buffer | null,
      url: string
    ) => {
      expect(error).toBeNull()
      expect(data!.toString()).toContain('NCBI Reference SNP')
      expect(data!.toString()).toContain(url)
      nFiles++
    }

    let downloader = new Downloader(numDownloaders)
    await downloader.download(urls, process)
    expect(nFiles).toBe(urls.length)
  },
  1 * 60 * 1000
)

test(
  'shall gracefully handle errors',
  async () => {
    let urls = [
      'https://www.ncbi.nlm.nih.gov/snp/rs2113790/download/frequency',
      'https://www.ncbi.nlm.nih.gov/snp/rsNonExissting/download/frequency',
      'https://www.ncbi.nlm.nih.gov/snp/rs6603781/download/frequency'
    ]
    const numDownloaders = 2
    let nError = 0
    let nFiles = 0
    const process = (
      error: string | null,
      data: Buffer | null,
      url: string
    ) => {
      if (error != null) nError++
      if (data != null) {
        if (data.toString().indexOf('NCBI Reference SNP') > 0) nFiles++
        else nError++
      }
    }

    let downloader = new Downloader(numDownloaders)
    await downloader.download(urls, process)

    expect(nError).toBe(1)
    expect(nFiles).toBe(2)
  },
  1 * 60 * 1000
)

test(
  'shall handle less urls then downloaders',
  async () => {
    let urls = [
      'https://www.ncbi.nlm.nih.gov/snp/rs2113790/download/frequency',
      'https://www.ncbi.nlm.nih.gov/snp/rs4442317/download/frequency'
    ]
    const numDownloaders = 4
    let nFiles = 0
    const process = (
      error: string | null,
      data: Buffer | null,
      url: string
    ) => {
      expect(error).toBeNull()
      expect(data!.toString()).toContain('NCBI Reference SNP')
      nFiles++
    }

    let downloader = new Downloader(numDownloaders)
    await downloader.download(urls, process)
    expect(nFiles).toBe(urls.length)
  },
  1 * 60 * 1000
)
