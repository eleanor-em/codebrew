/* Purpose: Renders signup form or login form  */

import React from 'react';
import {Form} from 'react-bootstrap';
function FormCenter(props) {
    return (
        <div className="form-center py-5">
            <div className="modal-dialog modal-dialog-centered">
                <div className="col-12">
                    <div className="modal-content">
                        <div className="col-12 form-logo text-center">
                            <img src={require('../static/images/hc_logo.png')} alt="logo"></img>
                        </div>
                        { props.children }
                    </div>
                </div>
            </div>
        </div>

    );
}

function LoginForm(props) {
    return (
        <FormCenter>
            <Form className="col-12 login-form" method="POST" action="/validateLogin">
                <div className="form-group">
                    <label>Email</label>
                    <input type='email' name='email' id ='email' className="form-control" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type='password' name='password' id ='password' className="form-control" pattern = ".{6,}"
                    title = "Six or more characters" required/>
                </div>
                <div className="col-12 text-center">
                    <button className="button button-round button-green" type="submit">Login</button>
                </div>
                {/* <div className="form-group text-center">
                    <span className="form-switcher" onClick={props.register}>Register</span>
                    <span> | </span>
                    <a className="form-switcher" href="/forgotPassword">Forgot your Password?</a>
                </div> */}
            </Form>
        </FormCenter>
    );
}

export { FormCenter, LoginForm };
