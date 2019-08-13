import React from 'react';
import { inject } from 'mobx-react';



@inject('authStore', 'httpService')
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
        this.props.httpService.getMe()
            .then((user) => {
                this.setState({
                    user: user
                });
            });
    }

    Add = () => {
        const userId = this.state.user.id;
        const addPoint = this.state.addPoint;
        this.props.httpService.addPoint(userId,addPoint)
            .then((user) => {
                alert("포인트 추가완료");
                this.setState({
                    user: user,
                    userPoint: user.point
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