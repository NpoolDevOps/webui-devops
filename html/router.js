const devopsMain = httpVueLoader('main/devops-main.vue')
const routes = [
    {path: '/', component: devopsMain},
]
const router = new VueRouter({
    routes: routes
})
export {router}