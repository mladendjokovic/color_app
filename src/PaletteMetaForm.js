import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, newPaletteName: ""
        }
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
        const {open, handleClose} = this.props
        return (
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                    >
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We will send updates
                                occasionally.
          </DialogContentText>
                            <TextValidator
                                label="Palette name"
                                name="newPaletteName"
                                value={this.state.newPaletteName}
                                validators={['required', "isPaletteUnique"]}
                                errorMessages={["this field can't be empty", "palette name must be unique"]}
                                onChange={this.handleChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Save
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;