use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SectionHeader {
    pub name: String,
    pub shtype: u32,
    pub flags: u64,
    pub addr: u64,
    pub offset: u64,
    pub size: u64,
    pub link: u32,
    pub info: u32,
    pub addralign: u64,
    pub entsize: u64,
}

impl SectionHeader {
    pub fn new(shdr: &elf::types::SectionHeader) -> Self {
        Self {
            name: shdr.name.clone(),
            shtype: shdr.shtype.0,
            flags: shdr.flags.0,
            addr: shdr.addr,
            offset: shdr.offset,
            size: shdr.size,
            link: shdr.link,
            info: shdr.info,
            addralign: shdr.addralign,
            entsize: shdr.entsize,
        }
    }
}
