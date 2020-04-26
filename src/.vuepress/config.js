const path = require('path')

module.exports = {
    title: 'Yahui的博客',
    description: '一只菜鸟前端的学习之路',
    port: 8888,
    head: [
        ['link', { rel: 'icon', href: '/logo.jpeg' }],
    ],
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        nav: [
            { text: 'CSS', link: '/pages/css/' },
            { text: 'JS', link: '/pages/js/' },
            { text: 'ES6', link: '/pages/es6/' },
        ],
        sidebar: {
            '/pages/css/': [{
                title: 'CSS',
                path: '/pages/css/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/js/': [{
                title: 'JS',
                path: '/pages/js/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/es6/': [{
                title: 'ES6',
                path: '/pages/es6/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
        },
        sidebarDepth: 2,
        lastUpdated: '更新时间'
    },
}
