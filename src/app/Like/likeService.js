const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");

const likeProvider = require("./likeProvider");
const likeDao = require("./likeDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

//만약 삭제가 아니라 patch라면 데이터 베이스에 이미 있는지 확인하는 과정 필요
//만약 토큰에 멘토, 멘티 정보를 저장하지 못한다면, userIndex로 멘토

//멘토 Like 멘티 API
/*exports.insertMentorLike = async function(insertMentorLikeParams){
    const connection = await pool
}*/


//멘티 Like 멘토 API
