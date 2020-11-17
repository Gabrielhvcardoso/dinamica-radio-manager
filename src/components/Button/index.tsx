import React from 'react';
import { Button as ButtonComponent, Label } from './styles';

interface ButtonProps {
  children?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick = () => {} }) => {
  return (
    <ButtonComponent onClick={onClick} className="rotating-dashed">
      <Label>
      { children }      
      </Label>
    </ButtonComponent>
  );
}

export default Button;
