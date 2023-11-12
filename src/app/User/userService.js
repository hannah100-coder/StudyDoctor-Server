const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");

// user 뿐만 아니라 다른 도메인의 Provider와 Dao도 아래처럼 require하여 사용할 수 있습니다.
const userProvider = require("./userProvider");
const userDao = require("./userDao");

const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const axios = require("axios")

// Service: Create, Update, Delete 비즈니스 로직 처리

// 카카오 로그인
exports.signInKakao = async function (kakaoToken) {
  const connection = await pool.getConnection(async (conn) => conn);

  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        },
    });


    const {data} = result
    const name = data.properties.nickname;
    //const email = data.kakao_account.email;
    const kakaoId = data.id;
    //const profileImage = data.properties.profile_image;

    if (!name || !kakaoId) throw new error("KEY_ERROR", 400);

    const user = await userDao.getUserIndexByKakaoId(connection, kakaoId);

    if (user.length == 0) {
        await userDao.signUp(connection, [name, kakaoId]);
        console.log('A new user signed up.')
    }

    //return jwt.sign({ userIndex: user.userIndex }, process.env.TOKKENSECRET);
    const jwtToken = jwt.sign( {userIndex: user.userIndex }, secret_config.jwtsecret)
    return jwtToken;
    
}





// 2. 로그아웃 API - 미완성
exports.logoutUser = async function(userIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    try{
        //transaction
        await connection.beginTransaction();

        // Token 삭제 - User 테이블의 token 값을 null로 초기화해줌
        await userDao.eraseUserToken(connection, userIndex);

        await connection.commit();
        return response(baseResponse.SUCCESS);
    }
    catch(err){
        await connection.rollback();
        logger.error(`App - logoutUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
    finally{
        connection.release();
    }
}