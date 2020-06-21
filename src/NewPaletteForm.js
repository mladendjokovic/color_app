import React, {Component} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import NewPaletteNav from './NewPaletteNav';
import DragableColorList from './DragableColorList';
import arrayMove from 'array-move';
import {ChromePicker} from 'react-color';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  Palette: {
    height: "90vh"
  }
});

class NewPaletteForm extends Component {
  static defaultProps = {maxNum: 20}
    constructor(props){
        super(props);
        this.state ={currentColor: 'blue',newColorName: "", open: false, colors: [...this.props.palettes[0].colors]}
    }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorUnique", value => {
      return this.state.colors.every(color =>  color.name !== value.toLowerCase())
  })
  }
  handleDrawerOpen = () => {
    this.setState({open:true});
  };

  handleDrawerClose = () => {
    this.setState({open:false});
  };
  handleChangeComplete = (color, event) => {
    this.setState({currentColor: color.hex});
  };
  clearPalette = () => {
      this.setState({colors: []});
  };
  removeColor = name => {
      let colors = [...this.state.colors];
      colors = colors.filter(color => color.name !== name)
      this.setState({colors})
  }
  randomColor = () => {
    const palette = this.props.palettes[Math.floor(Math.random() * this.props.palettes.length)]
    console.log(palette)
    const randomColor = palette.colors[Math.floor(Math.random() * palette.colors.length)]
    console.log(randomColor)
    if(this.state.colors.find(color => color.name === randomColor.name)) {
      return this.randomColor()
    } else {
    this.setState({colors: [...this.state.colors, randomColor]})
    }
  }
  createPalette = newPalette => {
    const palette = { paletteName: newPalette, id: newPalette.replace(/ /g, "-"),emoji: "D" , colors: this.state.colors }
    this.props.addPalette(palette)
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
}
handleSubmit = e => {
    e.preventDefault();
    const color = {name: this.state.newColorName, color: this.state.currentColor}
    this.setState({colors: [...this.state.colors, color],newColorName: ""});
}
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };
    render() {
        const {classes, palettes} = this.props
        const {open} = this.state
        return (
            <div className={classes.root}>
                <NewPaletteNav open={open} palettes={palettes} handleDrawerOpen={this.handleDrawerOpen}  createPalette={this.createPalette} />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <h2>Add new Color</h2>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.clearPalette}>Clear Palette</Button>
                        <Button variant="contained" color="primary" onClick={this.randomColor} 
                        disabled={this.props.maxNum <= this.state.colors.length}>Random Color</Button>
                    </div>
                    <ValidatorForm 
                    ref="form"
                    onSubmit={this.handleSubmit}>
                    <ChromePicker color={this.state.currentColor} onChangeComplete={this.handleChangeComplete}/>
                    <TextValidator 
                            label="new color name"
                            name="newColorName"
                            value={this.state.newColorName}
                            validators={['required', "isColorUnique"]}
                            errorMessages={["this field can't be empty", "color name must be unique"]}
                            onChange={this.handleChange}/>
                    <Button variant="contained" color="primary" type="submit" disabled={this.props.maxNum <= this.state.colors.length} style={{background: this.state.currentColor}}>Add Color</Button>
                    </ValidatorForm>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <div className={classes.Palette}>
                        <DragableColorList colors={this.state.colors} removeColor={this.removeColor} onSortEnd={this.onSortEnd} axis="xy" />
                    </div>

                </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm)