import React, { useState } from "react";
import styled, { css } from "styled-components/macro";
import Wrapper from "../Wrapper";
import {
  backgroundColor,
  borderRadius,
  color,
  padding,
} from "../../libs/styles";
import { Button, Slider, Radio } from "antd";
import { useDebounce } from "../../libs/useDebounce";
import useWordReader from "./useWordReader";

const StyledHumanSpeedReader = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
`;

const WordContainer = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  font-size: 64px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const WordInText = styled.span`
  cursor: pointer;
  :hover {
    background-color: whitesmoke;
  }
  ${(props) =>
    props.active
      ? css`
          background-color: yellow;
        `
      : null}
`;

interface HumanSpeedReaderInterface {
  sentences: string[][];
}
const HumanSpeedReader = ({ sentences }: HumanSpeedReaderInterface) => {
  const {
    start,
    setSpeed,
    speed,
    pause,
    wordIndex,
    isWorking,
    setWordIndex,
  } = useWordReader({
    sentences,
  });

  const [speedSliderVal, setSpeedSliderVal] = useState(speed);
  const debouncedSetSpeed = useDebounce(setSpeed, 1000);

  function renderSentences() {
    const [sentI, wordI] = wordIndex;
    const startIndex = sentI < 3 ? 0 : sentI - 3;
    const endIndex = sentI + 3;

    return sentences.slice(startIndex, endIndex).map((sent, sentIndex) => {
      const currentRowIndex = startIndex + sentIndex;
      const activeSentence = currentRowIndex === sentI;
      return (
        <Wrapper
          key={sentIndex}
          styles={[
            activeSentence ? backgroundColor("dimmedBlue1") : [],
            borderRadius(2),
          ]}
        >
          {sent.map((word, wordIndex) => {
            const activeWord = activeSentence && wordI === wordIndex;
            return (
              <span key={wordIndex}>
                <WordInText
                  onClick={() => setWordIndex([currentRowIndex, wordIndex])}
                  active={activeWord}
                >
                  {word}
                </WordInText>{" "}
              </span>
            );
          })}
        </Wrapper>
      );
    });
  }

  return (
    <StyledHumanSpeedReader>
      {isWorking ? (
        <Wrapper>
          <WordContainer>
            {!!wordIndex && (
              <span>{sentences[wordIndex[0]][wordIndex[1]]}</span>
            )}
          </WordContainer>
          <Radio.Group
            value={""}
            onChange={(ev) => {
              switch (ev.target.value) {
                case "start":
                  start();
                  break;
                case "pause":
                  pause();
                  break;
                default:
                  return;
              }
            }}
          >
            <Radio.Button value="start">Старт</Radio.Button>
            <Radio.Button value="pause">Пауза</Radio.Button>
          </Radio.Group>
          <Slider
            tooltipVisible
            value={speedSliderVal}
            min={10}
            max={1500}
            onChange={(ev) => {
              setSpeedSliderVal(ev as number);
              debouncedSetSpeed(ev);
            }}
          />
        </Wrapper>
      ) : (
        <Button
          onClick={() => {
            start();
          }}
        >
          Начать чтение
        </Button>
      )}

      <Wrapper
        styles={[
          backgroundColor("dimmedBlue0"),
          padding(24),
          color("dimmedBlue4"),
        ]}
      >
        {renderSentences()}
      </Wrapper>
    </StyledHumanSpeedReader>
  );
};

export default React.memo(HumanSpeedReader);
