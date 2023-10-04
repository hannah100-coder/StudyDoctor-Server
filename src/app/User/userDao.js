

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


module.exports = {
    selectMentorOrMentee,
    selectMentorIndex,
    selectMenteeIndex
};

