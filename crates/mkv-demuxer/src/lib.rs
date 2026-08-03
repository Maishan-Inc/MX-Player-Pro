use wasm_bindgen::prelude::*;

fn vint(bytes: &[u8], offset: usize) -> Option<(usize, u64)> {
    let first = *bytes.get(offset)?;
    let mut mask = 0x80u8;
    let mut length = 1usize;
    while length <= 8 && first & mask == 0 {
        mask >>= 1;
        length += 1;
    }
    if length > 8 || offset + length > bytes.len() {
        return None;
    }
    let mut value = (first & (mask - 1)) as u64;
    for byte in &bytes[offset + 1..offset + length] {
        value = (value << 8) | *byte as u64;
    }
    Some((length, value))
}

#[wasm_bindgen]
pub fn wasm_version() -> String {
    "mkv-demuxer/0.1".to_string()
}

#[wasm_bindgen]
pub fn probe_ebml(bytes: &[u8]) -> bool {
    bytes.len() >= 4 && bytes[0..4] == [0x1a, 0x45, 0xdf, 0xa3]
}

#[wasm_bindgen]
pub fn read_vint(bytes: &[u8], offset: usize) -> u32 {
    vint(bytes, offset).map(|(length, value)| ((length as u32) << 24) | value as u32).unwrap_or(0)
}
