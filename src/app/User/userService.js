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

// 블로그 참고 - 카카오 로그인
exports.signInKakao = async function (kakaoToken) {
  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
            Authorization: `Bearer ${kakaoToken}`,
        },
    });
    const {data} = result
    const name = data.properties.nickname;
    const email = data.kakao_account.email;
    //const kakaoId = data.id;
    //const profileImage = data.properties.profile_image;

    if (!name || !email) throw new error("KEY_ERROR", 400);

    const user = await userDao.getUserIndexByEmail(email);

    if (!user) {
        await userDao.signUp(name, email);
    }

    //return jwt.sign({ userIndex: user.userIndex }, process.env.TOKKENSECRET);
    const jwtToken = jwt.sign( {userIndex: user.userIndex }, secret_config.jwtsecret)
    console.log('jwtToken: ', jwtToken);
    return jwtToken;
    
}





// 1-1. 회원가입
exports.signUpToken = async function (signUpUserIndex) {
    try {
        //토큰 생성 Service - try~catch 작성
        let token = await jwt.sign(
            {
              userIdx: signUpUserIndex,
            }, // 토큰의 내용(payload)
                secret_config.jwtsecret, // 비밀키
            {
              expiresIn: "365d",
              subject: "User",
            } // 유효 기간 365일
          );
        console.log({ 'userIdx': signUpUserIndex, 'jwt': token });
        //로그인 시 발급되는 jwt를 DB에 저장
        const connection = await pool.getConnection(async (conn) => conn);
        const userToken = await userDao.updateUserToken(connection, [token, signUpUserIndex]);
        connection.release();
        return response(baseResponse.SUCCESS, {"jwt" :token});

    } catch (err) {
        logger.error(`App - signupToken Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 1-2. 로그인
exports.loginToken = async function (loginUserIndex) {
    try {
        //토큰 생성 Service - try~catch 작성
        let token = await jwt.sign(
            {
              userIdx: loginUserIndex,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
              expiresIn: "365d",
              subject: "User",
            } // 유효 기간 365일
          );
        console.log({ 'userIdx': loginUserIndex, 'jwt': token });
          //로그인 시 발급되는 jwt를 DB에 저장
        const connection = await pool.getConnection(async (conn) => conn);
        const userToken = await userDao.updateUserToken(connection, [token, loginUserIndex]);
        connection.release();
        return response(baseResponse.SUCCESS, {"jwt" :token});

    } catch (err) {
        logger.error(`App - loginToken Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

// 2. 로그아웃 API
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