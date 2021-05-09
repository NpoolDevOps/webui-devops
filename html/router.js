const devops = httpVueLoader('/main/devops.vue')
const devopsdt = httpVueLoader('/main/devopsdt.vue')
const setting = httpVueLoader('/main/setting.vue')
const routes = [
    { path: '/', name: '/', component: devops, },
    {
        path: '/home', name: 'home', component: devops,
        children: [
            {
                path: 'miner', name: 'miner', component: devops,
            },
        ]
    },
    { path: '/:index', name: 'device', component: devopsdt },
    { path: '/user/setting', name: 'setting', component: setting },
]
const router = new VueRouter({
    routes: routes,
})
export { router }