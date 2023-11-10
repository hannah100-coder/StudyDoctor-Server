const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
const path = require("path")
var cors = require('cors');
module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(cors());

    app.use(express.static(path.join(process.cwd(), "src")));

    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../src/app/User/userRoute')(app);
    require('../src/app/Mentor/mentorRoute')(app);
    require('../src/app/Mentee/menteeRoute')(app);
    require('../src/app/Profile/profileRoute')(app);
    require('../src/app/Like/likeRoute')(app);


    return app;
};