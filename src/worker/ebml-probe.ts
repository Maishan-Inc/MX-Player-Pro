const EBML_MAGIC = [0x1a, 0x45, 0xdf, 0xa3] as const

/** Matroska and WebM both begin with the four-byte EBML header id. */
export function isEbmlDocument(bytes: Uint8Array): boolean {
  return bytes.length >= EBML_MAGIC.length
    && EBML_MAGIC.every((value, index) => bytes[index] === value)
}
