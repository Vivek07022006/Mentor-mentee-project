const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("Login.ejs");
});


app.get("/dashboard", async (req, res) => {
  res.render("index.ejs",
   {StaffName:"Dr.K.Sundaravel Rani",StaffEmail:"sundaravelrani.k.it@sathyabama.ac.in",
    StaffGender:"Female",
    StaffMobileNum:"+91 846843244",
    StaffHandling:"Iyr IT-A1",
    StaffHandlingSeniorName:"Arun Balaji, Arun Balaji, Arun Balaji"}
);
});

app.get("/student-data", async (req, res) => {
    res.render("student-data.ejs",{StaffName:"Dr.K.Sundaravel Rani"});
});

app.get("/edit-staff-data", async (req, res) => {
    res.render("edit.ejs", {StaffName:"Dr.K.Sundaravel Rani"});
});

app.get("/edit-student", async (req, res) => {
    res.render("edit-student-data.ejs", {StaffName:"Dr.K.Sundaravel Rani"});
});
app.get("/edit-student/Edit", async (req, res) => {
    res.render("edit-particular-student.ejs", {StaffName:"Dr.K.Sundaravel Rani"});
});

app.get("/documents", async (req, res) => {
    res.send("Documents")
});





app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  