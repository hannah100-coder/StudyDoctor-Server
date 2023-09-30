const jwtMiddleware = require("../../../config/jwtMiddleware");
const likeProvider = require("../../app/Like/likeProvider");
const likeService = require("../../app/Like/likeService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");

//provider로 요청자가 멘토인지, 멘토인지, 받는 사람이 멘토인지 멘티인지 체크(token으로 할 수 있는가?)
//멘토->멘토, 멘티->멘티인 경우 확인해야 할까?
//확인 후 MentorLike나 MenteeLike에 이미 있는지 확인
