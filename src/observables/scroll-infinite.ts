import { distinct, filter, fromEvent, map, pairwise, tap } from "rxjs";

const src3$ = fromEvent<any>(window, "scroll", { capture: true }).pipe(
  map((e) => ({
    scrollTop: e.target.scrollTop,
    scrollHeight: e.target.scrollHeight,
    clientHeight: e.target.clientHeight,
  })),
  pairwise(),
  filter(
    (position) =>
      isScrollDown(position[0], position[1]) && setThreshold(99)(position[1])
  ),
  distinct(),
  tap((data) => {
    console.log("holis", data);
  })
);


const isScrollDown = (beforePosition, currentPosition) => {
  return beforePosition.scrollTop < currentPosition.scrollTop;
};

const setThreshold = (threshold) => {
  return (currentPosition) => {
    return (
      (currentPosition.scrollTop * 100) /
        (currentPosition.scrollHeight - currentPosition.clientHeight) >
      threshold
    );
  };
};
