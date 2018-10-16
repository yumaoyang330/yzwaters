import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, message, Select, Input } from 'antd';
import { Link } from 'react-router-dom';
import { simpleuser,useradd } from '../axios';
import moment from 'moment';
import { createForm } from 'rc-form';
import './newaccount.css';



function handleChange(value) {
  console.log(`Selected: ${value}`);
}


var accounttype = [];
// var accounttype=['单位管理员', '单位滤芯维护人员', '区级管理员', '超级管理员'];
const { TextArea } = Input;
const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      accounttype: '',
      size: 'default',
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  submit = () => {
    console.log
    let phone = document.getElementById('phone_num').value;
    let nameval = document.getElementById('name_val').value;
    var telrule = /^[1][3,4,5,7,8][0-9]{9}$/;
    var namerule = /^[\u4E00-\u9FA5A-Za-z]+$/;
    phone.toString();
    console.log(phone)
    this.props.form.validateFields({ force: true }, (error, fieldsValue) => {
      if (!telrule.test(phone)) {
        message.error('您输入的手机号码不合法');
        return;
      }
      if (!namerule.test(nameval)) {
        message.error('请输入您的真实姓名');
        return;
      }
      if (!error) {
        useradd([

        ]).then(res => {
          if (res.data && res.data.status === 1) {
            message.success('账号创建成功');
            setTimeout(() => {
              window.location.href = "/contact";
            }, 1000);
          } else {
            message.error('账号创建失败');
          }
        });
      } else {
        message.error('账号创建失败');
      }
    });
  }


  componentWillMount = () => {
    document.title = "添加账户";
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
        simpleuser([]).then(res => {
          if (res.data && res.data.message === 'success') {
            for (var i = 0; i < res.data.data.length; i++) {
              accounttype.push(res.data.data[i].name)
            }
            console.log(accounttype)
          }
        });
      }
    })

  }
  render() {
    const { size } = this.state;
    console.log(accounttype)
    // const account = accounttype.map((province, id) => <Option key={province.id}>{province.name}</Option>);
    const account = accounttype.map(accounts => <Option key={accounts}>{accounts}</Option>);
    return (
      <div id="newaccountbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div />
            <div className="Layout-left">
              <Menu
                defaultSelectedKeys={['7']}
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
              用户管理 / 账户管理 / 添加账户
            </div>
            <div className="tit">
              添加账户
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <div className="current">
                <div className="current_text">
                  <div className="explain">
                    <div>
                      <span style={{ color: '#000000' }}>尊敬的 </span>
                      <span style={{ color: "#1890FF" }}></span>
                      <span style={{ color: "#000000" }}> 你好，依据平台设定，您具有以下账号管理权限：</span>
                    </div>
                    <div className='explaintext'>
                      1.创建各饮水 <span style={{ color: "#1890FF" }}>单位管理员</span> ，以添加他们获得水量预警信息、设备掉线信息。
                  他们将具有登录平台使用完整的<span style={{ color: "#1890FF" }}> 流量监控</span> 模块、
                  完整的 <span style={{ color: "#1890FF" }}>设备管理</span> 模块、完整的 <span style={{ color: "#1890FF" }}>查询管理</span> 模块、部分的
                  <span style={{ color: "#1890FF" }}>账号管理</span> 模块的权限，单位管理员 可创建 <span style={{ color: "#1890FF" }}>产品维护员</span> 账号，
                  产品维护员可以使用流程监控的 <span style={{ color: "#1890FF" }}>流量告警</span> 功能、
                  设备管理的 <span style={{ color: "#1890FF" }}>设备在线查询</span> 功能，单位管理员与产品维护员在平台上的所有操作将计入 <span style={{ color: "#1890FF" }}>系统日志</span>。
                  </div>
                  </div>
                  <div className="content">
                    <div className='addinput'>
                      <span>账户类型：</span>
                      <Select
                        mode="tags"
                        size={size}
                        style={{ width: '60%' }}
                        placeholder="请选择账户类型"
                        onChange={handleChange}
                      // onChange={this.usertypes}
                      >
                        {account}
                      </Select>
                    </div>
                    <div className='addinput'>
                      <span>姓名：</span>
                      <Input placeholder="张三" id="name_val"
                        placeholder="请输入姓名"
                        style={{ width: '60%' }}
                      />
                    </div>
                    <div className='addinput'>
                      <span>手机：</span>
                      <Input placeholder="123745758" style={{ width: '60%' }}
                        id="phone_num"
                        placeholder="请输入您的手机号"
                      />
                    </div>
                    <div className='addinput'>
                      <span>邮箱：</span>
                      <Input placeholder="1234567890@qq.com"
                        placeholder="请输入邮箱"
                        style={{ width: '60%' }}
                      />
                    </div>
                    <div className='addinput'>
                      <span>用户名：</span>
                      <Input placeholder="aaa"
                        placeholder="请输入用户名"
                        style={{ width: '60%' }}
                      />
                    </div>
                    <div className='addinput'>
                      <span>初始密码：</span>
                      <Input placeholder="123456"
                        placeholder="请输入密码"
                        style={{ width: '60%' }}
                      />
                    </div>
                    {/* <div className='addtextarea'>
                      备注：
                        <TextArea rows={4} style={{ marginTop: '20px' }} id="remake"
                        placeholder="请输入备注（选填）"
                      />
                    </div> */}
                    <div className="btn">
                      <Button type="primary" style={{ marginRight: '20px' }} onClick={this.submit}>提交</Button>
                      <Button><a href="">重置</a></Button>
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
export default journal = createForm()(journal);

