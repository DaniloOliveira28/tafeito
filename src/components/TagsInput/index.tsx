import React, { useEffect } from "react";
import {Box, Chip, TextField } from "@mui/material";
import Downshift from "downshift";
import {Tag} from '../../common/types';
import { addSyntheticTrailingComment } from "typescript";



type TagsInputProps = {
  tags: Tag[];
  placeholder: string;
  selectedTags: (tags:Tag[]) => void;
  addTag: (tags:Tag) => void;
  removeTag: (tags:Tag) => void;
}

const TagsInput = (props:TagsInputProps) => {

  const { tags, selectedTags, placeholder, addTag, removeTag } = props;

  const [inputValue, setInputValue] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState<Tag[]>([]);

  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  useEffect(() => {
    selectedTags(selectedItem);
  }, [selectedItem, selectedTags]);

  function handleKeyDown(event:any) {
    if (event.key === "Enter") {
      const newSelectedItem = [...selectedItem];
      const value:string = event?.target?.value?.trim()
      if(value){

        const duplicatedValues = newSelectedItem.filter(itemTag => itemTag.etiqueta === value)

        if (duplicatedValues.length > 0) {
          setInputValue("");
          return;
        }
        if (!value.replace(/\s/g, "").length) return;

        const newTag = {
          color: 'rgb(176,224,230)',
          etiqueta: value.trim()
        }
        newSelectedItem.push(newTag);
        addTag(newTag);
        setSelectedItem(newSelectedItem);

        setInputValue('');
      }
    }
  };



  const handleDelete = (item:any) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    removeTag(item)
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event:any) {
    setInputValue(event.target.value);
  }
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, onKeyDown } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder
          });
          return (
            <div>
              <TextField
                sx={{
                  minWidth:'70%',
                  maxWidth:'70%',
                  textDecoration: 'none'
                }}
                inputProps={{
                  style: { padding: '0px' },
                }}
                InputProps={{
                  sx:{ padding: '0px', flexWrap:'wrap' },
                  startAdornment: selectedItem.map(item => (
                    <Box mx={1} key={item.etiqueta}>

                      <Chip
                        tabIndex={-1}
                        label={item.etiqueta}
                        onDelete={handleDelete(item)}
                        size={'small'}
                        sx={{
                          backgroundColor: item.color
                        }}
                      />
                    </Box>
                  )),
                  onBlur,
                  onChange: (event:any) => {
                    handleInputChange(event);
                  },
                  onFocus,
                  onKeyDown
                }}
              />
            </div>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
}


export default TagsInput;