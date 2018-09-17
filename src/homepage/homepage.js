import React, { Component } from 'react';
import {  Icon, Button,Select,Table,Menu,Layout,DatePicker,Cascader,Row, Col,Tabs} from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createForm } from 'rc-form';
import { Map, Marker } from 'react-amap';
import './homepage.css';
import Highcharts from 'highcharts/highstock';


const myDate = new Date();
const {RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;

const dateFormat = 'YYYY/MM/DD HH:mm:ss';
function callback(key) {
  console.log(key);
}
const YOUR_AMAP_KEY='076cb00b4c9014e47f9b19e1da93daca';
  const { Header, Sider, Content } = Layout;
  const SubMenu = Menu.SubMenu;
  const Option = Select.Option;
  const options = [{
    value: 'zhejiang',
    label: '浙江省',
    children: [{
      value: 'hangzhou',
      label: '杭州市',
      children: [{
        value: 'shangcheng',
        label: '上城区',
        children:[{
          value:'shiyi',
          label:"杭州市十一中"
        },{
          value:'shi',
          label:"杭州市十中"
        },{
          value:'fenghuang',
          label:"凤凰小学"
        },{
          value:'shengli',
          label:"胜利小学"
        }]
      }],
    }],
  }];





  const styleC = {
    background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '30px',
    height: '40px',
    color: '#000',
    textAlign: 'center',
    lineHeight: '40px'
  }
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
class journal extends React.Component {

  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
constructor(props) {
  super(props);
    this.state = {
      province:'浙江省',
      city:'杭州市',
      area:'上城区',
      num:15,
      collapsed: false,
      size: 'small',
      time:myDate,
      selectedRowKeys: [],
      count: 2,
      longitude:'120.201316',
      latitude:'30.236285',
    };   
}




  componentWillMount = () => {


    document.title = "总体页面展示";
    function showTime(){
      let nowtime=new Date();
      let year=nowtime.getFullYear();
      let month=nowtime.getMonth()+1;
      let date=nowtime.getDate();
      document.getElementById("mytime").innerText=year+"年"+month+"月"+date+" "+nowtime.toLocaleTimeString();
  }
  
  setInterval(showTime,1000);
    window.onload = function(){    
      var speed=30; //数字越大速度越慢
      var tab=document.getElementById("demo");
      var tab1=document.getElementById("demo1");
      var tab2=document.getElementById("demo2");
      tab2.innerHTML=tab1.innerHTML; //克隆demo1为demo2
      function Marquee(){
      if(tab2.offsetTop-tab.scrollTop<=0){//当滚动至demo1与demo2交界时
          tab.scrollTop+=tab1.offsetHeight
      }  //demo跳到最顶端   
      else{
          tab.scrollTop++;
      }
      }
      var MyMar=setInterval(Marquee,speed);
      tab.onmouseover=function() {clearInterval(MyMar)};//鼠标移上时清除定时器达到滚动停止的目的
      tab.onmouseout=function() {MyMar=setInterval(Marquee,speed)};//鼠标移开时重设定时器   
      setTimeout(Marquee, 2000); 
  
      
      var speed=50
      var colee2=document.getElementById("colee2");
      var colee1=document.getElementById("colee1");
      var colee=document.getElementById("colee");
      colee2.innerHTML=colee1.innerHTML
      colee.scrollTop=colee.scrollHeight
      function Marquee2(){
      if(colee1.offsetTop-colee.scrollTop>=0)
      colee.scrollTop+=colee2.offsetHeight
      else{
      colee.scrollTop--
      }
      }
      var MyMar2=setInterval(Marquee2,speed)
      colee.onmouseover=function() {clearInterval(MyMar2)}
      colee.onmouseout=function() {MyMar2=setInterval(Marquee2,speed)}
      
  }

  }


  componentDidMount(){
    var chart1 = new Highcharts.Chart({
      chart: {
          renderTo: 'container1',
          type: 'column'
      },
      title: {
        text: '昨日各时段用水量统计'
    },
    credits:{
      enabled: false // 禁用版权信息
       },
    xAxis:{
      title:{
          text:'x轴标题'
      }
   },
   yAxis:{
      title:{
          text:'用水量/L'
      }
   },
    xAxis: {
        type: 'datetime'
    },
   
    series: [{
        data: [15252, 35272,54220, 22787, 22552, 45252,25421, 80587, 56852, 75871, 57881,85850,25272,52253,57478,58710,57850,85770,124525,12566,52523,25555,34442,58556],
        pointStart: Date.UTC(2010, 0, 1),
        pointInterval: 3600 * 1000 // one hour
    }]
  });





  }



  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  
  tabchange = (key) => {
    if(key ==='1'){
      var chart1 = new Highcharts.Chart({
        chart: {
            renderTo: 'container1',
            type: 'column'
        },
        title: {
          text: '昨日各时段用水量统计'
      },
      xAxis:{
        title:{
            text:'x轴标题'
        }
     },
     yAxis:{
        title:{
            text:'用水量/L'
        }
     },
     credits:{
      enabled: false // 禁用版权信息
       },
      xAxis: {
          type: 'datetime',
      },
     
      series: [{
          data: [15252, 35272,54220, 22787, 22552, 45252,25421, 80587, 56852, 75871, 57881,85850,25272,52253,57478,58710,57850,85770,124525,12566,52523,25555,34442,58556],
          pointStart: Date.UTC(2010, 0, 1),
          pointInterval: 3600 * 1000 // one hour
      }]
    });
  
    }


   if(key ==='2'){
     console.log(key)
    var chart2 = new Highcharts.Chart({
      chart: {
          renderTo: 'container2',
          type: 'column'
      },
      title: {
        text: '上周每日用水量统计'
    },
		xAxis: {
      categories: [
        '星期日', '星期一','星期一二','星期三','星期四','星期五','星期六',
      ],
      crosshair: true
  },
  credits:{
    enabled: false // 禁用版权信息
     },
   yAxis:{
      title:{
          text:'用水量/L'
      }
   },
    series: [{
        data: [15252, 35272,54220, 22787, 22552, 45252,25421],
    }]
  });
   }




  if(key ==='3'){
    console.log(key)
   var chart3 = new Highcharts.Chart({
     chart: {
         renderTo: 'container3',
         type: 'column'
     },
     title: {
       text: '今年每月用水量统计'
   },
   credits:{
    enabled: false // 禁用版权信息
     },
   xAxis: {
    categories: [
      '一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'
  ],
     crosshair: true
 },
  yAxis:{
     title:{
         text:'用水量/L'
     }
  },
   series: [{
       data: [15252, 35272,54220, 22787, 22552, 45252,25421,54556,52565,26362,78652,15225],
   }]
 });
  }

  }
  onChange = (date, dateString) => {
    if(dateString[3].value==="shiyi"){
      this.setState({
        longitude: '120.160833',
        latitude:' 30.302786',
      });
    }
    if(dateString[3].value==="shengli"){
      this.setState({
        longitude: '120.201316',
        latitude:' 30.236285',
      });
    }
    if(dateString[3].value==="shi"){
      this.setState({
        longitude: '120.175573',
        latitude:' 30.25539',
      });
    }
    if(dateString[3].value==="fenghuang"){
      this.setState({
        longitude: '120.179335',
        latitude:'30.219246',
      });
    }
  }
  render() {
    return (   
      <div id="homepagebody" >
      <Layout>
      <Sider 
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <div className="logo" />
         <div className="Lowalar-left">
         <Menu
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['0']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
            >   
                <div className="homepage" ><a href="" style={{background: '#1890ff', color: 'white', fontSize: "18px", display: "block", width: "100%", borderRadius: '5px' }}>水表管理平台</a></div>
                <div className="homepages" ><Link to="/homepage"><a href="" style={{ background: '#001529', color: 'white', display: "block", width: "100%", paddingLeft: "24px" }}>
                <Icon type="bar-chart" style={{ marginRight: '10px' }} />数据概览</a></Link>
                </div>
                <SubMenu key="sub1" title={<span><Icon type="file-text" /><span>信息查询</span></span>}>
                  <Menu.Item key="1"><Link to="/product">产品信息</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/area">区域信息</Link></Menu.Item>
                  <Menu.Item key="3"><Link to="/connector">接口信息</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="desktop" /><span>设备管理</span></span>}>
                  <Menu.Item key="4"><Link to="/basic">基本信息</Link></Menu.Item>
                  <Menu.Item key="5"><Link to="/status">设备状态</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="user" /><span>用户管理</span></span>}>
                  <Menu.Item key="6"><Link to="/waterman">水务商</Link></Menu.Item>
                  <Menu.Item key="7"><Link to="/account">账户管理</Link></Menu.Item>
                  <Menu.Item key="8"><Link to="/role">角色管理</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="calendar" /><span>日志管理</span></span>}>
                  <Menu.Item key="9"><Link to="/journal">数据日志</Link></Menu.Item>
                  <Menu.Item key="10"><Link to="/datalogs">设备日志</Link></Menu.Item>
                  <SubMenu key="sub5" title={<span>用户日志</span>}>
                    <Menu.Item key="11"><Link to="/userlogs">登入登出</Link></Menu.Item>
                    <Menu.Item key="12"><Link to="/otherlogs">其他日志</Link></Menu.Item>
                  </SubMenu>
                </SubMenu>
                <SubMenu key="sub6" title={<span><Icon type="sync" /><span>生命周期</span></span>}>
                  <Menu.Item key="13"><Link to="/lifecycle">基本信息</Link></Menu.Item>
                  <Menu.Item key="14"><Link to="/status">出场测试</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub7" title={<span><Icon type="dashboard" /><span>OTA</span></span>}>
                  <Menu.Item key="15"><Link to="/history">历史记录</Link></Menu.Item>
                  <Menu.Item key="16"><Link to="/operation">操作</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub8" title={<span><Icon type="warning" /><span>产品监控</span></span>}>
                  <Menu.Item key="17"><Link to="/instorage">产品入库</Link></Menu.Item>
                  <Menu.Item key="18"><Link to="/check">出厂检定</Link></Menu.Item>
                  <Menu.Item key="19"><Link to="/sendout">产品发货</Link></Menu.Item>
                  <Menu.Item key="20"><Link to="/confirm">确认收货</Link></Menu.Item>    
                  <Menu.Item key="21"><Link to="/maintenance">产品维修</Link></Menu.Item>               
                </SubMenu>
            </Menu>
           </div>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
            <div className="switch-btn">
                <Button type="primary"  onClick={this.toggle} style={{ marginLeft:"16px",  }}>
                <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            />
              </Button>
        
            <span  id="mytime" style={{height:"100%",borderRadius:'5px',color:'#333',marginLeft:'20px'}}></span>
          
            </div>
            <div className="Administrator">
              <Icon type="search" />
                <Icon type="bell" />
                <span></span>管理员
            </div>        
        </Header>
        <div className="nav">
        <Row>
          <Col span={6} >
              <div className="navhead">
                <p className="navtitle">今日报警数量</p>
                <p className="number"><span style={{color:'blue'}}>5</span>台</p>
                <p className="beizhu">备注：</p>
              </div>
          </Col>
          <Col span={6} style={{paddingLeft:'12px'}}>
              <div className="navhead">
                <p className="navtitle">今日维护数量</p>
                <p className="number"><span style={{color:'red'}}>2</span>台</p>
                <p className="beizhu">备注： 剩余 <span style={{color:'red',fontSize:'18px',fontWeight:'bold'}}>3</span> 台正在维护中</p>
              </div>  
          </Col>
          <Col span={6} style={{paddingLeft:'12px'}}>
              <div className="navhead">
                <p className="navtitle">学校分布</p>
                <p className="number"><span style={{color:'green'}}>4</span>所</p>
                <p className="beizhu">备注：总计 <span style={{color:'green',fontSize:'18px',fontWeight:'bold'}}>10</span> 台设备 </p>
              </div>        
          </Col>
          <Col span={6} style={{paddingLeft:'12px'}}>
              <div className="navhead">
                <p className="navtitle">今日平均用水量</p>
                <p className="number"><span style={{color:'purple'}}>4454545</span>L</p>
                <p className="beizhu">备注：</p>
              </div>     
          </Col>
        </Row>
        </div>
        <Content style={{ margin: '24px 16px', minHeight: 280,marginTop:'10px' }}>
        <Row>
          <Col span={7} >
          <div id="report">
            <h3  style={{textAlign:'center',fontSize:'20px',color:'orange'}}>24小时报警情况总览</h3>
            <div id="demo" style={{overflow:'hidden',height:'400px',width:'100%'}}>
            <div id="demo1">
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1051 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1052 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1053 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1054 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1055 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1056 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1057 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1058 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1059 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1060 </p>
                    <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1061 </p>
            </div>
            <div id="demo2"></div>
            </div>
       </div>
          </Col>
          <Col span={10} style={{paddingLeft:'12px'}}>
          <div style={{width:'100%',height:'300px'}} >
          <Cascader defaultValue={['zhejiang', 'hangzhou', 'shangcheng','shengli']} options={options} onChange={this.onChange}  style={{width:'100%',marginBottom:'20px'}}/>
                <Map 
                    amapkey={YOUR_AMAP_KEY}
                    center={{longitude:this.state.longitude,latitude:this.state.latitude}}
                    zoom={20}
                    >
                    <Marker  position={{longitude:120.179335, latitude: 30.219246}}  >
                        
                    </Marker>
                    <Marker  position={{longitude: 120.201316, latitude: 30.236285}}  >
                        
                        </Marker>
                    <Marker  position={{longitude:120.160833, latitude: 30.302786}}  >
                        
                        </Marker>
                    <Marker position={{longitude: 120.175573,latitude: 30.25539}} >
                        <div style={styleC}>{this.state.value}</div>
                    </Marker>
                </Map>
             </div>
          </Col>
          <Col span={7} style={{paddingLeft:'12px'}}>
            <div style={{width:'100%',height:'350px',background:"white",overflow:'hidden',textAlign:"center",paddingTop:'20px'}} >
              <h3  style={{textAlign:'center',fontSize:'20px',color:'orange'}}>24小时维护情况统计</h3>
              <div id="colee" style={{overflow:'hidden',height:'400px',width:'100%'}}>
              <div id="colee1">
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1051 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1052 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1053 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1054 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1055 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1056 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1057 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1058 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1059 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1060 </p>
                      <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1061 </p>
              </div>
              <div id="colee2"></div>
              </div>
            </div>
          </Col>
        </Row>  
        <div  className="diagram">
        {/* <RangePicker 
            style={{marginLeft:'20px',position:'absolute',top:'5px',zIndex:"99"}}  
            defaultValue={[moment().startOf('day'), moment(this.state.time, dateFormat)]}
            format={dateFormat}
            ranges={{ 今天: [moment().startOf('day'), moment().endOf('day')], '本月': [moment().startOf('month'), moment().endOf('month')] }}
            onChange={this.timeonChange}
          />   */}
        <Tabs type="card" onChange={this.tabchange} >
          <TabPane tab="本日" key="1">
          <div id="container1" style={{height:'400px'}}></div>
          </TabPane>
          <TabPane tab="上周" key="2" forceRender={true}>
          <div id="container2" style={{height:'400px'}}></div>
          </TabPane>
          <TabPane tab="今年" key="3" forceRender={true}>
          <div id="container3" style={{height:'400px'}}></div>
          </TabPane>
        </Tabs>
        </div>                                                    
        </Content>
      </Layout>
    </Layout>   
</div>                
    )
  }
}
export default journal = createForm()(journal);

