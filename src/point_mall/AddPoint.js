import React from 'react';
import axios from 'axios';
import DataHelper from '../DataHelper';
import { inject } from 'mobx-react';



@inject('authStore')
class AddPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userPoint: null,
            addPoint: '',
        }
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'userPoint') {
            this.setState({
                addPoint: target.value
            });
        }

    }


    componentDidMount() {
        this.getUser();
    }



    getUser = () => {
        const { authStore } = this.props;
        axios.get(
            DataHelper.baseURL() + '/me/', {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        ).then((response) => {
            const user = response.data;
            this.setState({
                user: user
            });
        });
    }

    Add = () => {
        const usersId = this.state.user.id;
        const addPoint = this.state.addPoint;
        const { authStore } = this.props;
        axios.post(DataHelper.baseURL() + '/users/' + usersId + '/point_charge/',
            {
                point: addPoint
            },
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
            ).then((response) => {
                alert("포인트 추가완료");
                const point = response.data.point;
                const user =response.data;
                console.log(response.data)
                this.setState({
                    user: user,
                    userPoint: point
                });
            });

    }

    render() {
        const user = this.state.user;
        const NowPoint = user ? user.point : 0;
        const point = this.state.addPoint;

        return (
            <div>
                <div id="container">
                    <h1>포인트 추가하기</h1>
                    <h2>현재 포인트 : {NowPoint} Point</h2>
                    <h2>
                        포인트 추가 : &nbsp;
                        <input type="number" value={point}
                            onChange={this.onInputChanged}
                            name="userPoint" />
                        &nbsp; Point
                    </h2>
                    <p align="right">
                        <input type="button" value = "추가" onClick={this.Add}/>
                    </p>
                </div>
            </div>
           
        );
    }
}

export default AddPoint;