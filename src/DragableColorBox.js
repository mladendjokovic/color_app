import React from 'react';
import { withStyles } from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';

const styles = {
    ColorBox: {
      width: "20%",
      height: "25%",
      margin: "0 auto",
      display: "inline-block",
      position: "relative",
      cursor: "pointer",
      marginBottom: "-3.5px",
      "&:hover svg" : {
        transform: "scale(1.5)",
        color: "white"
        }
    },
    colorName: {
        color: "white"
      },
    delete: {
        transition: "all .3s"
    },
      boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between"
    }
}


const DragableColorBox = SortableElement((props) => {
    const {classes, name, background, removeColor} = props
    return (
        <div className={classes.ColorBox} style={{background}}>
            <div className={classes.boxContent}>
                <span className={classes.colorName}>{name}</span>
                <span ><DeleteIcon className={classes.delete} onClick={() => removeColor(name)} /></span>
            </div>
        </div>
    );
})

export default withStyles(styles)(DragableColorBox)