import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 240;

const styles = theme => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
      }
})


class NewPaletteNav extends Component {
    constructor(props) {
        super(props);
        this.state = {newPaletteName: ""}
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteUnique", value => {
            return this.props.palettes.every(palette => palette.paletteName.toLowerCase() !== value.toLowerCase())
          })
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.createPalette(this.state.newPaletteName);
        this.setState({newPaletteName: ""});
    }
    render() {
        const {open, classes, handleDrawerOpen} = this.props
        return (
            <div>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Create New Palette
                        </Typography>
                    <ValidatorForm 
                    ref="form"
                    onSubmit={this.handleSubmit}
                    >
                        <TextValidator
                            label="Palette name"
                            name="newPaletteName"
                            value={this.state.newPaletteName}
                            validators={['required', "isPaletteUnique"]}
                            errorMessages={["this field can't be empty", "palette name must be unique"]}
                            onChange={this.handleChange}
                         />
                    <Button variant="contained" color="primary" type="submit">Save</Button>
                    </ValidatorForm>
                    <Link to="/">
                        <Button variant="contained" color="secondary">Back</Button>
                    </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles, {theme: true})(NewPaletteNav);