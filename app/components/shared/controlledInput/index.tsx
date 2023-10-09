import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Controller, FieldValues, Validate, useFormContext } from 'react-hook-form';

type InputType = 'text' | 'password' | 'number' | 'email';
interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  type?: InputType;
  validate?: Validate<any, FieldValues> | Record<string, Validate<any, FieldValues>>;
}

const ControlledInput = ({ label, name, required, className, type = 'text', validate }: Props) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const getFormErrorMessage = (name: string) => {
    return errors[name] ? (
      <small className="p-error">{`${errors[name]?.message}`}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: required ? 'Field is required' : undefined, validate: validate }}
      render={({ field: { name, onChange, value }, fieldState: { error } }) => (
        <div className={className}>
          <label htmlFor={name} className={classNames({ 'p-error': errors.value })}></label>

          <span className="p-float-label">
            <InputText
              id={name}
              value={value}
              type={type}
              className={classNames({ 'p-invalid': error })}
              onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={name}>{label}</label>
          </span>
          {getFormErrorMessage(name)}
        </div>
      )}
    />
  );
};

export default ControlledInput;
