import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Cascader, Select, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { addchargewater, getall, simplewater } from '../axios';
import moment from 'moment';
import { createForm } from 'rc-form';
import './addchargeman.css';



const watermanarrs = [];
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
      province: '江苏省',
      watermanarrs: '',
      city: '',
      area: '',
      provinceid: '',
      cityid: '',
      areaid: '',
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  typeChange = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      waterMerchantId: date,
    });
  }
  onChange = (date, dateString) => {
    console.log(dateString)
    let arr = [];
    for (var i in dateString) {
      arr.push(dateString[i].label);
    }
    if (arr[1] === undefined) {
      this.setState({
        province: arr[0],
        city: '',
        area: '',
        provinceid: dateString[0].id,
      })
    } else {
      if (arr[2] === undefined) {
        this.setState({
          province: arr[0],
          city: arr[1],
          area: '',
          provinceid: dateString[0].id,
          cityid: dateString[1].id,
        })
      } else {
        if (arr[3] === undefined) {
          this.setState({
            province: arr[0],
            city: arr[1],
            area: arr[2],
            provinceid: dateString[0].id,
            cityid: dateString[1].id,
            areaid: dateString[2].id,
          });
        };
      }
    }

  }



  addwatermans = () => {
    let account = document.getElementById('account').value;
    let chargepassword = document.getElementById('chargepassword').value;
    let chargename = document.getElementById('chargename').value;
    let chargephone = document.getElementById('chargephone').value;
    let chargeemail = document.getElementById('chargeemail').value;
    var namerule = /^[\u4E00-\u9FA5A-Za-z]+$/;
    var telrule = /^[1][3,4,5,7,8][0-9]{9}$/;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (account === "") {
      message.error("请输入账号");
    } else if (chargepassword === "") {
      message.error("请输入密码");
    } else if (!namerule.test(chargename)) {
      message.error('请输入您的真实姓名');
    } else if (!telrule.test(chargephone)) {
      message.error('您输入的手机号码不合法');
    } else if (!filter.test(chargeemail)) {
      message.error('您输入的正确的邮箱格式');
    } else {
      this.props.form.validateFields({ force: true }, (error) => {
        if (!error) {
          addchargewater([
            account,
            chargepassword,
            chargename,
            chargephone,
            chargeemail,
            'super',
            this.state.provinceid,
            this.state.cityid,
            this.state.areaid,
            this.state.waterMerchantId,
          ]).then(res => {
            if (res.data && res.data.message === 'success') {
              message.success("区域主管添加成功");
              setTimeout(() => {
                window.location.href = "/lookchargeman";
              }, 1000);
            }
          });
        }
      });
    }
  }





  componentWillMount = () => {
    document.title = "添加区域主管";
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
        getall([

        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            this.setState({
              allarea: res.data.data,
            });
          }
        });
      }
    })


    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        simplewater([]).then(res => {
          if (res.data && res.data.message === 'success') {
            for (var i = 0; i < res.data.data.length; i++) {
              watermanarrs.push(res.data.data[i])
            }
          }
        });
      }
    })

  }

  render() {
    console.log(watermanarrs)
    const provinceOptions = watermanarrs.map((province, id) => <Option key={province.id}>{province.name}</Option>);
    const options = this.state.allarea;
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
                {localStorage.getItem('realname')}超级管理员
            </div>
            </Header>
            <div className="nav">
              用户管理 / 水务商 / 添加区域主管
            </div>
            <div className="tit">
              添加区域主管
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <div className="current">
                <div className="current_text">
                  <div className="content">
                    <div className='addinput'>
                      <span>所在地区：</span>
                      <Cascader
                        value={[this.state.province, this.state.city, this.state.area, this.state.school]}
                        changeOnSelect options={options} onChange={this.onChange}
                        style={{ display: 'inline-block', width: '60%', textAlign: 'left' }}
                      />
                    </div>
                    <div className='addinput'>
                      <span>账号：</span>
                      <Input placeholder="请输入账号" id="account" style={{ width: '60%' }} />
                    </div>
                    <div className='addinput'>
                      <span>密码：</span>
                      <Input style={{ width: '60%' }}
                        id="chargepassword"
                        placeholder="请输入密码"
                      />
                    </div>
                    <div className='addinput'>
                      <span>用户姓名：</span>
                      <Input style={{ width: '60%' }}
                        id="chargename"
                        placeholder="请输入用户真实姓名"
                      />
                    </div>
                    <div className='addinput'>
                      <span>联系方式：</span>
                      <Input style={{ width: '60%' }}
                        id="chargephone"
                        placeholder="请输入用户电话"
                      />
                    </div>
                    <div className='addinput'>
                      <span>邮箱：</span>
                      <Input style={{ width: '60%' }}
                        id="chargeemail"
                        placeholder="请输入用户邮箱"
                      />
                    </div>
                    <div className='addinput'>
                      <span>所属水务商：</span>
                      <Select
                        className="one"
                        onChange={this.typeChange}
                        style={{ width: '60%' }}
                        defaultValue={provinceOptions[0]}
                        placeholder="请选择水务商"
                      >
                        {provinceOptions}
                      </Select>
                    </div>
                    <div className="btn">
                      <Button type="primary" style={{ marginRight: '20px' }} onClick={this.addwatermans}>提交</Button>
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

