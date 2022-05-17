import { useController } from "react-hook-form";
import { Tooltip } from "antd";

export default function InputText({
  name,
  control,
  rules,
  className,
  placeholder,
  type = "text",
}) {
  const {
    field,
    fieldState: { invalid, isTouched, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
    defaultValue: "",
  });

  return (
    <>
      <Tooltip
        title={error && error.message ? error.message : ""}
        visible={error ? true : false}
        placement="topRight"
        color={"red"}
      >
        <input
          type={type}
          className={className || ""}
          placeholder={placeholder}
          {...field}
        />
      </Tooltip>
    </>
  );
}
