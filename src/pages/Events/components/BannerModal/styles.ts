import { motion } from 'framer-motion';
import styled from 'styled-components';
import DTitle from '../../../../components/Title';

export const Container = styled(motion.div)`
  background-color: #202020;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  height: 80%;
  overflow-y: auto;
  padding: 50px;
  width: 80%;
`;

export const Overlay = styled(motion.div).attrs({
  initial: { backgroundColor: 'transparent' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  exit: { backgroundColor: 'transparent' }
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .2s;  
`;

export const Title = styled(DTitle)`
  margin: 0px;
`;

export const Detail = styled.span`
  font-size: 14px;
  font-weight: 100;
`;

export const Headline = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #8BC298;
  text-transform: uppercase;
`;

export const Section = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const TextInput = styled.input`
  background-color: #171717;
  box-sizing: border-box;
  color: white;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  height: 40px;
  outline: none;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  resize: none;
`;

export const Textarea = styled.textarea`
  background-color: #171717;
  color: white;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  height: 150px;
  margin-top: 5px;
  margin-bottom: 5px;
  outline: none;
  padding: 10px;
  resize: none;
`;

export const ImagePicker = styled.label`
  background-color: #171717;
  box-sizing: border-box;
  padding: 10px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: px;
  margin-bottom: 5px;
  max-width: 200px;
  text-align: center;
  transition: .2s;

  &:hover {
    background-color: #8BC298;
    color: black;
  }
`;

export const Button = styled.button`
  background-color: #171717;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  font-size: 16px;
  height: 40px;
  padding: 0px 20px;
  transition: .2s;

  &:hover {
    background-color: #8BC298;

  }
`;
