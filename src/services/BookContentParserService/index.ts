export interface BookContentParserServiceInterface {
  parse(content: string, format: BookFormatEnum): string[];
}
export enum BookFormatEnum {
  FB2,
  TXT,
}

function parseFb2(text: string): string[] {
  return Array.from(text.matchAll(/(?<=<p>).+?(?=<\/p>)/gm)).map((el) =>
    el[0].replace(/<[^>]*>?/gm, "")
  );
}

function parseTxt(text: string): string[] {
  return [text];
}

export class BookContentParserService
  implements BookContentParserServiceInterface {
  public parse(content: string, format: BookFormatEnum): string[] {
    switch (format) {
      case BookFormatEnum.FB2:
        return parseFb2(content);
      case BookFormatEnum.TXT:
        return parseTxt(content);
      default:
        return [];
    }
  }
}
