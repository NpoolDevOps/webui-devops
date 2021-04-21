import { router } from './router.js'

const i18n = new VueI18n({
    locale: 'zh',
    messages: {
        'zh': zh,
        'en': en,
    }
})

new Vue({
    el: "#app",
    i18n,
    router,
    components: {
        'app': httpVueLoader('app.vue')
    }
})