// api统一接口管理
import {fetchPost, fetchGet, fetchDel, fetchPut} from "../utils/https";

/**
 * @param {string} params
 * 我们定义了一个topics方法
 * 这个方法有一个参数params
 * params是我们请求接口时携带的参数对象
 * 而后调用了我们封装的post方法
 * post方法的第一个参数是我们的接口地址
 * 第二个参数是topics的params参数
 * 即请求接口时携带的参数对象
 * 最后通过export导出topics。
 */

// 获取首页banner
export const getBanner = () => fetchGet('/banner');
// 获取新闻列表
export const getNewsList = params => fetchGet('/news_list', params);
// 获取新闻列表配置
export const getNewsBase = () => fetchGet('/base');
// 获取文化动态列表

// 获取新闻详情
export const getNewsDetail = params => fetchGet('/news_detail', params);
// 获取课程列表
export const getCourse = params => fetchGet('/course', params);
// 获取课程分类
export const getCourseTree = () => fetchGet('/course_tree');
// 报名提交
export const postCourse = params => fetchPost('/course', params);
// 修改报名课程
export const putCourse = (data, params) => fetchPut('/user/sign_edit/' + data,  params);
// 课程取消
export const delCourse = params => fetchDel('/user/sign_del/'+ params);
// 用户登录
export const postLogin = params => fetchPost('/login', params);
// 获取已报名的数据
export const getSign = () => fetchGet('/user/sign');

// 获取教室
export const getClassroom = () => fetchGet('/classroom');
// 场地预约
export const postBookClassroom = params => fetchPost('/booking', params);
// 意见建议/咨询指导
export const postFeedback = params => fetchPost('/feedback', params);