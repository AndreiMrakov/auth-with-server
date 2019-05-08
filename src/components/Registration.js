import React from 'react';
import {signIn} from "../webapi";

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            pass1: '',
            pass2: '',
        };
        this.regSend = this.regSend.bind(this);
        this.handleChanger = this.handleChanger.bind(this);
    }

    regSend(e) {
        e.preventDefault();
        if(this.state.pass1 === this.state.pass2) {
            let newUser = {email: this.state.email, name: this.state.name, pass: this.state.pass1};
            signIn('http://localhost:8080/add/', newUser).then(res => {
                alert(`User ${res.email} registered  successfully!`);
                this.props.history.push('/login');
            }).catch(rej => alert(rej));
        }  else alert('Passwords must be the same!');
    }

    handleChanger(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className='reg-container'>
                <h1>Registration</h1>
                <form onSubmit={this.regSend}>
                    <div className='reg-name'>
                        <label>Name:
                            <input type="text"
                                   name='name'
                                   placeholder='name'
                                   onChange={this.handleChanger}
                                   value={this.state.name}/>
                        </label>
                    </div>
                    <div className='reg-email'>
                        <label>Email:
                            <input type="email"
                                   name='email'
                                   placeholder='email'
                                   onChange={this.handleChanger}
                                   value={this.state.email}/>
                        </label>
                    </div>
                    <div className='reg-pass'>
                        <label>Password:
                            <input type="password"
                                   name='pass1'
                                   placeholder='password'
                                   onChange={this.handleChanger}
                                   value={this.state.pass}/>
                        </label>
                    </div>
                    <div className='reg-pass'>
                        <label>Repeat password:
                            <input type="password"
                                   name='pass2'
                                   placeholder='password'
                                   onChange={this.handleChanger}
                                   value={this.state.pass}/>
                        </label>
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Registration;