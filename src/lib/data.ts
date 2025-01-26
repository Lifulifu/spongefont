import readXlsxFile from 'read-excel-file';

export class SpongebobData {
  static columns = {
    id: 1,
    text: 2,
    imgNoText: 5,
    img: 7,
  };

  static async load(): Promise<any[]> {
    const response = await fetch('spongebob_data.xlsx');
    const blob = await response.blob();
    const rows = await readXlsxFile(blob);
    return rows;
  }
}
