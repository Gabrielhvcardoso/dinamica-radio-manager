import { motion } from 'framer-motion';
import styled from 'styled-components';
import DTitle from '../../../../components/Title';

export const ImageBackdrop = styled.img`
  mask-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  height: 200px;
  width: 100%;
  left: 0px;
  object-fit: cover;
  position: absolute;
  top: 0px;
`;

export const CloseButton = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
`;

interface ContainerProps {
  isMobile?: boolean;
}

export const Container = styled(motion.div)<ContainerProps>`
  align-self: ${props => props.isMobile ? 'flex-start' : 'flex-end'};
  background-color: #202020;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  max-height: ${props => props.isMobile ? '100%' : '80%'};
  margin-top: ${props => props.isMobile ? '20px' : '0px'};
  overflow-y: auto;
  padding: ${props => props.isMobile ? '20px 20px 110px 20px' : '50px'};
  position: relative;
  width: ${props => props.isMobile ? '95%' : '80%'};
`;

export const Title = styled(DTitle)`
  margin: 0px;
  line-height: 100%;
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
  width: 100%;
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
  margin-top: 5px;
  margin-bottom: 5px;
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
    color: black;
  }
`;

export const Helper = styled.span`
  font-size: 12px;
  font-weight: 100;
`;
