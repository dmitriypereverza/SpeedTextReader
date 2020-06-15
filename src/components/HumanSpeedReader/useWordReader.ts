import { useEffect, useRef, useState } from "react";
import { interval, Subscription } from "rxjs";
import useForceUpdate from "../../libs/useForceUpdate";
import { path } from "ramda";

export default function ({ sentences }: { sentences: string[][] }) {
  const [isWorking, setIsWorking] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(300);
  const wordIndex = useRef<[number, number]>([0, 0]);
  const subscription = useRef<Subscription>();
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (!isWorking) return undefined;
    stop();
    start();
  }, [speed]);

  function setNextIndex() {
    let nextIndex: [number, number] = [
      wordIndex.current[0],
      wordIndex.current[1] + 1,
    ];
    if (path(nextIndex, sentences)) {
      wordIndex.current = nextIndex;
      forceUpdate();
      return;
    }
    nextIndex = [wordIndex.current[0] + 1, 0];
    if (path(nextIndex, sentences)) {
      wordIndex.current = nextIndex;
      forceUpdate();
      return;
    }
    return;
  }

  function start() {
    stop();
    setIsWorking(true);
    subscription.current = interval(speed).subscribe(setNextIndex);
  }

  function stop() {
    subscription.current?.unsubscribe();
    setIsWorking(false);
  }
  return {
    wordIndex: wordIndex.current,
    setWordIndex: (index: [number, number]) => {
      wordIndex.current = index;
      forceUpdate();
    },
    start,
    stop,
    pause: () => subscription.current?.unsubscribe(),
    setSpeed,
    speed,
    isWorking,
  };
}
