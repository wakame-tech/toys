export interface Phdr {
  align: number;
  filesz: number;
  flags: number;
  memsz: number;
  offset: number;
  paddr: number;
  vaddr: number;
  progtype: number;
}

export interface Shdr {
  name: string;
  addr: number;
  addralign: number;
  entsize: number;
  flags: number;
  info: number;
  link: number;
  offset: number;
  shtype: number;
  size: number;
}

export interface Elf {
  fhdr: object;
  phdrs: Phdr[];
  shdrs: Shdr[];
}
