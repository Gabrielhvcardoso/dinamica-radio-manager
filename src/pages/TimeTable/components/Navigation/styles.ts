import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectorsContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const Selected = styled.span`
  background-color: #202020;
  border-radius: 16px;
  color: white;
  cursor: default;
  font-weight: 100;
  padding: 5px 15px;
  text-align: center;
  width: 130px;
`;

interface SelectorProps {
  selected?: boolean; 
}

export const Selector = styled.span<SelectorProps>`
  background-color: ${props => props.selected ? '#8BC298' : '#202020' };
  border-radius: 16px;
  color: white;
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  margin: 0px 5px;
  text-align: center;
  transition: .2s;
  width: 32px;

  &:hover {
    background-color: #303030;
  }
`;

export const AddButton = styled(motion.span)<SelectorProps>`
  background-color: ${props => props.selected ? '#8BC298' : '#202020' };
  border-radius: 16px;
  color: white;
  cursor: pointer;
  height: 32px;
  float: right;
  line-height: 32px;
  margin: 0px 5px;
  min-width: 32px;
  padding: 0px 15px;
  position: absolute;
  right: 0px;
  text-align: center;
  transition: .2s;

  &:hover {
    background-color: #303030;
    box-shadow: 0px 0px 10px #00000033;
  }
`;