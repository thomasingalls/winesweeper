import React, { Component } from 'react';

// based loosely on minidaemon found at MDN
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#A_little_framework
class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeElapsed: props.timeElapsed || 0,
      paused: props.running, // for updating ui
    };

    this.PAUSED = true; // for using in calculations
    this.INTERVAL = 100; // ms
    this.INCREMENT = 1; // in tenths of a second
    this.SESSION = -1;

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.synchronize = this.synchronize.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.running !== this.props.running) {
      nextProps.running ? this.start() : this.stop();
    }

    if (nextProps.reset) {
      this.reset();
    }

    return nextProps;
  }


  count(owner) {
    owner.setState.call(owner, {
      timeElapsed: owner.state.timeElapsed + owner.INCREMENT,
    });
  }

  synchronize() {
    if (this.PAUSED) { return; }
    clearInterval(this.SESSION);
    this.SESSION = setInterval(this.count, this.INTERVAL, this);
  }

  start() {
    if (this.PAUSED)  {
      this.PAUSED = false;
      this.setState({ paused: false });
      this.synchronize();
    }
  }

  stop() {
    this.PAUSED = true;
    this.setState({
      paused: true,
    });
    clearInterval(this.SESSION);
  }

  reset() {
    return this.setState({
      timeElapsed: 0,
    });
  }

  formatNumber(num) {
    num /= 10;
    return num.toFixed(1);
  }

  render() {
    return (
      <div>
        <pre style={{ fontWeight: 'bold' }}>
          {this.formatNumber(this.state.timeElapsed)}
        </pre>
        {/*<button
          onClick={this.start}
          disabled={!this.state.paused}
        >
          start
        </button>
        <button
          onClick={this.stop}
        >
          stop
        </button>
        <button
          onClick={this.reset}
          disabled={!this.state.paused}
        >
          reset
        </button>*/}
      </div>
    );
  }
}

export default Timer;
