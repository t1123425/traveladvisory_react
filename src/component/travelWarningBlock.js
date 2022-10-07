import React, { PureComponent } from "react";
import { connect } from "react-redux";

class TravelWarningBlock extends PureComponent{
    state = {
        grayCount:0,
        yellowCount:0,
        OrangeCount:0,
        redCount:0
    }
    render(){
        return(
            <div className="travelWarnBlock">
                <h4>旅遊分級顏色警示表(Travel Advisory Levels)</h4>
                <ul className="dangerRangeList list-group">
                    <li className="list-group-item list-group-item-secondary">
                        <div className="d-inline">
                            <p>灰色警示-提醒注意</p>
                            <p>Level 1 - Exercise Normal Precautions</p>
                        </div>
                    </li>
                    <li className="list-group-item list-group-item-warning">
                        <div className="d-inline">
                            <p>黃色警示-特別注意旅遊安全並檢討應否前往</p>
                            <p>Level 2 - Exercise Increased Caution</p>
                        </div>
                    </li>
                    <li className="list-group-item orangeBg">
                        <div className="d-inline">
                            <p>橙色警示-避免非必要旅行</p>
                            <p>Level 3 - Reconsider Travel</p>
                        </div>
                    
                    </li>
                    <li className="list-group-item redBg">
                        <div className="d-inline">
                            <p>紅色警示-不宜前往，宜儘速離境</p>
                            <p>Level 4 - Do not travel</p>
                        </div>
                    
                    </li>
              </ul>
            </div>
        )
    }
}
const  mapStateToProps =  state => {
    return {
        tDataList:state.travelDataArray
    }
}
export default connect(mapStateToProps)(TravelWarningBlock)