const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Mentor-mentee",
  password: "vkrm123",
  port: 5432
});
db.connect();

const app = express();
const port = 3000;

let staff_name = ""

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("Login.ejs");
});


app.get("/dashboard", async (req, res) => {
    const result = await db.query('SELECT * FROM staff_information WHERE id = $1', ["1"]);
    staff_name = result.rows[0].name
    const staff_email = result.rows[0].email
    const staff_gender = result.rows[0].gender
    const staff_mobile_no = result.rows[0].mobile_no
    const staff_handling = result.rows[0].handlings
    const staff_handling_senior_names = result.rows[0].handling_senior_names
  res.render("index.ejs",
   {StaffName:staff_name,StaffEmail:staff_email,
    StaffGender:staff_gender,
    StaffMobileNum:staff_mobile_no,
    StaffHandling:staff_handling,
    StaffHandlingSeniorName:staff_handling_senior_names}
);
});

app.get("/student-data", async (req, res) => {
    const staff = await db.query('SELECT * FROM staff_information WHERE id = $1', ["1"]);
    staff_name = staff.rows[0].name
    const result = await db.query('SELECT * FROM mentor_student_information');
    const student1 = result.rows[0]
    const student2 = result.rows[1]
    const student3 = result.rows[2]
    res.render("student-data.ejs",{StaffName:staff_name,student_1:student1,student_2:student2,student_3:student3});
});

app.get("/edit-staff-data", async (req, res) => {
    const staff = await db.query('SELECT * FROM staff_information WHERE id = $1', ["1"]);
    staff_name = staff.rows[0].name
    res.render("edit.ejs", {StaffName:staff_name});
});

app.get("/edit-student", async (req, res) => {
    const staff = await db.query('SELECT * FROM staff_information WHERE id = $1', ["1"]);
    staff_name = staff.rows[0].name
    res.render("edit-student-data.ejs", {StaffName:staff_name});
});
app.get("/edit-student/Edit", async (req, res) => {
    const staff = await db.query('SELECT * FROM staff_information WHERE id = $1', ["1"]);
    staff_name = staff.rows[0].name
    res.render("edit-particular-student.ejs", {StaffName:staff_name});
});

app.get("/student-stats", async (req, res) => {
    const staff = await db.query('SELECT * FROM staff_information WHERE id = $1', ["1"]);
    staff_name = staff.rows[0].name
    res.render("student_stats.ejs", {StaffName:staff_name});
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  