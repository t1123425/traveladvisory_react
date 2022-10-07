import React, { PureComponent } from "react";
import { connect } from "react-redux";
import SearchBar from "./searchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ListTable extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            areaList:['亞太地區','亞西地區','歐洲地區','非洲地區','北美地區','拉丁美洲暨加勒比海地區'],
            showIndex:0,
            searchValue:'',
            currentLevel: this.props.sType[0].categroy,
            currentArea: '亞太地區',
            searchStatus:false,
            sortDateUpToDown:true
        }
    }
    renderDataByFilter = array =>{
        let returnAry = [];
        if(this.state.sortDateUpToDown){
            array.sort((a,b) =>{
                return new Date(b.date) - new Date(a.date);
            })      
        }else{
            array.sort((a,b) =>{
                return new Date(a.date) - new Date(b.date);
            })  
        }
        if(this.state.searchStatus){
            returnAry = array.filter((items) => {
                return items.location.indexOf(this.state.searchValue)  > -1; 
            });
        }else{
            if(this.state.currentLevel === this.props.sType[0].categroy){
                returnAry = array.filter((items) => {
                    return items.area === this.state.currentArea;   
                });
            }else{
                returnAry = array.filter((items) => {
                    return this.renderWarnType(items.situation)[0].categroy === this.state.currentLevel && items.area === this.state.currentArea;   
                });
            }
        }
        return returnAry;
    }
    renderWarnType = type => {
       let returnType = {};
       returnType = this.props.sType.filter((items) => {
            return items.name === type;
        })
        return returnType;
    }
    filterSearch = () => {
        if(this.state.searchValue.length !== 0){
            this.setState({searchStatus:true});
        }else{
            this.setState({searchStatus:false});
        }
    }
    renderSearch = childData => {
        this.setState({searchValue:childData});
    }
    renderLevel = childData => {
        this.setState({currentLevel:childData});
    }
    renderArea = childData => {
        this.setState({currentArea:childData});
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.searchValue !== this.state.searchValue){
            this.filterSearch();
        }
    }
    sortSwtich = () => {
        if(this.state.sortDateUpToDown){
            this.setState({sortDateUpToDown:false});
        }else{
            this.setState({sortDateUpToDown:true});
        }
    }
    render(){
        let listLi = this.props.tDataList;
        return(
            <div className="listBlockWrap">
                {/* <ul className="areaList">
                  {
                      this.state.areaList.map((items,index) => (
                        <li key={index} onClick={() => {this.selectListIndex(index)}} className={index === this.state.showIndex?'active':''}>
                            <span>{items}</span>
                        </li>
                      ))
                  }
                </ul> */}
                <SearchBar areaList={this.state.areaList} warningList={this.props.sType} renderLevel={this.renderLevel} renderArea={this.renderArea} renderSearch={this.renderSearch}  />
                <div id="listTableBlock" className="table-responsive mt-5">
                  <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col" width="60%">
                                地區 <br/>
                                (Area)
                            </th>
                            <th scope="col" width="20%">
                                狀態 <br/>
                                (Level)
                            </th>
                            <th scope="col" width="20%">
                                <div className="dateSortBtn" onClick={this.sortSwtich.bind(this)}>
                                    <span className="d-inline-block v-middle">
                                        更新日期<br/>
                                        (Dated Updated)
                                    </span>
                                    <FontAwesomeIcon icon={this.state.sortDateUpToDown?'sort-down':'sort-up'} className="ml-2 v-middle"></FontAwesomeIcon>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listLi.length === 0 || this.renderDataByFilter(listLi[0]).length === 0 ?
                            <tr>
                                <td colSpan="3">
                                    <p>暫無數據</p>
                                </td>
                            </tr> :
                           this.renderDataByFilter(listLi[0]).map((items,index) => (
                            <tr key={index}>
                                 <td>
                                    <a href={items.link} target="blank">{items.location}</a>
                                </td>
                                <td className={this.renderWarnType(items.situation)[0].type+'Bg'}>
                                    {this.renderWarnType(items.situation)[0].categroy}
                                </td>
                                <td>
                                    {items.date}
                                </td>
                            </tr>
                           ))
                        }
                    </tbody>
                  </table>
                </div>
            </div>
        );
    }
}
const  mapStateToProps =  state => {
    return {
        tDataList:state.travelDataArray
    }
}
export default connect(mapStateToProps)(ListTable);