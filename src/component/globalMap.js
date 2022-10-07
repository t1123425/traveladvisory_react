import React from 'react';
import { ComposableMap, Geographies, Geography, Graticule} from "react-simple-maps";
import { connect } from "react-redux";
const worldMapJson = require('../json/world-countries.json')

class Map extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            geoUrl:worldMapJson,
            currentCountryName: '',
            mapLoading:true
        };
    }
    static defaultProps = {
        msg1: '全球旅遊警示分析地圖',
        msg2:'(Global Travel Advisory Map)'
    }
    renderAreaColor = geoProperties => {
        let tdata = this.props.tDataList;
        let returnValue = '#d6d8db';
        let colorMap = {
            red:'#fb655a',
            yellow:'#ffeeba',
            orange:'#ff9800',
            gray:'#d6d8db'
        }
        if(tdata.length > 0){
            //console.log('geoProperties',geoProperties.name)
            let selectedCountry = tdata[0].filter((items) =>{
                // console.log('test',items.country.split(' ')[1].indexOf(geoProperties.name));
                return items.country.split(' ')[1].indexOf(geoProperties.name) > -1;
            })
            // console.log('selectedCountry',selectedCountry)
            if(selectedCountry.length > 0){
                let situation = this.props.sType.filter((items) => {
                    return items.name === selectedCountry[0].situation
                })
                // console.log('situation',situation)
                returnValue = colorMap[situation[0].type];
            }
        }
        
        return returnValue;
    }
    renderLevel = geoProperties => {
        let tdata = this.props.tDataList;
        let levelInfo = '暫無資訊 (No Data)'
        if(tdata.length > 0){
            let selectedCountry = tdata[0].filter((items) =>{
                // console.log('test',items.country.split(' ')[1]);
                return items.country.indexOf(geoProperties.name) > -1;
            })
            if(selectedCountry.length > 0){
                let situation = this.props.sType.filter((items) => {
                    return items.name === selectedCountry[0].situation
                })
                levelInfo = situation[0].categroy;
            }

        }
        return levelInfo;
    }
    render(){
        window.store.subscribe(() => {
            //console.log('subscribe data',window.store.getState())
            let storeState = window.store.getState();
            if(storeState.travelDataArray[0].length !== 0) {
                this.setState({mapLoading:false});
            }
        });

        return (
            <div className="mapWrap">
                <h3>{this.props.msg1}</h3>
                <h3>{this.props.msg2}</h3>
                <div className="mapContent">
                    {
                        this.state.mapLoading ? <div className="loadingBlock">{!this.props.status?'Loading...':this.props.status}</div> : null
                    }
                    <ComposableMap 
                        data-tip=""
                        projectionConfig={{
                            scale:147,
                            rotate: [-10, 0, 0],
                            height:400
                        }}>
                        <Graticule stroke="#dee2e6" />
                        <Geographies geography={this.state.geoUrl}>
                            {({ geographies }) =>
                            geographies.map(geo => 
                                <Geography 
                                key={geo.rsmKey} 
                                geography={geo}
                                onMouseEnter={()=>{
                                    this.props.renderTooltipContent(`${geo.properties.name} - ${this.renderLevel(geo.properties)}`);
                                }}
                                onMouseLeave={()=>{
                                    this.props.renderTooltipContent("");
                                }}
                                style={{
                                    default: {
                                    fill: this.renderAreaColor(geo.properties),
                                    stroke:"#EAEAEC",
                                    outline: "none"
                                    },
                                    hover: {
                                    fill:this.renderAreaColor(geo.properties),
                                    stroke: "#d4e809",
                                    strokeWidth: 2,
                                    outline: "none"
                                    },
                                    pressed: {
                                    fill: "#E42",
                                    outline: "none"
                                    }
                                }}
                                />
                                )
                            }
                        </Geographies>
                    </ComposableMap>
                </div>
            </div>
        )
    }
}
const  mapStateToProps =  state => {
    return {
        tDataList:state.travelDataArray
    }
}
export default connect(mapStateToProps)(Map);