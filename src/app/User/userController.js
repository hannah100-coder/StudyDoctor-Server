const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const {logger} = require("../../../config/winston");
const requestIp = require('request-ip');

const regexEmail = require("regex-email");



// 카카오로그인
exports.signInKakao = async function(req, res) {

    const headers = req.headers["authorization"];
    const accessToken = headers.split(" ")[1];
    //const accessToken = req.body.accessToken;

    const jwtToken = await userService.signInKakao(accessToken);
    
    return res.status(200).json({ jwtToken: jwtToken });
}






/**
 * API NO. 2
 * API Name : 로그아웃 API - 미완성
 * [GET] /app/user/logout
 */
 exports.logoutUser = async function (req, res){
    const userIdx = req.verifiedToken.userIdx;
    logger.info(`App - client IP: ${requestIp.getClientIp(req)}, userIdx: ${userIdx}, Accessing logout API \n`);

    if(!userIdx)
        return res.send(errResponse(baseResponse.VERIFIEDTOKEN_USERIDX_EMPTY));

    const userIdxCheckRows = await userProvider.userIdxCheck(userIdx);
    if(userIdxCheckRows.length < 1) //존재하지 않는 유저
        return res.send(errResponse(baseResponse.USER_USERIDX_NOT_EXIST));

    const logoutUserRow = await userService.logoutUser(userIdx);
    
    logger.info(`App - client IP: ${requestIp.getClientIp(req)}, userIdx: ${userIdx}, Get logout API \n`);
    return res.send(response(baseResponse.LOGOUT_SUCCESS));
};

