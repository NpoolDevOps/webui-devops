const devops = httpVueLoader('main/devops.vue')
const devopsdt = httpVueLoader('main/devopsdt.vue')
const routes = [
    { path: '/', name: '/', component: devops },
    { path: '/:index', name: 'device', component: devopsdt },
]
const router = new VueRouter({
    routes: routes,
})
export { router }