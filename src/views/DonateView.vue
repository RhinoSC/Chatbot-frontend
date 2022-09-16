<template>
    <v-col>
        <h1>hola</h1>
        <div id="paypal-donate-button-container"></div>
    </v-col>
</template>
  
<script>
import Vue from 'vue'

export default Vue.extend({
    name: 'donate-view',
    data() {
        return {
            loaded: false,

        }
    },
    mounted() {
        let donationScript = document.createElement('script')
        donationScript.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js'
        donationScript.addEventListener('load', this.setDonationScriptLoaded)
        document.head.appendChild(donationScript)
    },
    methods: {
        setDonationScriptLoaded() {
            this.loaded = true

            window.PayPal.Donation.Button({
                env: 'sandbox',
                // hosted_button_id: 'GD652TWFGE6HN',
                hosted_button_id: 'PP42K8WK5PBZ2',
                // business: 'YOUR_EMAIL_OR_PAYERID',
                image: {
                    src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif',
                    title: 'PayPal - The safer, easier way to pay online!',
                    alt: 'Donate with PayPal button'
                },
                onComplete: function (params) {
                    this.addDonation(params)
                    // Your onComplete handler
                },
            }).render('#paypal-donate-button-container');
        },
        addDonation(params) {
            console.log(params)
        }
    }
})
</script>
  