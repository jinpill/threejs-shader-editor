import Link from "next/link";
import { Paper } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <Link href="/editor">Go to Editor</Link>
      <Paper>ddd</Paper>
    </div>
  );
};

export default HomePage;
