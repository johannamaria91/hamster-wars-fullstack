const admin = require("firebase-admin");
let privatekey;

if (process.env.HAMSTER_WARS_2_KEY) {
    privatekey = JSON.parse(process.env.HAMSTER_WARS_2_KEY)
} else {
    privatekey = require("./secrets/hamster-wars-2-key.json");
}


function connect() {
    admin.initializeApp({
        credential: admin.credential.cert(privatekey)
    });
    const db = admin.firestore()
    return db
}

module.exports = { connect }