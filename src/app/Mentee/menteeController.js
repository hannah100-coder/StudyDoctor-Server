const jwtMiddleware = require("../../../config/jwtMiddleware");
const menteeProvider = require("../../app/Mentee/menteeProvider");
const menteeService = require("../../app/Mentee/menteeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");
