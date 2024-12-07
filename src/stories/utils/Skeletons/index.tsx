import { Skeleton } from "@mui/material";

export type SkeletonsProps = {
  count: number;
  height: string;
};

const Skeletons = (props: SkeletonsProps) => (
  <>
    {Array.from({ length: props.count }).map((_, i) => (
      <Skeleton key={i} variant="rectangular" width="100%" height={props.height} />
    ))}
  </>
);

export default Skeletons;
