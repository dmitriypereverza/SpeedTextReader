export interface FileServiceInterface {
  getFileContent(file: File): Promise<string>;
}

export class FileService implements FileServiceInterface {
  public getFileContent(file: File): Promise<string> {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise<string>((resolve, reject) => {
      reader.onload = function () {
        resolve(reader.result as string);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }
}
