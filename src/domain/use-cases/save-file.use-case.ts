import fs from "fs";

export interface SaveFileCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileCase {
  constructor(/* 
  repository: StorageRepository
  */) {}

  execute({
    fileContent,
    fileDestination = "outputs",
    fileName = "table",
  }: Options): boolean {
    try {
      fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/tabla-${fileName}.txt`, fileContent);
      console.log("Tabla generada correctamente");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
