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
            { text: 'TS', link: '/pages/TS/' },
            { text: '框架', link: '/pages/frame/' },
            { text: 'Node', link: '/pages/node/' },
            { text: '浏览器', link: '/pages/browser/' },
            { text: '网络', link: '/pages/network/' },
            { text: '优化', link: '/pages/optimize/' },
            { text: 'webpack', link: '/pages/webpack/' },
            { text: '架构', link: '/pages/framework/' },
            { text: '开发问题', link: '/pages/question/' },
        ],
        sidebar: {
            '/pages/css/': [{
                title: 'CSS',
                path: '/pages/css/',
                collapsable: false,
                children: [
                    '',
                    'CSS3',
                        'LESS',
                        'SCSS',
                ]
            }],
            '/pages/js/': [
                {
                    title: 'JS',
                    path: '/pages/js/',
                    collapsable: false,
                    children: [
                        '',
                        'Object',
                        'Array',
                        'ObjectMethods',
                        'Date',
                        'Math',
                        'Number',
                        'String',
                        'RegExp',
                        'Global',
                        'BOM',
                        'DOM',
                        'Form',
                        'Error',
                    ]
                }
            ],
            '/pages/es6/': [{
                title: 'ES6',
                path: '/pages/es6/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/TS/': [{
                title: 'TypeScript',
                path: '/pages/TS/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/frame/': [{
                title: '框架',
                path: '/pages/frame/',
                collapsable: false,
                children: [
                    '',
                    'vue',
                    'vueSource'
                ]
            }],
            '/pages/node/': [{
                title: 'Node',
                path: '/pages/node/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/browser/': [{
                title: '浏览器',
                path: '/pages/browser/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/network/': [{
                title: '网络',
                path: '/pages/network/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/optimize/': [{
                title: '优化',
                path: '/pages/optimize/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/webpack/': [{
                title: 'webpack',
                path: '/pages/webpack/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/question/': [{
                title: '开发问题',
                path: '/pages/question/',
                collapsable: false,
                children: [
                    ''
                ]
            }],
            '/pages/framework/': [
                '',
                'Implementation',
                'Workflow',
                'BuildFlow',
                'MultiPageApplication',
                'SinglePageApplication',
                'Componentization',
                'Separate',
                'Microfront',
                'ActualCombat',
                'Evolution',
            ],
        },
        sidebarDepth: 3,
        lastUpdated: '更新时间',
        searchMaxSuggestions: 10,
    },
}
