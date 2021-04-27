const devops = httpVueLoader('./main/devops.vue')
const devopsdt = httpVueLoader('./main/devopsdt.vue')
const routes = [
    { path: '/web/ui/', component: devops },
    { path: 'web/ui/:index', component: devopsdt }
]
const router = new VueRouter({
    routes: routes,
    mode: 'history'
})
export { router }