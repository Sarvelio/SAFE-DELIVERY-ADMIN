import { TextField } from "@mui/material";

interface IProps {
  title: string;
  name: string;
  type?: string;
  props?: any;
  register: any;
  errors: any;
}

export const InputTextField = ({
  title,
  name,
  type = "text",
  props,
  register,
  errors,
}: IProps): JSX.Element => {
  const Props = () => {
    return props
      ? { ...props }
      : {
          ...register(name, {
            required: "Este campo es requerido",
            minLength: { value: 2, message: "Mínimo 2 caracteres" },
          }),
        };
  };
  return (
    <div className="col-sm-6 my-2 px-3 px-sm-1 px-md-1 px-lg-3">
      <TextField
        type={type}
        label={title}
        variant="filled"
        fullWidth
        {...Props()}
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />
    </div>
  );
};
