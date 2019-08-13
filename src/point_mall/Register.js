import React from 'react';
import { withRouter } from 'react-router-dom'
import { inject } from 'mobx-react';

@inject('httpService')
class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
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

    register = () => {
       this.props.httpService.register(
           this.state.username,
           this.state.password
       ).then((response) => {
                const { history } = this.props;
                history.push('/login');
            });
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
                    <button onClick={this.register}>회원가입</button>
                </div>
            </div>
        )
    }
}



export default withRouter(Register);