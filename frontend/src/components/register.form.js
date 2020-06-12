import React, { Component } from "react";
import classnames from "classnames";

class RegisterForm extends Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        console.log("Submitting:");
        console.log(newUser);

        /*
        this.props.registerUser(
            newUser,
            this.props.history
        );
        */
    }

    render() {
        const { errors } = this.state;

        return (
        <form noValidate onSubmit={ this.onSubmit } style={{textAlign:"left"}}>

            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.name }
                    )}
                    onChange={ this.onChange }
                    value={ this.state.name }
                    error={ errors.name }
                    id="name"
                    type="text"
                />
                <p className="text-danger">{ errors.name }</p>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.email }
                    )}
                    onChange={ this.onChange }
                    value={ this.state.email }
                    error={ errors.email }
                    id="email"
                    type="email"
                />
                <p className="text-danger">{ errors.email }</p>
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    className={classnames(
                        "form-control",
                        { invalid: errors.password }
                    )}
                    onChange={ this.onChange }
                    value={ this.state.password }
                    error={ errors.password }
                    id="password"
                    type="password"
                />
                <p className="text-danger">{ errors.password }</p>
            </div>

            <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                    className={classnames(
                        "form-control",
                        { invalid: errors.password2 }
                    )}
                    onChange={ this.onChange }
                    value={ this.state.password2 }
                    error={ errors.password2 }
                    id="password2"
                    type="password"
                />
                <p className="text-danger">{ errors.password2 }</p>
            </div>

            <div className="form-group">
                <p className="small" style={{textAlign: "center"}}>
                    {"By clicking Agree & Register, \
                    you agree to the Boilerplate User Agreement, \
                    Privacy Policy, and Cookie Policy."}
                </p>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-block btn-primary">
                    Agree and Register
                </button>
            </div>

        </form>
        );
    }

}

export default RegisterForm;