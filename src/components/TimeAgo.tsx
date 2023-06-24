import { useEffect, useState } from "react";

const secondsTable: [string, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];
const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

const renderTime = (date: Date) => {
  const getTime = Math.round(date.getTime() - new Date().getTime());
  const seconds = getTime / 1000;
  const absSec = Math.abs(seconds);

  let bestUnit = "";
  let bestTime = 0;
  let bestInterval = 0;

  for (const [unit, unitSeconds] of secondsTable) {
    if (absSec >= unitSeconds) {
      bestUnit = unit;
      bestTime = Math.round(seconds / unitSeconds);
      bestInterval = unitSeconds / 2;
      break;
    }
  }
  if (!bestUnit) {
    bestUnit = "second";
    bestTime = (seconds / 10) * 10;
    bestInterval = 10;
  }
  return [bestTime, bestUnit, bestInterval] as [
    number,
    Intl.RelativeTimeFormatUnit,
    number
  ];
};

export default function TimeAgo({ isoDate }: {isoDate: string}) {
  const [, setUpdate] = useState(0);
  const [time, unit, interval] = renderTime(new Date(Date.parse(isoDate)));

  useEffect(() => {
    const timerId = setInterval(
      () => setUpdate((prev) => prev + 1),
      interval * 1000
    );
    return () => clearInterval(timerId);
  }, [interval]);

  return (
    <>
      <span>{rtf.format(time, unit)}</span>
    </>
  );
}
