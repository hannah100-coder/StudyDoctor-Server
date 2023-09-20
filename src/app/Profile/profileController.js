const jwtMiddleware = require("../../../config/jwtMiddleware");
const profileProvider = require("../../app/Profile/profileProvider");
const profileService = require("../../app/Profile/profileService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");
//dfsdfasdf

