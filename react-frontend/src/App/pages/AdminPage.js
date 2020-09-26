import React from 'react';
import {Form} from "react-bootstrap";
import {FormCenter} from "../components/Form";

export default function AdminPage(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [auth, setAuth] = React.useState('');
    const [role, setRole] = React.useState('GP');

    function submit() {
        console.log('role: ' + role);
        console.log('attempting to log in with auth: "' + auth + '"');
        fetch('http://localhost:5000/addUser', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify({ email, password, auth, role })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status) {
                    alert('Successfully created user.');
                } else {
                    alert('Failed to create user.');
                }
            });
    }

    return (
        <>
            <a href="#" onClick={() => props.onBack()}>back to login</a>
            <FormCenter>
                <Form className="col-12 login-form" action="" method="POST" onSubmit={e => {
                    e.preventDefault();
                    submit();
                }}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type='email' name='email' id='email' className="form-control" required
                               onChange={event => setEmail(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type='password' name='password' id='password' className="form-control" pattern=".{6,}"
                               title="Six or more characters" onChange={event => setPassword(event.target.value)}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Admin Password</label>
                        <input type='password' name='adminpassword' id='adminpassword' className="form-control"
                               pattern=".{6,}"
                               title="Six or more characters" onChange={event => setAuth(event.target.value)}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <input type="radio" id="role1" name="role" value="GP" checked="checked" onChange={event => {
                            event.target.value ? setRole('GP') : setRole('pharmacist');
                        }}/>
                        <label htmlFor="role1">GP</label>
                        <input type="radio" id="role2" name="role" value="Pharmacist" onChange={event => {
                            event.target.value ? setRole('pharmacist') : setRole('GP');
                        }}/>
                        <label htmlFor="role2">Pharmacist</label>
                    </div>
                    <div className="col-12 text-center">
                        <button className="button button-round button-green" type="submit">Create user</button>
                    </div>
                </Form>
            </FormCenter>
        </>
    )
}