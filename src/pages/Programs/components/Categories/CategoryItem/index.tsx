import update from 'immutability-helper';
import React, { useContext, useEffect, useState } from 'react';
import { Category } from '../../../../../types/Category';
import { CategoryItem as CategoryItemContainer } from './styles';
import Alert from '../../../../../components/Alert';

import ProgramsPageContext from '../../../context';
import { useFetch } from '../../../../../hooks';
import { AnimatePresence } from 'framer-motion';

const CategoryItem: React.FC<{ item: Category }> = (props) => {
  const { selectedCategories, setSelectedCategories, categories, setCategories, programs, setPrograms } = useContext(ProgramsPageContext);
  const [isSelected, setIsSelected] = useState<boolean>(selectedCategories.some((categoryId) => categoryId === props.item.categoryId));

  const [isError, setIsError] = useState<boolean>(false);

  const handleClick = () => {
    if (isSelected) {
      const newSelectedCategories = selectedCategories.filter((categoryId) => categoryId !== props.item.categoryId);
      setSelectedCategories(newSelectedCategories);
    } else {
      setSelectedCategories(update(selectedCategories, {
        $push: [props.item.categoryId]
      }));
    }
  };

  const onDelete = (onEnd: () => void) => {
    const { categoryId } = props.item;

    useFetch.delete(`/cat/${categoryId}`, (response) => {
      if (response.code === 'success') {
        onEnd();
        setCategories(categories.filter(item => item.categoryId !== categoryId));
        setSelectedCategories(selectedCategories.filter(item => item !== categoryId));
        const newprograms = programs.map((item) => ({
          ...item,
          tags: item.tags ? item.tags.filter((tag) => tag !== categoryId) : item.tags
        }));

        setPrograms(newprograms);
      } else {
        setIsError(true);
      }
    });
  };

  useEffect(() => {
    if (selectedCategories.some(categoryId => categoryId === props.item.categoryId)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [props.item.categoryId, selectedCategories]);

  return (
    <>
      <AnimatePresence>
        {
          isError && (
            <Alert error>
              Ocorreu um erro ao excluir a categoria { props.item.name }.
            </Alert>
          )
        }
      </AnimatePresence>
      <CategoryItemContainer isSelected={isSelected} onClick={handleClick} onDelete={onDelete}>
        { props.item.name }
      </CategoryItemContainer>
    </>
  );
};

export default CategoryItem;
