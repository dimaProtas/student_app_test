import React from 'react';
import Header from './Header.jsx';
import { connect } from 'react-redux';
import {logout} from '../../reduser/auth-reduser.js';

class HeaderContainer extends React.Component {
    render() {
        return(
            <Header {...this.props} />
        )
    }
} 

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    username: state.auth.username,
});

export default connect(mapStateToProps, {logout})(HeaderContainer)
