import React from 'react';
import { withRouter } from 'react-router-dom'
import {inject} from 'mobx-react';


@inject('authStore', 'httpService')
class Login extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            username: 'admin',
            password: '4444'
        };
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'username') {
            this.setState({
                username: target.value
            });
        }
        else if (target.name === 'password') {
            this.setState({
                password: target.value
            });
        }
    }

    login = () => {
       this.props.httpService.login(
            this.state.username,
            this.state.password
           ).then((token) => {
                const {authStore, history} = this.props;
                alert(this.state.username);
                history.push('/');
            });
        // const authorization = 'Basic ' + btoa(this.state.username + ":" + this.state.password);
        // localStorage.setItem('authorization', authorization);
        // this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div id="container">
                    <p>
                        <label>아이디</label>
                        <input type="text" value={this.state.username}
                            onChange={this.onInputChanged}
                            name="username" />
                    </p>
                    <p>
                        <label>비밀번호</label>
                        <input type="password" value={this.state.password}
                            onChange={this.onInputChanged}
                            name="password" />
                    </p>
                    <button onClick={this.login}>로그인</button>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);