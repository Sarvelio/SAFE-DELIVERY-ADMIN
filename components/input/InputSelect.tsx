import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface IProps {
  title: string;
  items: { id: string; nombre: string }[];
  name: string;
  props: any;
  errors: any;
  clearErrors: any;
  watch: any;
}

export const InputSelect = ({
  title,
  items = [],
  errors,
  name,
  props,
  clearErrors,
  watch,
}: IProps): JSX.Element => {
  return (
    <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
      <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="m-0">
        <InputLabel>{title}</InputLabel>
        <Select
          {...props}
          onFocus={() => {
            clearErrors(name);
          }}
          value={watch(name)}
          error={!!errors[name]}
        >
          <MenuItem value="">
            <em>Ninguno</em>
          </MenuItem>
          {items.map(({ id, nombre }) => (
            <MenuItem value={id} key={id}>
              {nombre}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText disabled={!!errors[name]} className="Mui-error">
          {errors[name]?.message}
        </FormHelperText>
      </FormControl>
    </div>
  );
};
