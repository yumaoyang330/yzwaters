import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Popconfirm, Select, Table, Input, message } from 'antd';
import { showchargewater } from '../axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createForm } from 'rc-form';
import './lookchargeman.css';

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
      title: '所在区域',
      dataIndex: 'district',
    }, {
      title: '所属水务商',
      dataIndex: 'water_merchant',
    }, {
      title: '账户名',
      dataIndex: 'username',
    }, {
      title: '用户姓名',
      dataIndex: 'name',
    }, {
      title: '联系方式',
      dataIndex: 'phone',
    }, {
      title: '邮箱',
      dataIndex: 'email',
    }
    ];
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }



  componentWillMount = () => {
    document.title = "区域主管";
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
        showchargewater([
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
      }
    })

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
    return (
      <div id="accountbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div />
            <div className="Layout-left">
              <Menu
                defaultSelectedKeys={['6']}
                defaultOpenKeys={['sub3']}
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
              用户管理 / 水务商 / 区域主管
            </div>
            <div className="tit">
              区域主管
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
              所属水务商:<Input placeholder="请输入账户类别" style={{ width: '20%', marginLeft: '10px' }} id="accounttype" />
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
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default journal = createForm()(journal);

