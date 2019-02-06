import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../actions";
import ValidatorUtil from "../helper/validator";

class LoginComponent extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <p>{error}</p>;
    }
  };

  renderEmailInput = ({ label, input, meta, type }) => {
    console.log(meta);
    const className = `field ${meta.error && meta.touched && "error"}`;
    return (
      <div className={className}>
        <div className="ui left icon input">
          <i className="user icon" />
          <input
            {...input}
            type={type}
            placeholder="Enter email address"
            autoComplete="off"
          />
        </div>
      </div>
    );
  };

  renderPasswordInput = ({ input, meta, type }) => {
    const className = `field ${meta.error && meta.touched && "error"}`;
    return (
      <div className={className}>
        <div className="ui left icon input">
          <i className="lock icon" />
          <input
            {...input}
            type={type}
            placeholder="Password"
            autoComplete="off"
          />
        </div>
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.loginUser(formValues);
  };

  render = () => {
    const { error, loading } = this.props;
    const classes = `ui large form error ${loading && "loading"}`;
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui teal image header">
            {/* <img src="assets/images/logo.png" className="image" /> */}
            <div className="content">Log-in to your account</div>
          </h2>
          <form className={classes}>
            <div className="ui stacked segment">
              <Field
                type="text"
                name="email"
                component={this.renderEmailInput}
              />
              <Field
                name="password"
                component={this.renderPasswordInput}
                type="password"
              />
              <div className="ui fluid large teal submit button">Login</div>
            </div>

            <div className="ui error message">
              {/* <Field name="email" component={this.renderError} />
              <Field name="password" component={this.renderError} /> */}
            </div>
          </form>

          <div className="ui message">
            New to us? <a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    );
  };
}

const validate = formValues => {
  const errors = {};
  const { email, password } = formValues;
  if (!ValidatorUtil.isRequired(email)) {
    errors.email = "Required";
  }
  if (!ValidatorUtil.isEmail(email)) {
    errors.email = "You must enter a valid email";
  }
  if (!ValidatorUtil.isRequired(password)) {
    errors.password = "Required";
  }
  if (!ValidatorUtil.isPassword(true, true, true, false)(password)) {
    errors.password = "You must enter a valid password";
  }
  return errors;
};
const formWrapped = reduxForm({
  form: "login",
  validate
})(LoginComponent);

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(formWrapped);
