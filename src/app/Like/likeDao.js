

//멘토 Like 멘티 API
async function insertMentorLike(connection, insertMentorLikeParams){
    const insertMentorLikeQuery = `
        INSERT INTO MentorLike VALUES (null, ?, ?, null, null, null, ?);
    `;

    const insertMentorLikeRow = await connection.query(insertMentorLikeQuery, insertMentorLikeParams);
    return insertMentorLikeRow;
}


//멘티 Like 멘토 API
async function insertMenteeLike(connection, insertMenteeLikeParams){
    const insertMenteeLikeQuery = `
        INSERT INTO MenteeLike VALUES (null, ?, ?, null, null, null, ?);
    `;

    const insertMenteeLikeRow = await connection.query(insertMenteeLikeQuery, insertMenteeLikeParams);
    return insertMenteeLikeRow;
}


module.exports = {
    insertMentorLike,
    insertMenteeLike
};