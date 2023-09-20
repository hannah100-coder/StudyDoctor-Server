const jwtMiddleware = require("../../../config/jwtMiddleware");
const likeProvider = require("../../app/Like/likeProvider");
const likeService = require("../../app/Like/likeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");
