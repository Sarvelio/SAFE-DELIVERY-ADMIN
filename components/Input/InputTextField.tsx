import { TextField } from "@mui/material";

interface IProps {
  title: string;
  name: string;
  register: any;
  errors: any;
}

export const InputTextField = ({
  title,
  name,
  register,
  errors,
}: IProps): JSX.Element => {
  return (
    <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
      <TextField
        label={title}
        variant="filled"
        fullWidth
        {...register(name, {
          required: "Este campo es requerido",
          minLength: { value: 2, message: "Mínimo 2 caracteres" },
        })}
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />
    </div>
  );
};
