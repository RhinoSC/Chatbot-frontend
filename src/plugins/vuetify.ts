import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        options: { customProperties: true },
        themes: {

            dark: {
                // primary: '#b39ddb', // mine
                // secondary: '#9fa8da', // mine
                // accent: '#6f79a8', 

                primary: '#BB86FC', // mdi
                secondary: '#03DAC5', // mdi
                accent: '#3700B3',
                error: '#CF6679',

                // error: '#f44336',
                // warning: '#ff5722',
                // info: '#ffc107',
                // success: '#009688'
            },
            light: {
                primary: '#6200EE',
                secondary: '#018786',
                accent: '#3700B3',
                error: '#B00020',

                // primary: '#607d8b',
                // secondary: '#3f51b5',
                // accent: '#03a9f4',
                // error: '#f44336',
                // warning: '#ff5722',
                // info: '#ffc107',
                // success: '#009688'
            }
        }
    },
});
