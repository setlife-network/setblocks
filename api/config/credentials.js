require('dotenv').config()

module.exports = {
    // API Access Keys

    AIRTABLE: {
        API_KEY: process.env.AIRTABLE_API_KEY,
        BASE_ID: process.env.AIRTABLE_BASE_ID
    },
    GITHUB: {
        CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
    },
    STRIPE: {
        PUBLIC_KEY_LIVE: process.env.STRIPE_PUBLIC_KEY_LIVE,
        PUBLIC_KEY_TEST: process.env.STRIPE_PUBLIC_KEY_TEST,
        SECRET_KEY_LIVE: process.env.STRIPE_SECRET_KEY_LIVE,
        SECRET_KEY_TEST: process.env.STRIPE_SECRET_KEY_TEST
    }
};
