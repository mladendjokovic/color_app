import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";
import { withStyles } from "@material-ui/styles";
import sizes from "./styles/sizes";

const styles = {
	dragableColors: {
	    display: "grid",
 	    gridTemplateColumns: "repeat(5, 1fr)",
	    gridTemplateRows: "repeat(4, 1fr)",
	    height: "100%",
	    [sizes.down("md")]: {
		gridTemplateColumns: "repeat(2, 1fr)",
		gridTemplateRows: "repeat(10, 1fr)"
		},
	    [sizes.down("xs")]: {
		gridTemplateColumns: "repeat(1, 1fr)",
		gridTemplateRows: "repeat(20, 1fr)"
		}
  	}
}

const DraggableColorList = SortableContainer(({ classes, colors, removeColor }) => {
  return (
    <div className={classes.dragableColors}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
});
export default withStyles(styles)(DraggableColorList);
