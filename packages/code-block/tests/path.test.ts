import { extname, join, relative, resolve } from 'path'
import { describe, expect, it } from 'vitest'
describe('ext path', () => {
  it('should ', () => {
    expect(extname('./a.js').slice(1)).toBe('js')
  })
  it('should position', () => {
    expect(relative('./src', './src/a/b.js')).toBe('a/b.js')
  })
  it('should path', () => {
    expect(join('./src', '../a/b.js')).toBe('a/b.js')
  })
  it('should path', () => {
    expect(relative(process.cwd(), resolve('./src', './a/b.js'))).toBe('src/a/b.js')
  })
})
