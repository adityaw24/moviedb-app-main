import * as React from "react";
import { Pagination, Stack } from "@mui/material";

export default function Page(pages) {
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ my: "3rem" }}
    >
      <Pagination
        count={pages.totalPage}
        page={pages.page}
        onChange={pages.handlePage}
        size="large"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
