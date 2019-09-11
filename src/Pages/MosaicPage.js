import React, { Component } from "react";
import PageWrapper from "../Layout/PageWrapper";
import ChevronRightIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";

export default class MosaicPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {id} = this.props.match.params;
        // axios.get("get_resource").then(res=>{
        //     var img = res.data
        // })
    }
    render() {
        return <PageWrapper>
            <div>
            Hello everybody!!!
            </div>
        </PageWrapper>;
    }
}
