use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct ProgramHeader {
    pub progtype: u32,
    pub offset: u64,
    pub vaddr: u64,
    pub paddr: u64,
    pub filesz: u64,
    pub memsz: u64,
    pub flags: u32,
    pub align: u64,
}

impl ProgramHeader {
    pub fn new(phdr: &elf::types::ProgramHeader) -> Self {
        Self {
            progtype: phdr.progtype.0,
            offset: phdr.offset,
            vaddr: phdr.vaddr,
            paddr: phdr.paddr,
            filesz: phdr.filesz,
            memsz: phdr.memsz,
            flags: phdr.flags.0,
            align: phdr.align,
        }
    }
}
