import { buildContainer } from "ts-di-injector";
import { FileServiceInterface, FileService } from "./services/FileService";
import {
  BookContentParserService,
  BookContentParserServiceInterface,
} from "./services/BookContentParserService";

export default buildContainer<{
  fileService: FileServiceInterface;
  bookContentParserService: BookContentParserServiceInterface;
}>({
  params: {},
  classes: {
    fileService: {
      class: FileService,
    },
    bookContentParserService: {
      class: BookContentParserService,
    },
  },
});
