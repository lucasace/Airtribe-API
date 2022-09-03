const router = require('express').Router({mergeParams: true});
const { pool } = require('../../db');
const auth = require('../../auth');

router.get('/', auth, async (req, res) => {
    try{
        const client = await pool.connect();
        var sql = `SELECT LEAD_ID, STATUS, ANSWER_ID FROM ENROLLED where course_id = ${req.params.id}`;
        const rows = await client.query(sql);
        let ans_dets, com_dets, com;
        for(var i = 0; i < rows.rows.length; i++){
            sql = `SELECT * FROM ANSWERS WHERE id = $1`;
            ans_dets = await client.query(sql , [rows.rows[i].answer_id]);
            ans_dets = ans_dets.rows[0];
            delete ans_dets['id'];
            delete rows.rows[i]['answer_id'];
            rows.rows[i].name = ans_dets.name;
            rows.rows[i].email = ans_dets.email;
            rows.rows[i].phone = ans_dets.phone;
            rows.rows[i].linkedin = ans_dets.linkedin;
            sql = `SELECT COMMENT_ID FROM COMMENTS_ENROLLED WHERE lead_id = $1 AND course_id = $2`;
            com_dets = await client.query(sql, [rows.rows[i].lead_id, req.params.id]);
            rows.rows[i].comments = [];
            for(var j = 0; j < com_dets.rows.length; j++){
                sql = `SELECT * FROM COMMENTS WHERE id = ${com_dets.rows[j].comment_id}`;
                com = await client.query(sql);
                com = com.rows[0];
                delete com['id'];
                rows.rows[i].comments.push(com.comment);
            }
        }
        client.release();
        res.status(200).send(rows.rows);
    }
    catch(err){
        if(err.code == '23503')
            return res.status(400).send('Course Doesnt Exist');
        res.status(500).send(err);
    }
});

router.put('/:leadid', auth, async (req, res) => {
    try{
        const {status} = req.body;
        if(!status)
            return res.status(400).send('Bad request. Missing parameters.');
        if(parseInt(status) > 2 || status < 0)
            return res.status(400).send('Bad request. Invalid status.');
        const client = await pool.connect();
        let leadid = parseInt(req.params.leadid.split('User')[1]);
        const sql = `UPDATE ENROLLED SET status=$1 WHERE lead_id=${leadid} AND course_id=${req.params.id}`;
        await client.query(sql, [status]);
        client.release();
        res.status(200).send('Lead status updated');
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/:leadid/comments', auth, async (req, res) => {
    try{
        const {comment} = req.body;
        const client = await pool.connect();
        var sql = `INSERT INTO comments(comment) VALUES ($1) RETURNING id`;
        const commentid = await client.query(sql, [comment]);
        let leadid = parseInt(req.params.leadid.split('User')[1]);
        sql = `INSERT INTO COMMENTS_ENROLLED VALUES( ${req.params.id}, ${leadid}, ${commentid.rows[0].id})`;
        await client.query(sql);
        client.release();
        res.status(200).send('Comment added');
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;
