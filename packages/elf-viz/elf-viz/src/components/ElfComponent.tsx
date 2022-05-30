import { Elf } from "../types";
import { parsePhdrFlags, toHex } from "../util";

interface Props {
  elf: Elf;
}

const ElfComponent = (props: Props) => {
  return (
    <div>
      <h1 className="text-xl font-bold primary-content">ELF Header</h1>
      <pre>{JSON.stringify(props.elf.fhdr)}</pre>

      <h1 className="text-xl font-bold primary-content">Program Headers</h1>

      <table className="table w-full">
        <thead>
          <tr>
            <th>type</th>
            <th>offset</th>
            <th>virtaddr</th>
            <th>physaddr</th>
            <th>filesize</th>
            <th>memsize</th>
            <th>flags</th>
            <th>align</th>
          </tr>
        </thead>
        <tbody>
          {props.elf.phdrs.map((phdr) => (
            <tr>
              <td>{phdr.progtype}</td>
              <td>{toHex(phdr.offset)}</td>
              <td>{toHex(phdr.vaddr)}</td>
              <td>{toHex(phdr.paddr)}</td>
              <td>{toHex(phdr.filesz)}</td>
              <td>{toHex(phdr.memsz)}</td>
              <td>
                {parsePhdrFlags(phdr.flags).map((flag) => (
                  <div className="badge">{flag}</div>
                ))}
              </td>
              <td>{phdr.align}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="text-xl font-bold primary-content">Section Headers</h1>

      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>type </th>
            <th>addr</th>
            <th>offset</th>
          </tr>
        </thead>
        <tbody>
          {props.elf.shdrs.map((section, i) => (
            <tr>
              <th>[{i}]</th>
              <td className="font-bold primary-content">{section.name}</td>
              <td>
                {section.shtype}

                {/* <div className="tooltip" data-tip="hello">
                  <button className="btn btn-sm">?</button>
                </div> */}
              </td>
              <td>{toHex(section.addr)}</td>
              <td>{toHex(section.offset)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElfComponent;
