import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import Footer from '../components/Footer';

class Home extends Component {
    render() {
        return (
            <div className="page-header">
                <div className="container text-center ">
                    <div className='home-title'>
                        <h1 className="title home-title">Vacation Style</h1>
                        <h4 className="description home-title">Find your way to the real peace!</h4>
                    </div>
                    <div className="row">
                        <Route exact path="/" component={Login} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}
export default Home;