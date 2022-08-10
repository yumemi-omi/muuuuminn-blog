import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren;

const Button = ({ children }: ButtonProps) => (
  <button className="btn-blue">{children}</button>
);

export default Button;
