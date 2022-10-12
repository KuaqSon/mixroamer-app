function pad(string: string | number) {
  return `0${string}`.slice(-2);
}

function format(seconds: number) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export default function Duration({ seconds }: { seconds: number }) {
  return <time dateTime={`P${Math.round(seconds)}S`}>{format(seconds)}</time>;
}
