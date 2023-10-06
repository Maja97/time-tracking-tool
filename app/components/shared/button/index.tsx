import { Button as BaseButton } from 'primereact/button';
import styles from './index.module.scss';

type Variant = 'primary' | 'secondary' | 'underlined';

interface Props {
  children: JSX.Element | string;
  variant?: Variant;
  icon?: JSX.Element;
  disabled?: boolean;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  textStyle?: string;
  onClick?: () => void;
}

const Button = ({
  onClick,
  children,
  variant = 'primary',
  icon,
  disabled = false,
  className,
  type = 'button',
  textStyle
}: Props) => {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${styles[variant]} ${styles.base} ${className}`}
      icon={icon}>
      {typeof children === 'string' ? <p className={textStyle}>{children}</p> : children}
    </BaseButton>
  );
};

export default Button;
