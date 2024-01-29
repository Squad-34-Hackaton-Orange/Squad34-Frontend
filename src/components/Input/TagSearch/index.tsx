import { Autocomplete, TextField, useTheme } from "@mui/material";
import React from "react";

type TagsTypes = "web" | "UX" | "frontend" | "backend";

const TagSearch = () => {
  
  const handleChange = (values: string[]) => {
    // 'values' É o array de tags que serão retornadas do Input
    console.log(values);
  };

  const theme = useTheme();

  const tags = ["web", "UX", "frontend", "backend", "test"];

  return (
    <Autocomplete
      multiple
      id="outlined-multi"
      options={tags}
      getOptionLabel={(option) => option}
      onChange={(event, values) => handleChange(values)}
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

export default TagSearch;