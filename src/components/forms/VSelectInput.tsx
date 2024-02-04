import { Tag } from "@/lib/api/tag";
import { Box, Chip, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type VSelect = SelectProps & {
  name: string;
  options: Tag[];
};

export const VSelectInput = ({ name, options, ...rest }: VSelect) => {
  const { fieldName, registerField } = useField(name);
  const [selectedOptions, setSelectedOptions] = useState<Tag[]>([]);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedOptions.map(option => option.id),
      setValue: (_, newValue) => {
        const newSelectedOptions = options.filter(option => newValue.includes(option.id));
        setSelectedOptions(newSelectedOptions);
      },
    });
  }, [registerField, fieldName, selectedOptions, options]);

  return (
    <>
      <InputLabel
        htmlFor="tags"
      >
        Tags
      </InputLabel>
      <Select
        {...rest}
        multiple
        value={selectedOptions.map(option => option.id)}
        onChange={(event) => {
          const selectedIds = event.target.value as number[];
          const newSelectedOptions = options.filter(option => selectedIds.includes(option.id as number));
          setSelectedOptions(newSelectedOptions);
        }}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selectedOptions.map((value: Tag) => (
              <Chip key={value.id} label={value.name} />
            ))}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};