import { describe, expect, it } from 'vitest'
import { isEbmlDocument } from './ebml-probe'

describe('EBML probe', () => {
  it('accepts the Matroska EBML magic bytes', () => {
    expect(isEbmlDocument(new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 0x93, 0x42]))).toBe(true)
  })

  it('rejects short or unrelated content without WASM', () => {
    expect(isEbmlDocument(new Uint8Array([0x1a, 0x45, 0xdf]))).toBe(false)
    expect(isEbmlDocument(new TextEncoder().encode('<!doctype html>'))).toBe(false)
  })
})
