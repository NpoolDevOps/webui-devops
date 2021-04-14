const devops = httpVueLoader('main/devops.vue')
const routes = [
    {path: '/', component: devops},
]
const router = new VueRouter({
    routes: routes
})
export { router }