/*
 * @Author: your name
 * @Date: 2021-06-28 11:36:37
 * @LastEditTime: 2021-06-30 14:01:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \answer\api\index.js
 */
import fly from '../utils/instance'
export default {
    // 登录获取登录token
    wx_mini_login(params) {
        return fly({
            url: `wx_mini_login`,
            method: 'post',
            params,
            noToastError: true
        })
    },
    // 获取答题分类
    get_class(params) {
        return fly({
            url: `get_class`,
            method: 'post',
            params
        })
    },
    // 绑定手机号
    postPhone(params) {
        return fly({
            url: `buildPhone`,
            method: 'post',
            params
        })
    },

    // 获取用户信息
    getUserInfo(params) {
        return fly({
            url: `getUserInfo`,
            method: 'get',
            params
        })

    },
    // 修改用户信息
    editUserInfo(params) {
        return fly({
            url: `editUserInfo`,
            method: 'post',
            params
        })

    },
    // 获取学习报表
    getMyscore(params) {
        return fly({
            url: `getMyscore`,
            method: 'get',
            params
        })
    },
    // 获取答题 
    getProblem(params) {
        return fly({
            url: `getProblem`,
            method: 'get',
            params
        })
    },
    // 获取挑战答题 
    getTzProblem(params) {
        return fly({
            url: `getTzProblem`,
            method: 'get',
            params
        })
    },
    // 提交答题成绩
    subDtProblem(params) {
        return fly({
            url: `subDtProblem`,
            method: 'post',
            params
        })
    },
    // 提交挑战成绩
    subTzProblem(params) {
        return fly({
            url: `subTzProblem`,
            method: 'post',
            params
        })
    },
    // 排行榜
    getReport(params) {
        return fly({
            url: `getReport`,
            method: 'get',
            params
        })
    }

}