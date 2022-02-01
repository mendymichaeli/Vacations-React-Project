import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
    }
    toggleNavbar() {

        this.setState({
            collapsed: !this.state.collapsed,
        });
        console.log(this.state)
    }

    logoutBtn() {
        localStorage.clear();
        this.props.logOut(false);
    }

    render() {
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse hide d-flex justify-content-end small-menu-close' : 'collapse navbar-collapse show small-menu-open text-dark';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return (
            <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-light">
                <div className="container nav-wrapper mycontainer ">

                    <span className="navbar-brand" href="#">Welcome Mr/s. {this.props.name}</span>
                    <button onClick={() => this.toggleNavbar()} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"  >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`${classOne} ` + " "} id="navbarResponsive" >
                        {
                            this.props.role === 1
                                ?
                                <ul className="navbar-nav smooth-scroll">
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">Current vacations</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add" className="nav-link">Add new vacation</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/chart" className="nav-link">Reports</Link>
                                    </li>
                                    <li className="nav-item"><Link to="/" className="nav-link" onClick={() => this.logoutBtn()}>
                                        <i className="fa fa-sign-out text-danger" aria-hidden="true">Logout</i> </Link>
                                    </li>
                                </ul>

                                :
                                <ul className="navbar-nav smooth-scroll">
                                    <li className="nav-item"><Link to="/" className="nav-link" onClick={() => this.logoutBtn()}>
                                        <i className="fa fa-sign-out text-danger" aria-hidden="true">Logout</i> </Link>
                                    </li>
                                </ul>
                        }
                    </div>
                </div>
            </nav>

        )
    }




}

const mapStateToProps = state => {
    return {
        isLogged: state.isLogged,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOut(value) {
            dispatch({
                type: 'logOut',
                payload: value
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);