/**
 * 使用mockjs提供mock数据接口
 * 
 */
import Mock from 'mockjs';
import data from './order.json';
//提取数据
let hot = data[0];
let cold = data[1];
let drink = data[2];
// 返回热菜的接口
Mock.mock('/hotFood', {code:0, data:hot})
// 返回冷菜的接口
Mock.mock('/cold', {code:0, data:cold})
// 返回饮料的接口
Mock.mock('/drink', {code:0, data:drink})
// export default ???  不需要暴露数据, 运行一次即可