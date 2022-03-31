use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct FileHeader {
    class: u8,
    data: u8,
    version: u32,
    osabi: u8,
    abiversion: u8,
    elftype: u16,
    machine: u16,
    entry: u64,
}

impl FileHeader {
    pub fn new(fhdr: &elf::types::FileHeader) -> Self {
        Self {
            class: fhdr.class.0,
            data: fhdr.data.0,
            version: fhdr.version.0,
            osabi: fhdr.osabi.0,
            abiversion: fhdr.abiversion,
            elftype: fhdr.elftype.0,
            machine: fhdr.machine.0,
            entry: fhdr.entry,
        }
    }
}
