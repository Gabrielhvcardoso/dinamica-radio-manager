import styled from 'styled-components';

export const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 100px;
  position: relative;

  @media (max-width: 600px) {
    padding: 20px;
  }
`;

export const BackImage = styled.img`
  position: absolute;
  mask-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  pointer-events: none;
  width: 100%;
  height: 500px;
  top: 0px;
  left: 0px;
  right: 0px;
  object-fit: cover;
`;

export const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const Button = styled.button`
  background-color: #8BC298;
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  font-size: 14px;
  height: 40px;
  margin-top: 10px;
  text-transform: uppercase;
  width: 100%;
`;

interface TextInputProps {
  error?: boolean;
}

export const TextInput = styled.input<TextInputProps>`
  background-color: #111;
  box-sizing: border-box;
  color: white;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid ${props => props.error ? 'red' : 'transparent'};
  border-radius: 4px;
  height: 40px;
  outline: none;
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
`;

export const Label = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #8BC298;
  text-transform: uppercase;
`;

export const Logo = styled.div`
  background-color: #8BC298;
  border-radius: 25px;
  height: 50px;
  width: 50px;
`;
