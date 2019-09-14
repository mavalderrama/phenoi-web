import React, { Component } from "react";
import PageWrapper from "../Layout/PageWrapper";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as mosaic_actions from "../Redux/actions/mosaic_actions";
import {fabric} from "fabric";
class EditorPage extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.canvas = new fabric.Canvas('c',{ selection:false, preserveObjectStacking: true });
        this.canvas.setWidth(9000);
        this.canvas.setHeight(9000);
        this.load_raster()
    }

    load_raster = async()=>{
        const {mosaic_actions} = this.props;
        const {params} = this.props.match;
        const  response = await mosaic_actions.getMosaic(params.id);
        const {value: { data }} = response;
        if("raster" in data) {
            var layers = data.raster;
            let images = await Promise.all(layers.map((layer)=>  this.load_layer(layer)));
            images.forEach(img=>{
               this.canvas.add(img);
            });
            this.canvas.renderAll();
        }
    };
    load_layer=(base64Img)=>{
        console.log("test");
        return new Promise((resolve, reject)=>{
            base64Img = `data:image/jpeg;base64,${base64Img}`
            fabric.Image.fromURL(base64Img, (img)=>{
                //img.scale(this.scale);
                return resolve(img);
            });
        });
    };
    render() {
        return <PageWrapper>
            <canvas id="c" width="800"  height="600"  />
        </PageWrapper>;
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
        mosaic_actions: bindActionCreators(mosaic_actions, dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(EditorPage);
