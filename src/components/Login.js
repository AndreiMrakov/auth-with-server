import React from 'react';
import {logIn} from "../webapi";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
        };
        this.handleChanger = this.handleChanger.bind(this);
        this.loginSend = this.loginSend.bind(this);
    }

    handleChanger(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    loginSend(e) {
        e.preventDefault();
        let user = {email: this.state.email, pass: this.state.pass};
        logIn('http://localhost:8080/login/', user).then((res) => {
            this.props.load(res);
            localStorage.setItem('user',JSON.stringify(user));
            alert(`You are logged in as ${res.email}`);
            this.props.history.push('/profile');
        }).catch(rej => alert(rej));
    }

    componentDidMount() {
        console.log(localStorage);
        logIn('http://localhost:8080/login/', JSON.parse(localStorage.getItem('user'))).then((res) => {
            this.props.load(res);
            this.props.history.push('/profile');
        }).catch(rej => console.log(rej.message));
    }

    render() {
        return (
            <div className='login-container'>
                <h1>Login</h1>
                <form onSubmit={this.loginSend}>
                    <div className='log-email'>
                        <input type="email"
                               name='email'
                               placeholder='email'
                               onChange={this.handleChanger}
                               value={this.state.email}
                               required/>
                    </div>
                    <div className='log-pass'>
                        <input type="password"
                               name='pass'
                               placeholder='password'
                               onChange={this.handleChanger}
                               value={this.state.pass}
                               required/>
                    </div>
                    <div className='log-submit'>
                        <button>Log in</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;