const router = require('express').Router();
const { pool } = require('../../db');
const auth = require('../../auth');
const leads = require('./leads');

router.get('/', async (req, res) => {
    try{
        const client = await pool.connect();
        var sql = 'SELECT * FROM courses';
        const rows = await client.query(sql);
        let ins_dets;
        for(var i = 0; i < rows.rows.length; i++){
            sql = 'SELECT * FROM INSTRUCTORS WHERE id = $1';
            ins_dets = await client.query(sql, [rows.rows[i].instructor_id]);
            ins_dets = ins_dets.rows[0];
            delete ins_dets['id'];
            delete rows.rows[i]['instructor_id'];
            rows.rows[i].instructor = ins_dets;
        }
        client.release();
        res.status(200).send(rows.rows);
    }
    catch(err){
        res.status(500).send(err);
    }
});

router.post('/', auth, async (req, res) => {
    try{
        let {id, name, description, status, start_date, duration, hrs_per_day, price, max_seats} = req.body;
        if(!id || !name || !description || !status || !duration || !hrs_per_day || !price || !max_seats)
            return res.status(400).send('Bad request. Missing parameters.');
        if(parseInt(status) > 2 || status < 0)
            return res.status(400).send('Bad request. Invalid status.');
        if(parseInt(status) !=0 && !start_date)
            return res.status(400).send('Bad request. Missing start date.');
        const client = await pool.connect();
        var sql;
        sql = 'INSERT INTO courses(name, description, status, start_date, duration, hrs_day, price, max_seats, instructor_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
        if(!start_date)
            start_date = null;
        await client.query(sql , [name, description, status, start_date, duration, hrs_per_day, price, max_seats, id]);
        client.release();
        res.status(200).send('Course created');
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.put('/:id', auth, async (req, res) => {
    try{
        let {id, name, description, status, start_date, duration, hrs_per_day, price, max_seats} = req.body;
        if(!id || !name || !description || !status || !duration || !hrs_per_day || !price || !max_seats)
            return res.status(400).send('Bad request. Missing parameters.');
        if(parseInt(status) > 2 || status < 0)
            return res.status(400).send('Bad request. Invalid status.');
        if(parseInt(status) !=0 && !start_date)
            return res.status(400).send('Bad request. Missing start date.');
        const client = await pool.connect();
        var sql = 'UPDATE courses SET name=$1, description=$2, status=$3, start_date=$4, duration=$5, hrs_day=$6, price=$7, max_seats=$8, instructor_id=$9 WHERE id=$10';
        if(!start_date)
            start_date = null;
        await client.query(sql, [name, description, status, start_date, duration, hrs_per_day, price, max_seats, id, req.params.id]);
        client.release();
        res.status(200).send('Course updated');
    }
    catch(err){
        res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const client = await pool.connect();
        var sql = `SELECT * FROM courses WHERE id=${req.params.id}`;
        const rows = await client.query(sql);
        if(rows.rows.length == 0)
            return res.status(404).send('Course not found');
        sql = 'SELECT * FROM INSTRUCTORS WHERE id = $1';
        ins_dets = await client.query(sql, [rows.rows[0].instructor_id]);
        ins_dets = ins_dets.rows[0];
        delete ins_dets['id'];
        delete rows.rows[0]['instructor_id'];
        rows.rows[0].instructor = ins_dets;
        client.release();
        res.status(200).send(rows.rows[0]);
    }
    catch(err){
        res.status(500).send(err);
    }
});

router.post('/:id', auth, async (req, res) => {
    try{
        const {id, name, email, phone, linkedin} = req.body;
        if(!id || !name || !email || !phone || !linkedin)
            return res.status(400).send('Bad request. Missing parameters.');
        const client = await pool.connect();
        var sql = 'INSERT INTO ANSWERS(name, email, phone, linkedin) VALUES ($1, $2, $3, $4) RETURNING id';
        const answerid = await client.query(sql , [name, email, phone, linkedin]);
        sql = `INSERT INTO enrolled VALUES ($1, $2, -1, $3)`;
        await client.query(sql, [req.params.id, id, answerid.rows[0].id]);
        client.release();
        res.status(200).send('Enrolled Successfully!!');
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.use('/:id/leads', leads);

module.exports = router;