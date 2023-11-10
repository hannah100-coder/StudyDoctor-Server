

// 멘토 or 멘티 체크
async function selectMentorOrMentee(connection, userIndex) {
    const selectMentorOrMenteeQuery = `
        SELECT mentorOrMentee
        FROM User
        WHERE userIndex = ?;
    `
    const mentorOrMentee = await connection.query(selectMentorOrMenteeQuery, userIndex);
    return mentorOrMentee[0];
}

// 멘토인덱스값 가져오기
async function selectMentorIndex(connection, userIndex) {
    const selectMentorIndexQuery = `
    SELECT mentorIndex
    FROM Mentor
    WHERE userIndex = ?;   
    `
    const mentorIndex = await connection.query(selectMentorIndexQuery, userIndex);
    return mentorIndex[0];
}

// 멘티인덱스값 가져오기
async function selectMenteeIndex(connection, userIndex) {
    const selectMenteeIndexQuery = `
    SELECT menteeIndex
    FROM Mentee
    WHERE userIndex = ?;   
    `
    const menteeIndex = await connection.query(selectMenteeIndexQuery, userIndex);
    return menteeIndex[0];
}


////////////

// 1. 이메일로 회원 조회 - 네이버로그인
async function getUserInfo(connection, email) {
    const getUserInfoQuery = `
                  SELECT userIndex
                  FROM User 
                  WHERE email = ?;
                  `;
    const emailRows = await connection.query(getUserInfoQuery, email);
    return emailRows[0];
  }
  
  
// 1. 새 유저 등록 - 네이버로그인
async function insertUserInfo(connection, insertUserInfoParams) {
    const insertUserInfoQuery = `
          INSERT INTO User(userName, email)
          VALUES (?, ?);
      `;
    const insertUserInfoRow = await connection.query(
      insertUserInfoQuery,
      insertUserInfoParams
    );
  
    return insertUserInfoRow;
  }

// 1. 발급한 jwt 저장 - 카카오로그인
async function updateUserToken(connection, updateUserTokenParams) {
    const updateUserTokenQuery = `
        UPDATE User
        SET token = ?
        WHERE userIndex = ?;
    `;
    const updateUserTokenRows = await connection.query(updateUserTokenQuery, updateUserTokenParams);
    return updateUserTokenRows;
}

// jwtMiddleware - 올바른 접근 확인
async function selectUserToken(connection, userIdx) {
    const selectUserTokenQuery = `
                  SELECT token
                  FROM User 
                  WHERE userIndex = ?;
                  `;
    const selectUserTokenRows = await connection.query(selectUserTokenQuery, userIndex);
    return selectUserTokenRows[0].token;
    //return selectUserTokenRows;
  }

//0. userIdx 값 체크
async function selectUserIdx(connection, userIdx) {
    const selectUserIdxQuery = `
        SELECT userIdx
        FROM User 
        WHERE userIdx = ?;
    `;
    const [selectUserIdxRows] = await connection.query(selectUserIdxQuery, userIdx);
    return selectUserIdxRows[0];
}

// 2. 로그아웃, 3. 회원탈퇴 - 토큰 삭제
async function eraseUserToken(connection, userIdx) {
    const eraseUserTokenQuery = `
        UPDATE User
        SET token = NULL
        WHERE userIdx = ?;
    `;
    const eraseUserTokenRows = await connection.query(eraseUserTokenQuery, userIdx);
    return eraseUserTokenRows;
  }

module.exports = {
    selectMentorOrMentee,
    selectMentorIndex,
    selectMenteeIndex
};

