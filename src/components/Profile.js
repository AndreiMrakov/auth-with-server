import React from 'react';
import {getUserInfo, updateProfile, logOut} from "../webapi";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            oldName: '',
            newName: '',
            oldPhone: '',
            newPhone: '',
            oldAddress: '',
            newAddress: '',
        };
        this.handleChanger = this.handleChanger.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        getUserInfo(`http://localhost:8080/getuser`, this.props.user).then(res => {
            this.setState({email: res.email, oldName: res.name, oldPhone: res.phone, oldAddress: res.address});
        }).catch(rej => alert(rej));
    }

    handleChanger(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    updateUser(e) {
        e.preventDefault();
        let user = {
            "email": this.state.email,
            "pass": this.props.user.pass,
            "name": this.state.newName,
            "phone": this.state.newPhone,
            "address": this.state.newAddress
        };

        updateProfile('http://localhost:8080/update', user).then(res => {
            this.setState({email: res.email, oldName: res.name, newName: '', oldPhone: res.phone, newPhone: '', oldAddress: res.address, newAddress: ''});
        }).catch(rej => {
            this.props.logOut();
            this.props.history.push('/login');
            alert(rej);
        });
    }

    logoutUser() {
        logOut('http://localhost:8080/logout', this.state.email).then(req => {
            localStorage.clear();
            this.props.logOut();
            alert(req);
            this.props.history.push('/login');
        }).catch(rej => alert(rej));
    }

    render() {
        return (
            <div className='user-container'>
                <h1>Profile</h1>
                <form onSubmit={this.updateUser}>
                    <div className='user-email'>
                        <label>Email:
                            <input type="email"
                                   name='email'
                                   value={this.state.email}
                                   disabled/>
                        </label>
                    </div>
                    <div className='user-name'>
                        <label>Old name:
                            <input type="text"
                                   name='oldName'
                                   value={this.state.oldName}
                                   disabled/>
                        </label>
                    </div>
                    <div className='user-name'>
                        <label>New name:
                            <input type="text"
                                   name='newName'
                                   placeholder='Enter new name'
                                   onChange={this.handleChanger}
                                   value={this.state.newName}/>
                        </label>
                    </div>
                    <div className='user-phone'>
                        <label>Old phone:
                            <input type="text"
                                   name='oldPhone'
                                   value={this.state.oldPhone}
                                   disabled/>
                        </label>
                    </div>
                    <div className='user-phone'>
                        <label>New phone:
                            <input type="text"
                                   name='newPhone'
                                   placeholder='Enter new phone'
                                   onChange={this.handleChanger}
                                   value={this.state.newPhone}/>
                        </label>
                    </div>
                    <div className='user-address'>
                        <label>Old address:
                            <input type="text"
                                   name='oldAddress'
                                   value={this.state.oldAddress}
                                   disabled/>
                        </label>
                    </div>
                    <div className='user-address'>
                        <label>New address:
                            <input type="text"
                                   name='newAddress'
                                   placeholder='Enter new address'
                                   onChange={this.handleChanger}
                                   value={this.state.newAddress}/>
                        </label>
                    </div>
                    <div className='user-submit'>
                        <button>Save</button>
                        <input type='button'
                               onClick={this.logoutUser}
                               value='Log out'/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;