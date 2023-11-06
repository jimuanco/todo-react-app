import { DeleteOutline } from "@mui/icons-material";
import { Checkbox, IconButton, InputBase, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";
import { useState } from "react";

const Todo = (props) => {

  const [item, setItem] = useState(props.item);
  const deleteItem = props.deleteItem;

  const deleteEventHandler = () => {
    deleteItem(item);
  }

  return (
    <ListItem>
      <Checkbox checked={item.done}/>
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked" }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={deleteEventHandler} >
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default Todo;