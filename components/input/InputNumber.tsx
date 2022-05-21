import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

interface IProps {
  title: string;
  name: string;
  props: any;
  errors: any;
  simbol?: string;
  error?: any;
  helperText?: any;
}

export const InputNumber = ({
  title,
  name,
  props,
  errors,
  simbol = "",
  error,
  helperText,
}: IProps): JSX.Element => {
  return (
    <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
      <FormControl fullWidth sx={{ m: 1 }} variant="filled" className="m-0">
        <InputLabel>{title}</InputLabel>
        <FilledInput
          type="number"
          {...props}
          error={error || !!errors[name]}
          startAdornment={
            simbol ? (
              <InputAdornment position="start">{simbol}</InputAdornment>
            ) : null
          }
        />
        <FormHelperText
          disabled={error || !!errors[name]}
          className="Mui-error"
        >
          {helperText || errors[name]?.message}
        </FormHelperText>
      </FormControl>
    </div>
  );
};
