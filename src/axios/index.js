import http from './tools';
// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

// const url='http://112.124.6.31:9090';
const url='http://192.168.31.180:9090';


//1.1登录界面
export const login = (params) => myapi(url + '/login', {
	username: params[0],
	password: params[1],
});


//2.1 产品信息
//2.1.0 获取省->市->区->单位级联菜单数据
// export const gets = (params) => http.get(url + '/site/all1', {
// });


//2.1.1 获取单位
export const site = (params) => http.get(url + '/site/'+params[0], {
});

//2.1.1 查询产品
export const product = (params) => http.get(url + '/product/view', {
	name: params[0],
	version:params[1],
	model:params[2],
	serial:params[3],
	networkoperator:params[4],
	remark:params[5],
});

//2.1.2 删除产品
export const productdelete = (params) => http.post(url + '/product/delete', {
	id: params[0],
});
//2.1.3 获取产品详情
export const productdetail = (params) => http.post(url + '/product/detail', {
	id: params[0],
});


//2.2 新增产品
export const productadd = (params) => http.post(url + '/product/add', {
	deviceInsertDTO: params,
});
//3.1 采集器设备状态
export const collector = (params) => http.get(url + '/device/state/collector', {
	signalIntensity: params[0],
	deviceStatus:params[1],
	districtId:params[2],
	districtSite:params[3],
});


//3.2 普通水表设备状态
export const general = (params) => http.get(url + '/device/state/general', {
	valve: params[0],
	printWheel:params[1],
	districtId:params[2],
	districtSite:params[3],
});

//3.3 无线单表设备状态
export const wireless = (params) => http.get(url + '/device/state/wireless', {
	signalIntensity: params[0],
	printWheel:params[1],
	valve:params[2],
	onlineStatus:params[3],
	districtId:params[4],
	districtSite:params[5],
});

//3.4 无线单表基本信息
export const wirelessbasic = (params) => http.get(url + '/device/basic/wireless', {
	networkOperator: params[0],
	type:params[1],
	districtId:params[2],
	districtSite:params[3],
});
//3.4.1 无线单表详情
export const getDeviceDetail = (params) => http.get(url + '/device/basic/getDeviceDetail', {
	networkOperator: params[0],
	type:params[1],
	districtId:params[2],
	districtSite:params[3],
});

//3.5 普通水表基本信息
export const generalbasic = (params) => http.get(url + '/device/basic/general', {
	networkOperator: params[0],
	type:params[1],
	districtId:params[2],
	districtSite:params[3],
});

//3.6 采集器基本信息
export const collectorbasic = (params) => http.get(url + '/device/basic/collector', {
	networkOperator: params[0],
	type:params[1],
	districtId:params[2],
	districtSite:params[3],
});



//4.用户管理
//4.1 获取水务商详情

export const waterMerchant = (params) =>  http.get(url + '/waterMerchant/view', {
	id:params[0]
});

//4.1.2 删除水务商 
export const waterdelete = (params) =>  http.post(url + '/waterMerchant/delete', {
	id:params[0]
});

//4.2 账户管理
export const accountview = (params) =>  http.get(url + '/userManage/account/view', {
	id:params[0]
});

//4.3 角色管理
//4.3.1 角色列表
export const rolelist = (params) =>  http.get(url + '/userManage/roleManege/role/view', {
});

//4.3.2 角色列表
export const rolelists = (params) =>  http.get(url + '/userManage/roleManege/role/view', {
});

//4.3.3 新增角色
export const roleadd = (params) =>  http.post(url + '/userManage/roleManege/role/add', {
	name:params[0],
	value:params[1]
});

//4.3.4 角色分配
export const userrole = (params) =>  http.get(url + '/userManage/roleManege/user_role/view', {
});

//4.3.5 权限列表  
export const powerlist = (params) =>  http.get(url + '/userManage/roleManege/menu/view', {
});

//4.3.6 权限分配
export const rolemenu = (params) =>  http.get(url + '/userManage/roleManege/role_menu/view', {
});



//5.日志管理
//5.1 数据日志管理
export const datalogs = (params) =>  http.get(url + '/logging/data/view', {
	id:params[0]
});

//5.2 设备日志管理
export const devicelogs = (params) =>  http.get(url + '/logging/device/view', {
	id:params[0]
});

//5.3 用户日志
//5.3.1 用户登录登出日志管理
export const loginAndLogout = (params) =>  http.get(url + '/logging/consumer/loginAndLogout/view', {
	id:params[0]
});
//5.3.2 用户其他日志管理
export const otherlogs = (params) =>  http.get(url + '/logging/consumer/other/view', {
	id:params[0]
});


//6.生命周期
export const getLifecycle = (params) =>  http.get(url + '/lifecycle/basic/getLifecycle', {
	type:params[0]
});



async function myapi(url, param) {
	const res = await http.post(url, param);
	if (res.data.status === 0) {
		// return <Redirect to={"/login"}/>
		// window.location.href = "/login";
	}
	else return res;
	// return http.post(url,param);	
}