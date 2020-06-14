import React, { useState } from "react";
import "./styles.scss";
import Wrapper from "./components/Wrapper";
import { Button } from "antd";
import di from "./di";
import { ai, Aligns, flex, fullHeight, fullWidth, jc } from "./libs/styles";
import FileInput, { FileAccept } from "./components/FileInput";
import { pureConnect } from "./libs/pureConnect";
import { FileServiceInterface } from "./services/FileService";
import {
  BookContentParserServiceInterface,
  BookFormatEnum,
} from "./services/BookContentParserService";
import { split } from "ramda";
import HumanSpeedReader from "./components/HumanSpeedReader";

interface AppInterface {
  fileService: FileServiceInterface;
  bookContentParserService: BookContentParserServiceInterface;
}
function App({ fileService, bookContentParserService }: AppInterface) {
  const [sentences, setSentences] = useState<string[][]>();
  return (
    <Wrapper
      styles={[
        flex,
        fullHeight,
        fullWidth,
        jc(Aligns.CENTER),
        ai(Aligns.CENTER),
      ]}
    >
      {!sentences ? (
        <FileInput
          accept={FileAccept.BOOKS}
          onFileLoaded={async (file) => {
            const content = await fileService.getFileContent(file);
            const sentences = bookContentParserService.parse(
              content,
              BookFormatEnum.FB2
            );
            const spitedWordInSentences = sentences.map(split(" "));
            setSentences(spitedWordInSentences);
          }}
          view={(open) => <Button onClick={open}>Upload</Button>}
        />
      ) : (
        <HumanSpeedReader sentences={sentences} />
      )}
    </Wrapper>
  );
}

export default pureConnect(
  () => ({
    fileService: di.get("fileService"),
    bookContentParserService: di.get("bookContentParserService"),
  }),
  App
);
