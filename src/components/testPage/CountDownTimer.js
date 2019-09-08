import React from "react";

import { Wrapper, Text } from "./CountDownTimer.styled";

class CountDownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemainingInMinutes: props.startTimeInMinutes,
      timer: 0
    };
  }

  decrementTimeRemaining = () => {
    if (this.state.timeRemainingInMinutes > 0) {
      this.setState({
        timeRemainingInMinutes: this.state.timeRemainingInMinutes - 1
      });
      if (this.state.timeRemainingInMinutes === 0) {
        this.props.setTestFinished();
      }
    } else {
      clearInterval(this.state.timer);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.startTimeInMinutes === 0) {
      clearInterval(this.state.timer);
      this.setState({ timeRemainingInMinutes: 0 });
    }
  }

  componentDidMount() {
    this.state.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 60000);
  }

  render() {
    return (
      <Wrapper>
        <Text>{this.state.timeRemainingInMinutes} хвилин залишилось</Text>
      </Wrapper>
    );
  }
}

export default CountDownTimer;
