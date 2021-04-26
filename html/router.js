const devops = httpVueLoader('./main/devops.vue')
const devopsdt = httpVueLoader('./main/devopsdt.vue')
const routes = [
    { path: '/', component: devops },
    { path: '/:index', component: devopsdt }
]
const router = new VueRouter({
    routes: routes,
    mode: 'history'
})
export { router }