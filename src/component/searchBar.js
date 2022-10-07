import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {search} from '../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class SearchBar extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            val:'',
            showIndex:0
        }
    }
    handleChange(e) {
        this.setState({
          val: e.target.value
        },()=>{
            this.props.renderSearch(this.state.val);
        });
    }
    handleSubmit(){
        if(this.state.val !== ''){
            //this.props.search(this.state.val);
            //this.setState({val:''});
            console.log('props',this.props.search);
        }else{
            alert('搜索資料為空');
        }
    }
    getLevelValue = e => {
        this.props.renderLevel(e.target.value);
    }
    getAreaValue = e => {
        this.props.renderArea(e.target.value);
    }
    resetInput = () => {
        this.setState({
            val:''
        },()=>{
            this.props.renderSearch(this.state.val);
        })
    }
    render(){
        return (
            <div className="searchBarContent row">
                 <div className="col-md-6 text-left">
                    <label htmlFor="search">搜尋 (Search)</label>
                    <div className="input-group">
                        <input type="text" id="search" className="form-control" placeholder="請輸入篩選資料" onChange={this.handleChange.bind(this)} value={this.state.val}/>
                        <div className="input-group-append">
                            <button className="btn btn-danger" type="button" onClick={this.resetInput.bind(this)}>
                             <FontAwesomeIcon icon="times"></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                 </div>
                 <div className="col-md-3 text-left">
                    <label htmlFor="areaSelect">狀態篩選 (Level Filter)</label>
                    <div className="selectWrap">
                        <select name="" id="areaSelect" className="custom-select" onChange={this.getLevelValue.bind(this)}>
                            {
                                this.props.warningList.map((items, index) =>(
                                    <option key={index} value={items.categroy} defaultValue={index === this.state.showIndex && items.categroy}>{items.categroy}</option>
                                ))
                            }
                        </select>
                    </div>
                 </div>
                 <div className="col-md-3 text-left">
                    <label htmlFor="areaSelect">地區篩選 (Area Filter)</label>
                    <div className="selectWrap">
                        <select name="" id="areaSelect" className="custom-select" onChange={this.getAreaValue.bind(this)}>
                            {
                                this.props.areaList.map((items, index) =>(
                                    <option key={index} value={items} defaultValue={index === this.state.showIndex && items}>{items}</option>
                                ))
                            }
                        </select>
                    </div>
                 </div>
            </div>
        );
    }
}

export default connect(null,{search})(SearchBar);