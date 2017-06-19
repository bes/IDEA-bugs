import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { countUp } from "../redux/repos/count-repo";
import { MyClass } from "lib-util/my-class";
import { anotherFunction } from "lib-util/my-exported-function";

class BaseView extends React.Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        countUp: PropTypes.func.isRequired,
        myClass: PropTypes.object.isRequired,
    };

    callMyClass() {
        // IDEA 2017.2 EAP can't find/navigate to myFunction
        this.props.myClass.myFunction();
    }

    render() {
        anotherFunction();

        return (
            <div>
                <div>
                Count: {this.props.count}
                </div>
                <div>
                    <a onClick={this.props.countUp} href="#">Count up</a>
                </div>
                <div>
                    <a onClick={() => this.callMyClass()} href="#">Call MyClass.myFunction</a>
                </div>
            </div>
        );
    }
}

const connected = connect(
    (state) => {
        return {
            count: state.count.count,
        };
    },
    (dispatch) => {
        return {
            countUp: () => dispatch(countUp()),
            myClass: new MyClass(dispatch),
        };
    }
)(BaseView);

export { connected as BaseView };
