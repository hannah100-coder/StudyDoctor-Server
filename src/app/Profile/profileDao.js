
//멘토 프로필 입력 API
/*async function inputMentorProfile(connection) {
    const inputMentorProfileQuery = `
    INSERT INTO Mentor
    `
}*/

//멘토 프로필 조회 API
async function selectMentorSelfProfile(connection, userIndex){
    const selectMentorSelfProfileQuery = `
    //앞에 userIndex랑 뒤에 status, createdAt, updatedAt을 가져와도 되는지?, status가 active인 것만 가져와야하는지?
    SELECT * FROM Mentor Where userIndex = ?;
    `;

    const [mentorSelfProfileRow] = await connection.query(selectMentorSelfProfileQuery, userIndex);
    return mentorSelfProfileRow;
}


//멘티 프로필 조회 API
async function selectMenteeSelfProfile(connection, userIndex){
    const selectMenteeSelfProfileQuery = `
    //앞에 userIndex랑 뒤에 status, createdAt, updatedAt을 가져와도 되는지?, status가 active인 것만 가져와야하는지?
    SELECT * FROM Mentee Where userIndex = ?;
    `;

    const [menteeSelfProfileRow] = await connection.query(selectMenteeSelfProfileQuery, userIndex);
    return menteeSelfProfileRow;
}


module.exports = {

};