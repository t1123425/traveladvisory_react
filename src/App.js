import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane,faTimes,faSortUp,faSortDown} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { connect } from "react-redux";
import {load_data} from './actions';
import Map from './component/globalMap';
import ListTable from './component/listTable';
import TravelWarningBlock from './component/travelWarningBlock';
import ReactTooltip from "react-tooltip";

library.add(faPlane,faTimes,faSortUp,faSortDown);


class App extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      title1:'全球旅遊警示統計',
      title2:'Global Travel Advisory',
      toolTipContent:'',
      dataStatus:'',
      situationType:[
          {
            type:'gray',
            categroy:'顯示全部 (Show All)',
            name:'顯示全部 (Show All)'
          },
          {
              type:'gray',
              categroy:'灰色警示 (Level 1)',
              name:'灰色警示-提醒注意'
          },
          {
              type:'yellow',
              categroy: '黃色警示 (Level 2)',
              name: '黃色警示-特別注意旅遊安全並檢討應否前往'
          },
          {
              type: 'orange',
              categroy: '橙色警示 (Level 3)',
              name: '橙色警示-避免非必要旅行'
          },
          {
              type: 'red',
              categroy: '紅色警示 (Level 4)',
              name: '紅色警示-不宜前往，宜儘速離境'
          }
      ]
    }
  }
  renderTooltipContent = childData => {
    this.setState({toolTipContent:childData})
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(){
    axios.get(process.env.REACT_APP_OLD_API_URL).then(res => {
      if(res){
        this.props.load_data(res.data);
      }
    }).catch(err => {
      console.log('err',err);
      this.setState({dataStatus:err.message})
    })    
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className="d-inline-block v-middle">
            <FontAwesomeIcon icon="plane" className="fa-2x" />
          </div>
          <div className="d-inline-block v-middle ml-2">
             <h1>{this.state.title1}</h1>
             <p>{this.state.title2}</p>
          </div>
          <span className="ver">Version 1.5</span>
        </header>
        <section id="main" className="container">
          <div className="row justify-content-center align-items-center text-center">
            <div className="infoBlock col-md-12 mt-5 mb-5 text-left">
              <ul className="infoBlockList">
                <li>
                  <p>本網頁的原始數據源於外交部領事事務部國外旅遊警示分級表，而此數據主要提供使用者出國旅行之參考資訊，屬參考性質之建議，</p>
                  <p>另外本網頁主要也是基於優化原版網頁的使用體驗為出發點開發，性質為範例展示，所使用的圖片與數據來源連結也會附在網頁最下方。</p>
                </li>
                <li>
                  <p>The original data on this webpage is derived from the Foreign Tourism Warning Classification Table of the Ministry of Foreign Affairs and Consular Affairs, and this data mainly provides reference information for users to travel abroad.</p>
                  <p>In addition, this webpage is mainly developed based on optimizing the experience of the original webpage. The nature is shown as an example. The link between the image and the data source used will also be attached to the bottom of the webpage.</p>
                </li>
              </ul>
            </div>
            <div className="col-md-12 text-left">
              <TravelWarningBlock />
            </div>
            <div className="col-md-12 mt-5">
              <Map sType={this.state.situationType} status={this.state.dataStatus} renderTooltipContent={this.renderTooltipContent}></Map>
              <ReactTooltip>{this.state.toolTipContent}</ReactTooltip>
            </div>
            <div className="col-md-12">
              <ListTable sType={this.state.situationType} />
            </div>
          </div>
        </section>
        <footer className="text-center">
          <p>資料來源於 <a href="https://www.boca.gov.tw/sp-trwa-list-1.html" target="blank">外交部領事事務部</a>，此專案為展示用途。</p>
          <p>Reference data from <a href="https://www.boca.gov.tw/mp-2.html" target="blank">Bureau of Consular Affairs, Ministry of Foreign Affairs, Republic of China(Taiwan)</a></p>
          <a target="blank" href="https://icons8.com/icons/set/airplane-front-view">Airplane icon</a> icon by <a target="blank" href="https://icons8.com">Icons8</a>
        </footer>
      </div>
    );
  }
}

export default connect(null,{load_data})(App);
