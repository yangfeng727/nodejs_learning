// npm地址 https://www.npmjs.com/package/cheerio

// 1.引入模块
const cheerio = require('cheerio')
// 2.将获取的HTML片段装载到$对象中
const $ = cheerio.load('<h2 class="title">Hello world</h2>',{decodeEntities: false}) // decodeEntities：false 让文本不转换为实体符
// // 3.设置值（这里主要体验功能）
// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')
// // 4.获取所有的html代码
// $.html()

//需求：获取h2标签中的内容
console.log($('h2').html())

//需求：给h2标签中添加b标签=张某
$('h2').html('<b>张某</b>')
console.log($('h2').html())

