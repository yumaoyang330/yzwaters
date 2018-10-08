import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Cascader, Select, Table, Popconfirm,message,Modal } from 'antd';
import { waterMerchant,waterdelete} from '../axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createForm } from 'rc-form';
import './waterman.css';

const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const options = [{
  value: 'zhejiang',
  label: '浙江',
  children: [{
    value: 'hangzhou',
    label: '杭州',
    children: [{
      value: 'xihu',
      label: '西湖区',
      children: [{
        value: "xuejun",
        label: "学军中学"
      }]
    }, {
      value: '上城区',
      label: '上城区',
      children: [{
        value: '杭州十一中',
        label: '杭州十一中',
      }, {
        value: '杭州市十中',
        label: "杭州市十中"
      }, {
        value: '凤凰小学',
        label: "凤凰小学"
      }, {
        value: '胜利小学',
        label: "胜利小学"
      }]
    }],
  }],
}];
class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.columns = [{
      title: '水务商名称',
      dataIndex: 'name',
    }, {
      title: '详细地址',
      dataIndex: 'district_detail',
    }, {
      title: '设备总数量(台)',
      dataIndex: '设备总数量',
    }, {
      title: '已安装设备数量(台)',
      dataIndex: '已安装设备数量',
    }, {
      title: '负责人信息',
      dataIndex: 'id',
      render: (text, record, index) =>
      <div>
        <a onClick={() => this.showModal(text)}
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
      title: '服务器信息',
      dataIndex: 'server',
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ marginLeft: '10px' }}>
              <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(text)}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          </div>
        );
      },
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
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  showModal = (text) => {
    for (var i = 0; i < this.state.dataSource.length; i++) {
      if (this.state.dataSource[i].id === text) {
        this.setState({
          visible: true,
          name: this.state.dataSource[i].linkman,
          phone: this.state.dataSource[i].phone,
          email: this.state.dataSource[i].email,
        });
      }
    }
  }

  onDelete = (text,key) => {
    console.log(text)
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        waterdelete([
          text,
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            message.success("信息删除成功");
            const dataSource = [...this.state.dataSource];
            this.setState({
              num: this.state.num - 1,
              dataSource: dataSource.filter(item => item.key !== key)
            });
            setTimeout(() => {
              window.location.href = "/waterman";
            }, 1000);
          } 

        });
      }
    });
  }
  componentWillMount = () => {
    document.title = "水务商";
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
        waterMerchant([
          '',
          '',
          '',
          '',
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            console.log(res.data.data)
            this.setState({
              dataSource: res.data.data,
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
      <div id="watermanbody" >
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
              <span style={{ float: 'right', height: '64px', lineHeight: "64px", marginRight: "2%",cursor: 'pointer' }} onClick={this.out}>
              <Icon type="poweroff"  style={{marginRight:'10px'}}/>退出
              </span>
              <div className="Administrator">
                <span></span>{localStorage.getItem('realname')}超级管理员
            </div>
            </Header>
            <div className="nav">
            用户管理 / 水务商
            </div>
            <div className="tit">
              水务商
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,paddingTop:'10px'  }}>
              位置选择：<Cascader
                defaultValue={['zhejiang', 'hangzhou', 'xihu', 'xuejun']}
                options={options}
                onChange={this.onChange}
                changeOnSelect style={{ marginLeft: '10px' }}
              />
              <div style={{ float: "right" }}>
                <Button type="primary" style={{ marginRight: '20px' }} onClick={this.equipmentquery}>查询</Button>
                <Button>重置</Button>
                <Button type="primary" style={{ marginLeft: '20px' }}><Link to="/offline">添加水务商</Link></Button>
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
                  dataSource={this.state.dataSource}
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

