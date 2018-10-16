import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Input, Select, Table, Form, Popconfirm, InputNumber, message } from 'antd';
import { setparameter, editReportingIntervalW } from '../axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createForm } from 'rc-form';
import './parameter.css';

const Option = Select.Option;

const switchtypes = ['关阀', '半悬', '开阀'];
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const typetext = {
  "0": "关阀",
  "1": '半悬',
  "2": '开阀',
};
const typenum = {
  "关阀": '0',
  "半悬": '1',
  "开阀": '2',
};
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
class journal extends React.Component {

  constructor(props) {
    const typeOptions = switchtypes.map(type => <Option key={type}>{type}</Option>);
    super(props);
    this.state = {
      collapsed: false,
      editingKey: '',
      keylist:'',
    };


    this.sbcolumn = [{
      title: '产品名称',
      dataIndex: '产品名称',
      editable: true,
    }, {
      title: '产品编号',
      dataIndex: 'general_num',
      editable: true,
    }, {
      title: '开关阀设置',
      dataIndex: '开关阀设置',
      editable: true,
      render: (text, record, index) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <Select defaultValue={typetext[text]} className="one" onChange={this.typeChange} style={{ width: '80%' }} disabled={false} >
                {typeOptions}
              </Select>
            ) : (
                <Select defaultValue={typetext[text]} className="one" onChange={this.typeChange} style={{ width: '80%' }} disabled={true} >
                  {typeOptions}
                </Select>
              )
            }</div>
        )
      }
    }, {
      title: '所属采集器',
      dataIndex: '集中器号',
      editable: true,
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record, index) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form, record.key, index)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                      </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="确认要取消吗?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
                <a onClick={() => this.edit(record.key)}>编辑</a>
              )}
          </div>
        );
      }

    }
    ];


    this.column = [{
      title: '产品名称',
      dataIndex: '产品名称',
      editable: true,
    }, {
      title: '产品编号',
      dataIndex: 'wireless_num',
    }, {
      title: '开关阀设置',
      dataIndex: '开关阀设置',
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <Select defaultValue={typetext[text]} className="one" onChange={this.typeChange} style={{ width: '80%' }} disabled={false} >
                {typeOptions}
              </Select>
            ) : (
                <Select defaultValue={typetext[text]} className="one" onChange={this.typeChange} style={{ width: '80%' }} disabled={true} >
                  {typeOptions}
                </Select>
              )
            }</div>
        )
      }
    }, {
      title: '上传时间间隔',
      dataIndex: '上传时间间隔',
      editable: true,
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record, index) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form, record.key, index)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                      </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="确认要取消吗?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
                <a onClick={() => this.edit(record.key)}>编辑</a>
              )}
          </div>
        );
      }
    }
    ];
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.length)
    this.setState({
      selectedRowKeys,
      keylist: selectedRowKeys,
    });
  }
  typeChange = (date, dateString) => {
    this.setState({
      selecttype: date,
      selectnum: typenum[date],
    });
  }
  edit(key) {
    this.setState({
      editingKey: key,
    });
  }
  isEditing = (record) => {
    return record.text === this.state.editingKey;
  };
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({
          data: newData, editingKey: '',
        }, () => {
          this.props.form.validateFields({ force: true }, (error) => {
            if (!error) {
              editReportingIntervalW([
                key,
                this.state.preAlertThreshold,
                this.state.alertThreshold,
              ]).then(res => {
                if (res.data && res.data.status === 1) {
                  if (res.data.updateResult === 1) {
                    message.success("信息编辑成功");
                  } else {
                    message.error("信息编辑失败");
                  }
                } else {
                  message.error("加载失败");
                }
              });
            } else {
              message.error("请填好所有选项");
            }
          });

        });
      } else {
        newData.push(this.state.data);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }




  
  cancel = () => {
    this.setState({ editingKey: '' });
  };

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


    setparameter([
      null,
      1,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        console.log(res.data.data)
        this.setState({
          dbdata: res.data.data,
          num1: res.data.data.length,
        });
      }
    });


    setparameter([
      null,
      3,
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
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys > 0;
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
                defaultSelectedKeys={['2']}
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
              设备管理 / 参数设置
            </div>
            <div className="tit">
              参数设置
            </div>
            <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280 }}>
              <div className="current">
                <div className="curr">
                  <Tabs onChange={this.tabchange} type="card" style={{ background: 'white' }}>
                    <TabPane tab="无线单表" key="1" style={{ padding: '20px' }}>
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
                    <TabPane tab="普通水表" key="2" style={{ padding: '20px' }}>
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
                          components={components}
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

