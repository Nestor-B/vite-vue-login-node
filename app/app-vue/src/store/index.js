import { createStore } from 'vuex'
import Default from './default'

const store = createStore({
    modules: {
        Default
    }
})

export default store