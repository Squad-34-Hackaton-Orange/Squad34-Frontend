import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type VtextFieldProps = TextFieldProps & {
  name: string;
};

export const VTextField = ({ name, ...rest }: VtextFieldProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState(defaultValue || '');


  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  return (    
    <TextField
      
      
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}

      label={rest.label}
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={() => error ? clearError() : undefined}

    />
  );
};