import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DragableColorBox from './DragableColorBox';
import {withStyles} from '@material-ui/styles';

const styles = {
    root: {
        height: "100%"
    }
}

const SortableList = SortableContainer (({colors, classes, removeColor}) => {
    return (<div className={classes.root}>
                {colors.map((color, index) =>  
                    (<DragableColorBox key={color.name} removeColor={removeColor} index={index} background={color.color} name={color.name} />)
                )}
            </div>)
})

export default withStyles(styles)(SortableList);