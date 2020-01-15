import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import React from "react";


class State implements TRState {
    message: any = [];
    websocketHolder?: WebSocket
}

interface Props extends TRProps {
    url: string;
}

export default class WebSocketView extends TRReactComponent<Props, State> {

    state: State = new State();
    websocket = new WebSocket("ddd");


    componentDidMount() {
        let _this = this;
        if (this.props.url) {
            this.state.websocketHolder = new WebSocket(this.props.url);
            this.state.websocketHolder.addEventListener("message", (event: any) =>{
                _this.appendText(event.data)
            })
        }
    }

    appendText(text: string) {
        this.state.message.push(text);
        this.setState({
            message: this.state.message
        })
    }

    render() {
        const {} = this.props;
        return (<React.Fragment>
            <span>{this.state.message}</span>
        </React.Fragment>);
    }
}