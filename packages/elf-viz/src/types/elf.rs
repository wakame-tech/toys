use serde::{Deserialize, Serialize};

use super::{elf_header::FileHeader, program_header::ProgramHeader, section_header::SectionHeader};

#[derive(Serialize, Deserialize)]
pub struct Elf {
    fhdr: FileHeader,
    phdrs: Vec<ProgramHeader>,
    shdrs: Vec<SectionHeader>,
}

impl Elf {
    pub fn new(elf: &elf::File) -> Self {
        Self {
            fhdr: FileHeader::new(&elf.ehdr),
            phdrs: elf
                .phdrs
                .iter()
                .map(|phdr| ProgramHeader::new(phdr))
                .collect(),
            shdrs: elf
                .sections
                .iter()
                .map(|section| SectionHeader::new(&section.shdr))
                .collect(),
        }
    }
}
