import React from "react";
import { Avatar, Stack } from "@mui/material";

const NameCellRenderer = (props) => {
  const { value } = props;
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar>{value.charAt(0)}</Avatar>
      <span>{value}</span>
    </Stack>
  );
};

export default NameCellRenderer;
