import { Autocomplete, Chip, TextField, useTheme } from "@mui/material";
import React from "react";

type TagsTypes = "web" | "UX" | "frontend" | "backend";

export default function TagSearch() {

  const handleChange = (values: string[]) => {
    console.log(values);
  };

  const theme = useTheme();

  const tags = ["web", "UX", "frontend", "backend", "test"];

  return (
    <Autocomplete
      multiple
      id="outlined-multi"
      options={tags}
      defaultValue={[]}
      getOptionLabel={(option) => option}
      onChange={(event, values) => handleChange(values)}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option}>
            {option}
          </li>
        )
      }}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) => (
          <Chip {...getTagProps({ index })} key={option} label={option} sx={{
            fontSize: { xs: "1.2rem", sm: "1.6rem" },
            lineHeight: { xs: "1.2rem", sm: "1.6rem" }
          }} />
        ))
      }}

      renderInput={(params) => (
        <TextField
          sx={{
            fontSize: "1.6rem",
          }}
          {...params}
          placeholder="Buscar tags"
        />
      )}
      sx={{
        width: "100%",
        maxWidth: '513px',
        borderRadius: '4px',

      }}
    />
  );
};