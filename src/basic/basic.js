import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Input, Select, Table, Modal, message } from 'antd';
import { wirelessbasic, generalbasic, collectorbasic, getLifecycleDetail, getHistoryReading, getDeviceDetail } from '../axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createForm } from 'rc-form';
import './basic.css';

const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


const TabPane = Tabs.TabPane;


// function timestampToTime(timestamp) {
//   var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//   var Y = date.getFullYear() + '-';
//   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//   var D = date.getDate() + ' ';
//   var h = date.getHours() + ':';
//   var m = date.getMinutes() + ':';
//   var s = date.getSeconds();
//   return Y + M + D;
// }
class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      tabnum: 1,
      lifereport: [{
        title: '设备编号',
        dataIndex: 'deviceNum',
      }, {
        title: '生命周期',
        dataIndex: 'status',
        render: (text) => {
          if (text === 1) {
            return (
              <div>
                <span style={{ color: 'green' }}>设备入库</span>
              </div>
            )
          }
          if (text === 2) {
            return (
              <div>
                <span style={{ color: 'green' }}>设备出库</span>
              </div>
            )
          }
          if (text === 3) {
            return (
              <div>
                <span style={{ color: 'purple' }}>设备安装</span>
              </div>
            )
          }
        }
      }, {
        title: '操作时间',
        dataIndex: 'date',
      }, {
        title: '操作员',
        dataIndex: 'userId',
      }],

      dbreports: [{
        title: '设备编号',
        dataIndex: 'deviceNum',
      }, {
        title: '生命周期',
        dataIndex: 'status',
        render: (text) => {
          if (text === 1) {
            return (
              <div>
                <span style={{ color: 'green' }}>设备入库</span>
              </div>
            )
          }
          if (text === 2) {
            return (
              <div>
                <span style={{ color: 'green' }}>设备出库</span>
              </div>
            )
          }
          if (text === 3) {
            return (
              <div>
                <span style={{ color: 'purple' }}>设备安装</span>
              </div>
            )
          }
        }
      }, {
        title: '操作时间',
        dataIndex: 'date',

      }, {
        title: '操作员',
        dataIndex: 'userId',
      }],


      readouts: [{
        title: '设备编号',
        dataIndex: 'deviceNum',
      }, {
        title: '时间',
        dataIndex: 'date',
      }, {
        title: '读数',
        dataIndex: 'reading',
      }],
    };

    this.column = [{
      title: '发货单位',
      dataIndex: '发货单位',
    }, {
      title: '历史读数',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showhistory(text)}
          >详情</a>
          <Modal
            title="历史读数"
            // maskStyle={{ background: "black", opacity: '0.1' }}
            visible={this.state.historyvisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
          >
            <Table
              dataSource={this.state.readout}
              columns={this.state.readouts}
              rowClassName="editable-row"
            />
          </Modal>
        </div>
    }, {
      title: '水表编号',
      dataIndex: 'district_id',
    }, {
      title: '网络运营商',
      dataIndex: '网络运营商',
    }, {
      title: '水表类型',
      dataIndex: '水表类型',
    }, {
      title: '连网IP，连网端口',
      dataIndex: '连网IP，连网端口',
    }, {
      title: '安装起始读数',
      dataIndex: '起始读数',
    }, {
      title: '设备生命周期',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.dblifeshowModal(text)} style={{ marginRight: '10px' }}
          >详情</a>
          <Modal
            title="生命周期"
            visible={this.state.dblookshow}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
            okText="确认"
            cancelText="取消"
          >
            <Table
              dataSource={this.state.reports}
              columns={this.state.dbreports}
              rowClassName="editable-row"
            />

          </Modal>
        </div>
    }, {
      title: '设备安装时间',
      dataIndex: '设备安装时间',
    }, {
      title: '详情',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showModal(text)}
          >详情</a>
          <Modal
            title="无线单表其他信息"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
          >
            <p>水表版本:{this.state.sbbb}</p>
            <p>电路板号:{this.state.dlbh}</p>
            <p>处部编号:{this.state.cbbh}</p>
            <p>正面编号:{this.state.zmbh}</p>
            <p>程序版本:{this.state.cxbb}</p>
            <p>IMEI号:{this.state.imei}</p>
            <p>ICCID:{this.state.iccid}</p>
          </Modal>
        </div>
    }];

    this.sbcolumn = [{
      title: '水表编号',
      dataIndex: 'general_num',
    }, {
      title: '水表门牌号',
      dataIndex: '水表门牌号',
    }, {
      title: '软件版本',
      dataIndex: '软件版本',
    }, {
      title: '所属采集器号',
      dataIndex: '所属采集器号',
    }, {
      title: '所属发货单号',
      dataIndex: '所属发货单号',
    }];


    this.columns = [{
      title: 'IMEI',
      dataIndex: 'IMEI',
    }, {
      title: '版本号',
      dataIndex: '版本号',
    }, {
      title: '集中器号',
      dataIndex: 'collector_num',
    }, {
      title: '集中器类型',
      dataIndex: '集中器类型',
    }, {
      title: '电流',
      dataIndex: '电流',
    }, {
      title: '电压',
      dataIndex: '电压',
    },
    {
      title: 'ICCID',
      dataIndex: 'ICCID',
    }, {
      title: '所属客户地区',
      dataIndex: '所属客户地区',
    },
    {
      title: '设备生命周期',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.lifeshowModal(text)} style={{ marginRight: '10px' }}
          >详情</a>
          <Modal
            title="生命周期"
            visible={this.state.lookshow}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
            okText="确认"
            cancelText="取消"
          >
            <Table
              dataSource={this.state.report}
              columns={this.state.lifereport}
              rowClassName="editable-row"
            />

          </Modal>
        </div>
    },
    {
      title: '设备安装时间',
      dataIndex: '设备安装时间',
    }, {
      title: '所属发货单号',
      dataIndex: '所属发货单号',
    },
    ];
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
      lookshow: false,
      dblookshow: false,
      historyvisible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      lookshow: false,
      dblookshow: false,
      historyvisible: false,
    });
  }
  tabchange = (e) => {
    this.setState({
      tabnum: e,
    });
  }
  state = { visible: false }
  showModal = (text) => {
    getDeviceDetail([
      text,
      2,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          visible: true,
          sbbb: res.data.data.ipPort,
          dlbh: res.data.data.ipPort,
          cbbh: res.data.data.ipPort,
          zmbh: res.data.data.ipPort,
          cxbb: res.data.data.reportingInterval,
          imei: res.data.data.imei,
          iccid: res.data.data.iccid,
        });
      }
    });
  }
  state = { lookshow: false }
  lifeshowModal = (text) => {
    getLifecycleDetail([
      123,
      this.state.tabnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          report: res.data.data,
          lookshow: true,
        });
      }
    });
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === text) {
        this.setState({
          lookshow: true,
          name: this.state.data[i].linkman,
          phone: this.state.data[i].phone,
          email: this.state.data[i].email,
        });
      }
    }
  }
  state = { dblookshow: false }
  dblifeshowModal = (text) => {
    getLifecycleDetail([
      text,
      this.state.tabnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          reports: res.data.data,
          dblookshow: true,
        });
      }
    });
    for (var i = 0; i < this.state.dbdata.length; i++) {
      if (this.state.dbdata[i].id === text) {
        this.setState({
          dblookshow: true,
          name: this.state.dbdata[i].linkman,
          phone: this.state.dbdata[i].phone,
          email: this.state.dbdata[i].email,
        });
      }
    }
  }
  //获取历史读数（无线单表）
  state = { historyvisible: false }
  showhistory = (text) => {
    getHistoryReading([
      1,
      this.state.tabnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          readout: res.data.data,
          historyvisible: true,
        });
      }
    });
    for (var i = 0; i < this.state.dbdata.length; i++) {
      if (this.state.dbdata[i].id === text) {
        this.setState({
          historyvisible: true,
          name: this.state.dbdata[i].linkman,
          phone: this.state.dbdata[i].phone,
          email: this.state.dbdata[i].email,
        });
      }
    }
  }


  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.length)
    this.setState({
      selectedRowKeys,
      keylist: selectedRowKeys,
    });
  }
  componentWillMount = () => {
    document.title = "设备基本信息";
    function showTime() {
      let nowtime = new Date();
      let year = nowtime.getFullYear();
      let month = nowtime.getMonth() + 1;
      let date = nowtime.getDate();
      document.getElementById("mytime").innerText = year + "年" + month + "月" + date + " " + nowtime.toLocaleTimeString();
    }
    setInterval(showTime, 1000);


    wirelessbasic([
      '',
      '',
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        console.log(res.data.data)
        this.setState({
          dbdata: res.data.data,
          num1: res.data.data.length,
        });
      }
    });


    collectorbasic([
      '',
      '',
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        console.log(res.data.data)
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });


    generalbasic([
      '',
      '',
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        console.log(res.data.data)
        this.setState({
          dataSource: res.data.data,
          num2: res.data.data.length,
        });
      }
    });
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys > 0;
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });

    const column = this.column.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });

    const sbcolumn = this.sbcolumn.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });

    return (
      <div id="basicbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div />
            <div className="Layout-left">
              <Menu
                defaultSelectedKeys={['4']}
                defaultOpenKeys={['sub2']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="0" style={{ background: '#1890ff', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                  <Menu.Item key="3"><Link to="/connector">接口信息</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="desktop" /><span>设备管理</span></span>}>
                  <Menu.Item key="4"><Link to="/basic">基本信息</Link></Menu.Item>
                  <Menu.Item key="5"><Link to="/status">设备状态</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/parameter">参数设置</Link></Menu.Item>
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
              <div className="Administrator">
                <span></span>{localStorage.getItem('realname')}超级管理员
            </div>
            </Header>
            <div className="nav">
              设备管理 / 基本信息
            </div>
            <div className="tit">
              基本信息
            </div>
            <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280 }}>
              <div className="current">
                <div className="curr">
                  <Tabs onChange={this.tabchange} type="card" style={{ background: 'white' }}>
                    <TabPane tab="采集器" key="1" style={{ padding: '20px' }}>
                      产品名称:<Input placeholder="请输入产品名称" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="productid" />
                      所属水务商:<Input placeholder="请输入水务商名称" style={{ width: '20%', marginLeft: '10px' }} id="sws" />
                      <div style={{ float: "right" }}>
                        <Button type="primary" style={{ marginRight: '20px' }} onClick={this.equipmentquery}>查询</Button>
                        <Button>重置</Button>
                      </div>
                      <div className="derive">
                        <Icon type="info-circle-o" />
                        &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                          {hasSelected ? `   ${selectedRowKeys.length}  ` : ''}
                        </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <Table
                          rowSelection={rowSelection}
                          dataSource={this.state.data}
                          columns={columns}
                          rowClassName="editable-row"
                        />
                      </div>
                    </TabPane>
                    <TabPane tab="无线单表" key="2" style={{ padding: '20px' }}>
                      产品名称:<Input placeholder="请输入产品名称" style={{ width: '20%', marginLeft: '10px' }} id="productid" />
                      <div style={{ float: "right" }}>
                        <Button type="primary" style={{ marginRight: '20px' }} onClick={this.equipmentquery}>查询</Button>
                        <Button>重置</Button>
                      </div>
                      <div className="derive">
                        <Icon type="info-circle-o" />
                        &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                          {hasSelected ? `   ${selectedRowKeys.length}  ` : ''}
                        </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num1}</span> 条
                <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <Table
                          rowSelection={rowSelection}
                          dataSource={this.state.dbdata}
                          columns={column}
                          rowClassName="editable-row"
                        />
                      </div>
                    </TabPane>
                    <TabPane tab="普通水表" key="3" style={{ padding: '20px' }}>
                      产品名称:<Input placeholder="请输入产品名称" style={{ width: '20%', marginLeft: '10px' }} id="productid" />
                      <div style={{ float: "right" }}>
                        <Button type="primary" style={{ marginRight: '20px' }} onClick={this.equipmentquery}>查询</Button>
                        <Button>重置</Button>
                      </div>
                      <div className="derive">
                        <Icon type="info-circle-o" />
                        &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                          {hasSelected ? `   ${selectedRowKeys.length}  ` : ''}
                        </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num2}</span> 条
                <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <Table
                          rowSelection={rowSelection}
                          dataSource={this.state.dataSource}
                          columns={sbcolumn}
                          rowClassName="editable-row"
                        />
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default journal = createForm()(journal);

