import DateBetween from './DateBetween'
import moment from 'moment'
import React, {Component} from 'react'

/**
 * Count down module
 * A simple count down component.
 *
 * unitsStyle
 * valueStyle
 * units || ['天 ', ':', ':']
 *
 *
 **/
export default class Countdown extends Component {

    constructor(props) {
        super(props)
        this.state = {remaining: null}
    }

    componentDidMount() {
        this.tick()
        this.interval = setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    tick() {
        let startDate = moment()
        let endDate = moment(this.props.options.endDate)
        let remaining = DateBetween(startDate, endDate)
        // alert(remaining)

        if (remaining === false) {
            window.clearInterval(this.interval)
            this.props.options['cb'] && this.props.options.cb()
        }

        this.setState({
            remaining: remaining
            // remaining: remaining ? remaining : '已结束'
        })
    }

    render() {
        let [day, hour, minute, second] = this.props.units || ['天 ', ':', ':']
        // let units = [day, hour, minute, second]

        if (!this.state.remaining) {
            return <div style={this.props.unitsStyle}>已结束</div>
        }

        return this.state.remaining ?
            <div style={{flexDirection: 'row'}}>
                {this.state.remaining[0] ?
                    <span><span style={this.props.valueStyle}>{this.state.remaining[0]}</span><span
                        style={this.props.unitsStyle}>{day || ''}</span></span> : null}
                {this.state.remaining[1] ?
                    <span><span style={this.props.valueStyle}>{this.state.remaining[1]}</span><span
                        style={this.props.unitsStyle}>{hour || ''}</span></span> : null}
                {this.state.remaining[2] ?
                    <span><span style={this.props.valueStyle}>{this.state.remaining[2]}</span><span
                        style={this.props.unitsStyle}>{minute || ''}</span></span> : null}
                {this.state.remaining[3] ?
                    <span><span style={this.props.valueStyle}>{this.state.remaining[3]}</span><span
                        style={this.props.unitsStyle}>{second || ''}</span></span> : null}
            </div> : null


        // let remaining = ''
        // for (let i in this.state.remaining) {
        //     this.state.remaining[i] && (remaining += (this.state.remaining[i] + (units[i] ? units[i] : '')))
        // }
        // return (
        //     <div className="react-count-down">
        //         <span className="date"> {remaining}</span>
        //         <span className="prefix"> {this.props.options.prefix}</span>
        //     </div>
        // )
    };
}
