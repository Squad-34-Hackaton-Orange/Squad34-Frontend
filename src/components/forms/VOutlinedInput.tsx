import React, { useEffect, useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
  OutlinedInputProps
} from "@mui/material";
import { useField } from "@unform/core";

type VOutlinedInputProps = OutlinedInputProps & {
  name: string;
  label?: string;
};

export const VOutlinedInput = ({ name, label, ...rest }: VOutlinedInputProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultValue ?? "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);


  const handleKeyDown = () => {
    if (error) {
      clearError();
    }
  };

  return (
    <FormControl fullWidth variant="outlined" error={!!error}>
      {label && <InputLabel required htmlFor={name}>{label}</InputLabel>}
      <OutlinedInput
        id={name}
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        {...rest}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};