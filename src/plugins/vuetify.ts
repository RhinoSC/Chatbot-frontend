import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#607d8b',
                secondary: '#3f51b5',
                accent: '#03a9f4',
                error: '#f44336',
                warning: '#ff5722',
                info: '#ffc107',
                success: '#009688'
            }
        }
    },
});
