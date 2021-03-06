module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "returnCitySN": true,
        "Txplayer": true,
        "Vue": true,
        "axios": true,
        "moment": true,
        "antDesignVue": true,
        "$": true
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "parser": "babel-eslint"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        "no-unused-vars": [1, {"vars": "all", "args": "after-used"}],
    }
};