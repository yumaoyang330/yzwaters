import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Cascader, Select, Table, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { collector, general, wireless, site } from '../axios';
import moment from 'moment';
import { createForm } from 'rc-form';
import './status.css';

const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;


class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.columns = [{
      title: '信号强度',
      dataIndex: 'signalIntensity',
    }, {
      title: '基站信息',
      dataIndex: 'baseStation',
    }, {
      title: '在线状态',
      dataIndex: 'deviceStatus',
    }, {
      title: '连网IP及端口',
      dataIndex: 'ipPort',
    }, {
      title: '挂表数',
      dataIndex: 'collectorNum',
    }, {
      title: '操作员',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showModal(record.key)}
          >详情</a>
          <Modal
            title="联系方式"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
          >
            <p>姓名:&nbsp;&nbsp;{this.state.name}</p>
            <p>电话:&nbsp;&nbsp;{this.state.phone}</p>
            <p>邮箱:&nbsp;&nbsp;{this.state.email}</p>
          </Modal>
        </div>
    }, {
      title: '上报间隔时间',
      dataIndex: 'signalIntensity',
    }];

    this.column = [{
      title: '信号强度',
      dataIndex: 'signalIntensity',
    }, {
      title: '当前字轮',
      dataIndex: 'printWheel',
    }, {
      title: '阀门状态',
      dataIndex: 'valve',
    }, {
      title: '当前电压',
      dataIndex: 'siteName',
    }, {
      title: '最新读数',
      dataIndex: 'readingLatest',
    }, {
      title: '上线间隔(分钟)',
      dataIndex: 'reportingInterval',
    }, {
      title: '在线状态',
      dataIndex: 'onlineStatus',
    }, {
      title: '基站信息',
      dataIndex: 'baseStation',
    }, {
      title: '上报日期时间',
      dataIndex: 'reported_datetime',
    }, {
      title: '操作员',
      dataIndex: 'lastConnectTime',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showModaldb(record.key)}
          >详情</a>
          <Modal
            title="联系方式"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
          >
            <p>姓名:&nbsp;&nbsp;{this.state.name}</p>
            <p>电话:&nbsp;&nbsp;{this.state.phone}</p>
            <p>邮箱:&nbsp;&nbsp;{this.state.email}</p>
          </Modal>
        </div>
    }];

    this.sbcolumn = [{
      title: '水表阀门状态',
      dataIndex: 'valve',
    }, {
      title: '水表字轮',
      dataIndex: 'printWheel',
    }, {
      title: '水表所在通道号',
      dataIndex: 'chanelnum',
    }, {
      title: '设备生命周期',
      dataIndex: 'siteName',
    }, {
      title: '操作员',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showModalsb(record.key)}
          >详情</a>
          <Modal
            title="联系方式"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
          >
            <p>姓名:&nbsp;&nbsp;{this.state.name}</p>
            <p>电话:&nbsp;&nbsp;{this.state.phone}</p>
            <p>邮箱:&nbsp;&nbsp;{this.state.email}</p>
          </Modal>
        </div>
    }, {
      title: '设备安装时间',
      dataIndex: 'setupDatetime',
    }];

  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  showModal = (key) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].key === key) {
        this.setState({
          visible: true,
          name: this.state.data[i].operator,
          phone: this.state.data[i].phone,
          email: this.state.data[i].email,
        });
      }
    }
  }
  showModaldb = (key) => {
    for (var i = 0; i < this.state.dbdata.length; i++) {
      if (this.state.dbdata[i].key === key) {
        this.setState({
          visible: true,
          name: this.state.dbdata[i].operator,
          phone: this.state.dbdata[i].phone,
          email: this.state.dbdata[i].email,
        });
      }
    }
  }
  showModalsb = (key) => {
    for (var i = 0; i < this.state.ptdata.length; i++) {
      if (this.state.ptdata[i].key === key) {
        this.setState({
          visible: true,
          name: this.state.ptdata[i].operator,
          phone: this.state.ptdata[i].phone,
          email: this.state.ptdata[i].email,
        });
      }
    }
  }
  handleOk = (e) => {
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
  componentWillMount = () => {
    document.title = "设备状态";
    function showTime() {
      let nowtime = new Date();
      let year = nowtime.getFullYear();
      let month = nowtime.getMonth() + 1;
      let date = nowtime.getDate();
      document.getElementById("mytime").innerText = year + "年" + month + "月" + date + " " + nowtime.toLocaleTimeString();
    }
    setInterval(showTime, 1000);


    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        site([
          1,
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            this.setState({
              area: res.data.data,
            });
          }
        });
      }
    })

    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        collector([
          '',
          '',
          '',
          '',
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            this.setState({
              data: res.data.data,
              num: res.data.data.length,
            });
          }
        });
      }
    })

    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        wireless([
          '',
          '',
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
      }
    })


    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        general([
          '',
          '',
          '',
          '',
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            this.setState({
              ptdata: res.data.data,
              num2: res.data.data.length,
            });
          }
        });
      }
    })




  }
  render() {
    const options = this.state.area;
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
      <div id="statusbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div />
            <div className="Layout-left">
              <Menu
                defaultSelectedKeys={['5']}
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
              设备管理 / 设备状态
            </div>
            <div className="tit">
              设备状态
            </div>
            <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280 }}>
              <div className="current">
                <div className="curr">
                  <Tabs onChange={this.tabchange} type="card" style={{ background: 'white' }}>
                    <TabPane tab="采集器" key="1" style={{ padding: '20px' }}>
                      位置选择：<Cascader
                        options={options}
                        onChange={this.onChange}
                        changeOnSelect style={{ marginLeft: '10px' }}
                      />
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
                      位置选择：<Cascader
                        defaultValue={['zhejiang', 'hangzhou', 'xihu', 'xuejun']}
                        options={options}
                        onChange={this.onChange}
                        changeOnSelect style={{ marginLeft: '10px' }}
                      />
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
                      位置选择：<Cascader
                        defaultValue={['zhejiang', 'hangzhou', 'xihu', 'xuejun']}
                        options={options}
                        onChange={this.onChange}
                        changeOnSelect style={{ marginLeft: '10px' }}
                      />
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
                          dataSource={this.state.ptdata}
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

