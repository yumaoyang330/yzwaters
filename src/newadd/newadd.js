import React, { Component } from 'react';
import { Icon, Button, Select, Table, Menu, Input, Layout, Row, Col, Popconfirm, Tabs, Cascader, message, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import { equipmentadd, getrespersoninfo, gets } from '../axios';
import './newadd.css';


var _val = ""

const TabPane = Tabs.TabPane;
const fileList = [];
function callback(key) {
  console.log(key);
}
const dataSource = [];
for (let i = 0; i < 1; i++) {
  dataSource.push({
    province: '',
    city: '',
    county: '',
    school: '',
    location: '',
    type: '',
    content: '',
    alertThreshold: '',
    batteryThreshold: '',
    simId: '',
    key: i,
    deviceId: '',
    location: '',
    initFlow: '',
  });
}
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;

class newadd extends Component {
  constructor(props) {
    super(props);
    this.columns = [{
      width: '30%',
      dataIndex: 'deviceId',
      render: (text, record) => {
        return (
          <div className="gutter-box" style={{ fontSize: '16px' }}>
            设备编号:<Input type="text" className="deviceId" placeholder="请输入设备编号" style={{ width: '60%', marginLeft: '10px' }} />
          </div>
        );
      },
    }, {
      dataIndex: 'location',
      width: '30%',
      render: (text, record) => {
        return (
          <div className="gutter-box" style={{ fontSize: '16px' }}>
            安装地址:<Input placeholder="安装地址" style={{ width: '60%', marginLeft: '10px' }} className="locations" />
          </div>
        );
      },
    }, {
      dataIndex: 'flow',
      width: '20%',
      render: (text, record) => {
        return (
          <div className="gutter-box" style={{ fontSize: '16px' }}>
            初始流量:<Input placeholder="0" style={{ width: '40%', marginLeft: '10px' }} className="initFlow" />
          </div>
        );
      },
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      align: 'right',
      render: (text, record) => {
        return (
          dataSource.length > 1 ?
            (
              <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(record.key)}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            ) : null
        );
      },
    }];
    this.state = {
      num: 15,
      collapsed: false,
      size: 'small',
      selectedRowKeys: [],
      dataSource: dataSource,
      count: 2,
      province: '',
      city: '',
      area: '',
      school: '',
      repairname: "",
      organization: '',
      repairemail: '',
      repairphone: '',
      alertname: "",
      alertorganization: '',
      alertemail: '',
      alertphone: '',
    };
  }

  componentWillMount = () => {
    document.title = "新增设备";
    function showTime() {
      let nowtime = new Date();
      let year = nowtime.getFullYear();
      let month = nowtime.getMonth() + 1;
      let date = nowtime.getDate();
      document.getElementById("mytime").innerText = year + "年" + month + "月" + date + " " + nowtime.toLocaleTimeString();
    }

    setInterval(showTime, 1000);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  out = () => {
    localStorage.clear()
    window.location.href = "/login";
  }
  reset = () => {
    window.location.href = "/newadd";
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div id="newaddbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <div className="Lowalar-left">
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="1" style={{ background: '#1890ff', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
                  <Icon type="windows" />
                  <span>水表管理平台</span>
                </Menu.Item>
                <Menu.Item key="0">
                  <Link to="/homepage">
                    <Icon type="bar-chart" />
                    <span>数据概览</span>
                  </Link>
                </Menu.Item>
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
                </SubMenu>
                <SubMenu key="sub7" title={<span><Icon type="dashboard" /><span>OTA</span></span>}>
                  <Menu.Item key="15"><Link to="/history">历史记录</Link></Menu.Item>
                  <Menu.Item key="16"><Link to="/operation">操作</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub8" title={<span><Icon type="warning" /><span>产品监控</span></span>}>
                  <Menu.Item key="17"><Link to="/instorage">产品入库</Link></Menu.Item>
                  <Menu.Item key="19"><Link to="/sendout">产品发货</Link></Menu.Item>
                  <Menu.Item key="20"><Link to="/confirm">确认收货</Link></Menu.Item>
                  <Menu.Item key="21"><Link to="/maintenance">产品维修</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <div style={{ float: 'left' }}>
                <Button type="primary" onClick={this.toggle} style={{ marginLeft: "16px", }}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  />
                </Button>
              </div>
              <span id="mytime" style={{ height: "100%", lineHeight: "64px", display: "inline-block", float: "left", borderRadius: '5px', color: '#333', marginLeft: '20px' }}></span>
              <span style={{ float: 'right', height: '64px', lineHeight: "64px", marginRight: "2%", cursor: 'pointer' }} onClick={this.out}>
                <Icon type="poweroff" style={{ marginRight: '10px' }} />退出
              </span>
              <div className="Administrator" >
                <span></span>{localStorage.getItem('realname')}超级管理员
            </div>
            </Header>
            <div className="nav">
              信息查询 / 产品信息 / 新增产品
            </div>
            <div className="tit">
              新增产品
            </div>
            <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280, marginTop: '10px' }}>
              <div className="current">
                <div className="curr">
                  <div className="current_text">
                    <div className='addinput'>
                      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本批设备型号：<Input placeholder="美的净水器V2018" style={{ width: '60%' }} id="equipmenttype" />
                    </div>
                    {/* <div className='addinput'>
                      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本批设备批件：
                      <Upload {...props}>
                        <Button>
                          <Icon type="upload" /> 上传批件
                        </Button>
                      </Upload>
                    </div> */}
                    <div className='addinput'>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本批设备备注：<Input placeholder="本批设备寿命年限为3年" style={{ width: '60%' }} id="content" />
                    </div>
                    <div className='addinput'>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;滤芯供应商：<Input placeholder="请输入滤芯供应商" style={{ width: '60%' }} id="filterprovider" />
                    </div>
                    <div className='addinput'>
                      &nbsp;&nbsp;&nbsp;滤芯维护服务商：<Input placeholder="请输入滤芯维护服务商" style={{ width: '60%' }} id="filterMaintainer" />
                    </div>
                    <div className='bjz'>
                      <Row gutter={16}>
                        <Col className="gutter-row" span={12}>
                          <div className="gutter-box"  >
                            流量预报警值:<Input placeholder="20" style={{ width: '50%', marginLeft: '10px' }} id="preAlertThreshold" addonAfter="t" />
                          </div>
                        </Col>
                        <Col className="gutter-row" span={12}>
                          <div className="gutter-box">
                            流量报警值:<Input placeholder="25" style={{ width: '50%', marginLeft: '10px' }} id="alertThreshold" addonAfter="t" />
                          </div>
                        </Col>
                        {/* <Col className="gutter-row" span={8}>
                          <div className="gutter-box">
                            电池电量报警值:<Input placeholder="3Ah" style={{ width: '40%', marginLeft: '10px' }} id="batteryThreshold" />
                          </div>
                        </Col> */}
                      </Row>
                    </div>
                    <div className='number'>
                      <Table dataSource={dataSource} columns={columns} pagination={false} />
                      <span onClick={this.handleAdd} className="numadd" style={{ color: '#1890FF' }}>新增</span>
                    </div>
                    <div className="inform" >
                      <p>报警通知:<span style={{ display: 'inline-block', width: '60px', textAlign: 'center' }}>{this.state.alertname}</span>
                        <span style={{ display: 'inline-block', paddingLeft: '10px', paddingRight: '10px' }}>{this.state.alertphone} </span>
                        <span style={{ display: 'inline-block', paddingLeft: '10px', paddingRight: '10px' }}>{this.state.alertorganization} </span>
                        <span style={{ display: 'inline-block', paddingLeft: '10px', paddingRight: '10px' }}>{this.state.alertemail} </span></p>
                      <p>维修通知:<span style={{ display: 'inline-block', width: '60px', textAlign: 'center' }}>{this.state.repairname}</span>
                        <span style={{ display: 'inline-block', paddingLeft: '10px', paddingRight: '10px' }}>{this.state.repairphone} </span>
                        <span style={{ display: 'inline-block', paddingLeft: '10px', paddingRight: '10px' }}>{this.state.organization} </span>
                        <span style={{ display: 'inline-block', paddingLeft: '10px', paddingRight: '10px' }}>{this.state.repairemail} </span>
                      </p>
                    </div>
                    <div className="btn">
                      <Button type="primary" style={{ marginRight: '20px' }} onClick={this.equipmentsubmit}>提交</Button>
                      <Button onClick={this.reset}>重置</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>

    )
  }
}

export default newadd = createForm()(newadd);

