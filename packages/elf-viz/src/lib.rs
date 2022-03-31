use std::io::Cursor;
use types::elf::Elf;
use wasm_bindgen::prelude::*;

pub mod types;

#[wasm_bindgen]
pub fn parse_elf(bytes: &[u8]) -> String {
    let mut elf = Cursor::new(bytes);
    let file = elf::File::open_stream(&mut elf).unwrap();
    let elf = Elf::new(&file);
    serde_json::to_string(&elf).unwrap_or("".to_string())
}
