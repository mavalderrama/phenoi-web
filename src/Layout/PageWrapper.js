import React, {Component, Fragment} from "react";
import {Route,Link} from 'react-router-dom'
export default class PageWrapper extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (<Fragment>
            <header>
                <nav>
                    <u>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/">Welcome</Link></li>
                        <li><Link to="/map">Map</Link></li>
                    </u>
                </nav>
            </header>
            <section>
                {this.props.children}
            </section>
            <footer>
                Developed by CIAT
            </footer>

        </Fragment>)
    }
}