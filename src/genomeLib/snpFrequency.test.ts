import SnpFrequency from './snpFrequency'
import { getFrequencyFiles } from './test/testUtils'

test('shall process properly the frequency reports', async () => {
  let snpFreq = new SnpFrequency()

  for await (const [text, , expFrq] of getFrequencyFiles()) {
    let actFreq = snpFreq.Calculate(text)
    expect(actFreq).toEqual(expFrq)
  }
})
