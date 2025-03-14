import { Long, MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import { nanoid, customAlphabet } from "nanoid";
import cors from "cors";
import { exectemail, genotp } from "./email/config.mjs";
import multer from "multer";
import path from "path";
import fs, { existsSync } from "fs";
import { fileURLToPath } from "url";
import createZoomMeeting from "./apis/zoom/zoom_meeting.mjs"
import generateMCQs from "./question_bank/generate_questions.mjs";
import {sendzoomconf,sendzoomconftostud} from "./email/send_zoom_confirmation.mjs"
import sendleavestat from "./email/Send_Leave_Status.mjs";
import { hostname } from "os";

const app = express();
const port = 5472;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());
class mongocon {
  uri = "mongodb://localhost:27017";
  dbname = "CMS";

  constructor() {
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        deprecationErrors: true,
      },
      serverSelectionTimeoutMS: 5000,
    });
  }
}
let uid = 0;

const genid = () => {
  const generateRandomDigits = customAlphabet("123456789", 4);
  const id = generateRandomDigits();
  uid = parseInt(id);
};

const run = async () => {
  const connection = new mongocon();
  try {
    await connection.client.connect();

    if (await connection.client.db("admin").command({ ping: 1 })) {
      return true;
    } else {
      return false;
    }
  } finally {
    await connection.client.close();
  }
};
const selectall = async (collections) => {
  const db = new mongocon();

  if (run()) {
    try {
      await db.client.connect();

      const database = db.client.db(db.dbname);
      const collection = database.collection(collections);

      if (collection) {
        const documents = await collection.find({}).toArray();
        if (documents) {
          return documents;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      await db.client.close();
    }
  } else {
    console.log("Error connecting to  Database");
  }
};

const select = async (collectionname, field, value) => {
  const db = new mongocon();

  if (run()) {
    try {
      const database = db.client.db(db.dbname);
      const collection = database.collection(collectionname);
      const query = { [field]: value };
      console.log(query);
      const documents = await collection.find(query).toArray();

      console.log("Documents found:", documents);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      await db.client.close();
    }
  } else {
    console.log("Error connecting to  Database");
  }
};

app.post("/services/updaterec", async (req, res) => {
  const [filterf, filval, field, value] = req.body;

  const db = new mongocon();

  if (run()) {
    try {
      const database = db.client.db(db.dbname);
      const collection = database.collection(collectionname);
      const filter = { [filterf]: filval };
      const updateDoc = {
        $set: { [field]: value },
      };

      const documents = await collection.updateMany(filter, updateDoc);
      if (
        documents.acknowledged &&
        documents.modifiedCount > 0 &&
        documents.matchedCount > 1
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      await db.client.close();
    }
  } else {
    console.log("Error connecting to  Database");
  }
});

app.post("/services/insert", async (req, res) => {
  const { colname, addr, collename } = req.body;

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection(collename);
    genid();
    const result = await collection.insertOne({
      _id: uid,
      college_name: colname,
      address: addr,
    });
    if (result.acknowledged == true && result.insertedId == uid) {
      res.status(200).send({ college_id: result.insertedId });
    } else {
      res.status(500).send("Error with college creation");
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
  } finally {
    await db.client.close();
  }
});

app.post("/services/insertstaff", async (req, res) => {
  const { staffname, Class, section, subject, email, phone, college } =
    req.body;

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Staff_Master");
    genid();
    const result = await collection.insertOne({
      _id: uid,
      Staff_name: staffname,
      Assigned_Class: Class,
      Section: section,
      Subject: subject,
      Staff_Email: email,
      Mob: phone,
      College_id: college,
    });
    if (result.acknowledged == true && result.insertedId == uid) {
      res.status(200).send({ college_id: result.insertedId });
    } else {
      res.status(500).send("Error with college creation");
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
  } finally {
    await db.client.close();
  }
});
app.post("/services/insertstudent", async (req, res) => {
  const { name, Class, section, d_o_b, Email, phone, college } = req.body;

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Student_Master");
    genid();
    const result = await collection.insertOne({
      _id: parseInt(uid),
      Student_Name: name,
      Class: Class,
      Section: section,
      DOB: d_o_b,
      Email: Email,
      Mobile: phone,
      College_id: college,
    });
    if (result.acknowledged == true && result.insertedId == uid) {
      res.status(200).send({ college_id: result.insertedId });
    } else {
      res.status(500).send("Error with college creation");
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
  } finally {
    await db.client.close();
  }
});

app.post("/services/insertstudentimport", async (req, res) => {
  const { name, Class, section, d_o_b, Email, phone, college } = req.body;

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Student_Master");
    genid();
    const result = await collection.insertOne({
      _id: parseInt(uid),
      Student_Name: name,
      Class: Class,
      Section: section,
      DOB: d_o_b,
      Email: Email,
      Mobile: phone,
      College_id: college,
    });
    if (result.acknowledged == true && result.insertedId == uid) {
      res.status(200).send({ college_id: result.insertedId });
    } else {
      res.status(500).send("Error with college creation");
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
  } finally {
    await db.client.close();
  }
});

app.post("/services/insertattendance", async (req, res) => {
  const { logs } = req.body;

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const attendance = database.collection("Attendance_Master");
    const student = database.collection("Student_Master");
    const stusearch = student.findOne(student[logs.Student_id]);
    if (stusearch) {
      const result = await attendance.insertOne(logs);
      if (result.acknowledged == true) {
        res.status(200).send({ Message: "Record Inserted" });
      } else {
        res.status(500).send("Record Not inserted");
      }
    } else {
      res.status(200).send("Student Not Found");
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
  } finally {
    await db.client.close();
  }
});
app.post("/services/deleteattendance", async (req, res) => {
  const { sid, date, Sub } = req.body;

  const db = new mongocon();
  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const attendance = database.collection("Attendance_Master");

    const foundRecord = await attendance.findOne({
      Student_id: sid,
      Date: date,
      Subject: Sub,
    });

    if (!foundRecord) {
      console.log("No matching record found in MongoDB");
      return res.status(404).send({ Message: "Record Not Found" });
    } else {
    }
    const stusearch = await attendance.deleteOne({
      Student_id: sid,
      Date: date,
      Subject: Sub,
    });

    if (stusearch.deletedCount === 1) {
      res.status(200).send({ Message: "Record Deleted" });
    } else {
      res.status(404).send({ Message: "Record Not Found" });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send({ Message: "Error deleting record", error });
  } finally {
    await db.client.close();
  }
});

app.post("/services/getattendance", async (req, res) => {
  const { subject, month, year } = req.body;
  const db = new mongocon();
  let regexPattern = new RegExp(`/${month}/${year}`);
  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const attendance = await database
      .collection("Attendance_Master")
      .find({
        Subject: subject,
        Date: { $regex: regexPattern },
      })
      .toArray();

    res.json({ logs: attendance });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).send("Error fetching attendance");
  }
});

app.post("/services/regadmin", async (req, res) => {
  const { Sname, Password, Email, Mobile, college_id, collecname } = req.body;

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection(collecname);
    genid();
    const result = await collection.insertOne({
      _id: uid,
      College_id: college_id,
      Staff_name: Sname,
      Pass_word: Password,
      E_mail: Email,
      Mob: Mobile,
    });
    if (result.acknowledged == true && result.insertedId == uid) {
      res.status(200).send({ Message: "Admin Registered Successfully" });
    } else {
      res.status(500).send("Error with college creation");
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
  } finally {
    await db.client.close();
  }
});

app.post("/services/addstudentimport", async (req, res) => {
  const { studentdata, collecname } = req.body;

  if (!studentdata || !Array.isArray(studentdata) || studentdata.length === 0) {
    return res.status(400).json({ message: "Invalid student data provided." });
  }

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection(collecname);

    const errors = [];
    const insertedStudents = [];

    for (const student of studentdata) {
      const { Student_Name, Class, Section, Email, _id } = student;

      
      const existingStudent = await collection.findOne({
        $or: [
          { Student_Name, Class, Section },
          { Email }
        ],
      });

      if (existingStudent) {
        if (existingStudent._id === _id) {

          genid();
          
          student._id = uid;
          insertedStudents.push(student);
        } else {
          errors.push({
            message: `Student with name '${Student_Name}', class '${Class}', section '${Section}', email '${Email}', or _id '${_id}' already exists.`,
            student,
          });
        }
      } else {
        insertedStudents.push(student);
      }
    }

    if (errors.length > 0) {
      return res.status(409).json({ message: "Some students already exist.", errors });
    }

    if (insertedStudents.length > 0) {
      const result = await collection.insertMany(insertedStudents);

      if (result.acknowledged && result.insertedCount === insertedStudents.length) {
        res.status(201).json({ message: "Students added successfully." });
      } else {
        res.status(500).json({ message: "Failed to add students." });
      }
    } else {
      res.status(200).json({ message: "No new students to add." });
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    if (db.client) {
      await db.client.close();
    }
  }
});
app.post("/services/addstaffimport", async (req, res) => {
  const { studentdata, collecname } = req.body;

  if (!studentdata || !Array.isArray(studentdata) || studentdata.length === 0) {
    return res.status(400).json({ message: "Invalid student data provided." });
  }

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection(collecname);

    const errors = [];
    const insertedStudents = [];

    for (const student of studentdata) {
      const { Staff_name, Assigned_Class, Section, Staff_Email, _id,Subject } = student;

      
      const existingStudent = await collection.findOne({
        $or: [
          { Staff_name, Assigned_Class, Section,Subject },
          { Staff_Email }
        ],
      });

      if (existingStudent) {
        if (existingStudent.Staff_Email === Staff_Email || existingStudent.Subject === Subject) {

          errors.push({
            message: `Staff with Email '${Staff_Email}' or '${Subject}' already exists.`,
            student,
          });

          
        } else {
          genid();
          
          student._id = uid;
          insertedStudents.push(student);
        }
      } else {
        insertedStudents.push(student);
      }
    }

    if (errors.length > 0) {
      return res.status(409).json({ message: "Some Staff already exist.", errors });
    }

    if (insertedStudents.length > 0) {
      const result = await collection.insertMany(insertedStudents);

      if (result.acknowledged && result.insertedCount === insertedStudents.length) {
        res.status(201).json({ message: "Staff added successfully." });
      } else {
        res.status(500).json({ message: "Failed to add Staff." });
      }
    } else {
      res.status(200).json({ message: "No new Staff to add." });
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
    res.status(500).json({ message: "Internal server error." });
  } finally {
    if (db.client) {
      await db.client.close();
    }
  }
});

app.post("/services/addstaff", async (req, res) => {
  const { staffdata, collecname } = req.body;
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection(collecname);

    // Filter staff data to remove records with existing emails
    const nonExistingStaff = [];
    for (const staff of staffdata) {
      const existingStaff = await collection.findOne({ email: staff.email });
      if (!existingStaff) {
        nonExistingStaff.push(staff);
      }
    }

    if (nonExistingStaff.length > 0) {
      const result = await collection.insertMany(nonExistingStaff, {
        ordered: false,
      });

      if (result.acknowledged === true && result.insertedCount > 0) {
        res
          .status(200)
          .json({ Message: "Successful", InsertedCount: result.insertedCount });
      } else {
        res.status(400).json({ Message: "Error" });
      }
    } else {
      res
        .status(400)
        .json({ Message: "No new staff to add. All emails already exist." });
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
    res.status(500).json({ Message: "Server Error", Error: error.message });
  } finally {
    await db.client.close();
  }
});

app.post("/services/sendmail", async (req, res) => {
  const { Sendto, sendtoname } = req.body;

  try {
    await exectemail(Sendto, sendtoname);
    res.status(200).send({ Message: "Email Sent" });
  } catch (error) {
    console.error("Error sending Email:", error);
    res.status(500).send({ Message: "Error sending email" });
  }
});

app.post("/services/retrievestaffs", async (req, res) => {
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Staff_Master");

    const staff = await collection
      .find(
        {},
        {
          projection: {
            id: 1,
            Staff_name: 1,
            Assigned_Class: 1,
            Section: 1,
            Subject: 1,
            Staff_Email: 1,
            Mob :1
          },
        }
      )
      .toArray();

    if (staff.length > 0) {
      res.status(200).json(staff);
    } else {
      res.status(200).json({ Message: "No staff found" });
    }
  } catch (error) {
    console.error("Error retrieving documents:", error);
    res.status(500).json({ Message: "Error retrieving documents", error });
  } finally {
    await db.client.close();
  }
});
app.post("/services/retrievestaffforcal", async (req, res) => {
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Staff_Master");

    const staff = await collection
      .find(
        {},
        {
          projection: {
            id: 1,
            Staff_name: 1
          },
        }
      )
      .toArray();

    if (staff.length > 0) {
      res.status(200).json(staff);
    } else {
      res.status(200).json({ Message: "No staff found" });
    }
  } catch (error) {
    console.error("Error retrieving documents:", error);
    res.status(500).json({ Message: "Error retrieving documents", error });
  } finally {
    await db.client.close();
  }
});
app.post("/services/retrievestudents", async (req, res) => {
  const {staffid} = req.body
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const staffcol = database.collection("Staff_Master");
    const getstaff = await staffcol.findOne({_id : staffid})
    const collection = database.collection("Student_Master");
console.log(getstaff["Assigned_Class"])
    const staff = await collection
      .find({Class : getstaff["Assigned_Class"],Section : getstaff["Section"]},
        {
          projection: {
            id: 1,
            Student_Name: 1,
            Class: 1,
            Section: 1,
            Subject: 1,
            DOB: 1,
            Email: 1,
            Mobile: 1,
          },
        }
      )
      .toArray();

    if (staff.length > 0) {
      res.status(200).json(staff);
    } else {
      res.status(200).json({ Message: "No staff found" });
    }
  } catch (error) {
    console.error("Error retrieving documents:", error);
    res.status(500).json({ Message: "Error retrieving documents", error });
  } finally {
    await db.client.close();
  }
});
app.post("/services/retrievestudentsadmin", async (req, res) => {
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Student_Master");

    const staff = await collection
      .find({},
        {
          projection: {
            id: 1,
            Student_Name: 1,
            Class: 1,
            Section: 1,
            address : 1,
            Subject: 1,
            DOB: 1,
            Email: 1,
            Mobile: 1,
          },
        }
      )
      .toArray();

    if (staff.length > 0) {
      res.status(200).json(staff);
    } else {
      res.status(200).json({ Message: "No staff found" });
    }
  } catch (error) {
    console.error("Error retrieving documents:", error);
    res.status(500).json({ Message: "Error retrieving documents", error });
  } finally {
    await db.client.close();
  }
});
app.post("/services/retrievestudentsbyid", async (req, res) => {
  const db = new mongocon();

  const { searchwith } = req.body;

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Student_Master");

    const staff = await collection
      .find(
        { _id: searchwith },
        {
          projection: {
            Student_Name: 1,
            Class: 1,
            Section: 1,
            Subject: 1,
            Dob: 1,
            Email: 1,
            Mobile: 1,
          },
        }
      )
      .toArray();

    if (staff.length > 0) {
      res.status(200).json(staff);
    } else {
      res.status(200).json({ Message: "No staff found" });
    }
  } catch (error) {
    console.error("Error retrieving documents:", error);
    res.status(500).json({ Message: "Error retrieving documents", error });
  } finally {
    await db.client.close();
  }
});
app.post("/services/retrievestaffbystudid", async (req, res) => {
  const db = new mongocon();
  const { searchwith } = req.body;

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const studcollection = database.collection("Student_Master");
    const staffcollection = database.collection("Staff_Master");

    const studdetails = await studcollection.findOne({
      _id: parseInt(searchwith),
    });

    if (studdetails) {
      const staffdetails = await staffcollection
        .find({
          Assigned_Class: studdetails.Class,
          Section: studdetails.Section,
        })
        .toArray();

      if (staffdetails.length > 0) {
        res.status(200).json(staffdetails);
      } else {
        res.status(200).json({ Message: "Staff Not Found" });
      }
    } else {
      res.status(200).json({ Message: "No student found" });
    }
  } catch (error) {
    console.error("Error retrieving documents:", error);
    res.status(500).json({ Message: "Error retrieving documents", error });
  } finally {
    await db.client.close();
  }
});

app.post("/services/deletestaff", async (req, res) => {
  const db = new mongocon();

  try {
    const { id } = req.body;

    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Staff_Master");

    const deletedRecord = await collection.findOneAndDelete({ _id: id });

    if (!deletedRecord) {
      return res.status(404).send({ message: "Record not found" });
    }

    res
      .status(200)
      .send({ message: "Record deleted successfully", deletedRecord });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/getcount", async (req, res) => {
  const db = new mongocon();
  const { Month } = req.body;

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection1 = database.collection("Staff_Master");
    const collection2 = database.collection("Student_Master");
    const collection3 = database.collection("Attendance_Master");
    const holidays = database.collection("Holiday_Master");

    const staffCount = await collection1.countDocuments();
    const studentCount = await collection2.countDocuments();
    const subject = await collection1.distinct("Subject");

    const dateRegex = `^\\d{1,2}/${Month}/\\d{4}$`;
    const attendanceCount = await collection3.countDocuments({
      Date: {
        $regex: dateRegex,
        $options: "i",
      },
      present: "Y",
    });

    const holidayCount = await holidays.countDocuments({
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, parseInt(Month)] },
          { $eq: [{ $year: "$date" }, 2024] },
        ],
      },
    });

    let days = new Date(2024, Month, 0).getDate();
    let possibleAttendance = (days - holidayCount) * studentCount;
    let presentCount = (attendanceCount / possibleAttendance) * 100;
    let absentCount = 100 - Math.ceil(presentCount);

    if (
      !staffCount &&
      !studentCount &&
      !subject &&
      !absentCount &&
      !presentCount
    ) {
      return res.status(200).send({ message: "Record not found" });
    } else {
      res.status(200).send({
        Studentcount: studentCount,
        staffcount: staffCount,
        Subjects: subject.length,
        present: Math.ceil(Math.abs(presentCount)),
        absent: Math.ceil(Math.abs(absentCount)),
      });
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});

app.post("/services/getstafdashcount", async (req, res) => {
  const { month, staff_id } = req.body;
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection1 = database.collection("Staff_Master");
    const collection2 = database.collection("Student_Master");
    const collection3 = database.collection("Attendance_Master");
    const holidays = database.collection("Holiday_Master");

    const staffCount = await collection1.findOne({ _id: parseInt(staff_id) });
    console.log(staffCount);

    const studentCount = await collection2.countDocuments({
      Class: staffCount["Assigned_Class"],
      Section: staffCount["Section"],
    });
    //const staffName = await collection1.findOne({ _id: staff_id })

    const dateRegex = `^\\d{1,2}/${month}/\\d{4}$`;

    const attendanceCount = await collection3.countDocuments({
      Subject: staffCount["Subject"],
      Date: {
        $regex: dateRegex,
        $options: "i",
      },
      present: "Y",
    });

    const holidayCount = await holidays.countDocuments({
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, parseInt(month)] },
          { $eq: [{ $year: "$date" }, 2024] },
        ],
      },
    });

    let days = new Date(2024, month, 0).getDate();
    let totalAttendanceOpportunities = (days - holidayCount) * studentCount;
    let presentPercentage = Math.ceil(
      (attendanceCount / totalAttendanceOpportunities) * 100
    );
    let absentPercentage = Math.ceil(
      ((totalAttendanceOpportunities - attendanceCount) /
        totalAttendanceOpportunities) *
        100
    );

    if (!staffCount) {
      return res.status(200).send({ message: "Staff record not found" });
    }
    if (attendanceCount === 0) {
      res.status(200).send({
        absent: 0,
        present: 0,
        students: studentCount,
        staffname: staffCount["Staff_name"],
        Class: staffCount["Assigned_Class"],
      });
    } else {
      res.status(200).send({
        absent: absentPercentage,
        present: presentPercentage,
        students: studentCount,
        staffname: staffCount["Staff_name"],
        Class: staffCount["Assigned_Class"],
      });
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});

app.post("/services/getattesubstud", async (req, res) => {
  const db = new mongocon();
  const { subject } = req.body;
  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection1 = database.collection("Staff_Master");
    const collection2 = database.collection("Student_Master");
    const sub = await collection1.findOne({ Subject: subject });
    if (sub) {
      const stud = await collection2
        .find({ Class: sub["Assigned_Class"], Section: sub["Section"] })
        .toArray();
      if (stud) {
        res.status(200).send({ Students: stud });
      } else {
        res.status(200).send({ Message: "No Student Found" });
      }
    } else {
      res.status(200).send({ Message: "Student Not Found" });
    }
  } catch (error) {
    console.error("Error getting Records:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/getsubjects", async (req, res) => {
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection1 = database.collection("Staff_Master");
    const subject = await collection1.distinct("Subject");

    if (!subject) {
      return res.status(200).send({ message: "Record not found" });
    } else {
      res.status(200).send({ subject });
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/getsubjectsandstaffid", async (req, res) => {
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection1 = database.collection("Staff_Master");

    
    const result = await collection1.aggregate([
      {
        $group: {
          _id: "$Subject", 
          staffDetails: {
            $push: {
              Staff_name: "$Staff_name",
              Staff_Email: "$email",
              _id: "$_id",
            },
          },
        },
      },
      {
        $project: {
          _id: 0, 
          subject: "$_id", 
          staffDetails: 1, 
        },
      },
    ]).toArray();

    if (!result || result.length === 0) {
      return res.status(200).send({ message: "No records found" });
    }

    res.status(200).send({ result });
  } catch (error) {
    console.error("Error fetching subjects and staff details:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});


app.post("/services/getclassarray", async (req, res) => {
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Staff_Master");

    
    const students = await collection.find({}).toArray();

    if (students.length > 0) {
     
      const classSectionSubjectMap = students.reduce((acc, student) => {
        const { Assigned_Class, Section, Subject } = student;

        
        if (!acc[Assigned_Class]) {
          acc[Assigned_Class] = {};
        }

       
        if (!acc[Assigned_Class][Section]) {
          acc[Assigned_Class][Section] = new Set();
        }

        
        if (Subject) {
          acc[Assigned_Class][Section].add(Subject);
        }

        return acc;
      }, {});

      
      const classSectionData = Object.entries(classSectionSubjectMap).map(
        ([Assigned_Class, sections]) => ({
          Class: Assigned_Class,
          Sections: Object.entries(sections).map(([sectionVal, subjects]) => ({
            Section: sectionVal,
            Subjects: Array.from(subjects), 
          })),
        })
      );

      res.status(200).send(classSectionData);
    } else {
      res.status(200).send({ Message: "No Students Found" });
    }
  } catch (error) {
    console.error("Error getting Records:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/getsubjectsbystaffid", async (req, res) => {
  const db = new mongocon();
  const { staff_id } = req.body;

  if (!staff_id) {
    return res.status(400).send({ message: "Staff ID is required" });
  }

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection1 = database.collection("Staff_Master");

    const staffMember = await collection1.findOne({ _id: staff_id });

    if (!staffMember) {
      return res
        .status(404)
        .send({ message: "No record found for the provided staff ID" });
    } else {
      res.status(200).send({ subjects: staffMember.Subject });
    }
  } catch (error) {
    console.error("Error retrieving subjects:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/verifyemail&phone", async (req, res) => {
  const db = new mongocon();
  const { phone, email } = req.body;

  if (!phone || !email) {
    return res.status(400).send({ message: "Staff ID, phone, and email are required" });
  }

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection1 = database.collection("Staff_Master");

    
    const existingStaff = await collection1.findOne({
      $or: [{ phone: phone }, { email: email }],
    });

    if (existingStaff) {
      return res.status(409).send({
        message: "Phone number or email already exists for another staff member",
      });
      
    }
    else{
      return res.status(200).send({
        message: "All Good",
      });

        
    }

    res.status(200).send({ subjects: staffMember.Subject });
  } catch (error) {
    console.error("Error retrieving subjects:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});

app.post("/services/getsubjectsbysid", async (req, res) => {
  const db = new mongocon();
  const { sid } = req.body;

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const staffCollection = database.collection("Staff_Master");
    const studCollection = database.collection("Student_Master");

    const stud = await studCollection.findOne({ _id: sid });

    if (!stud) {
      return res.status(404).send({ message: "Record not found" });
    }

    const subjects = await staffCollection
      .find({ Assigned_Class: stud.Class }, { projection: { Subject: 1 } })
      .toArray();

    if (subjects.length === 0) {
      return res
        .status(200)
        .send({ message: "No subjects found for this class" });
    }

    const subjectList = subjects.map((subject) => subject.Subject);

    res.status(200).send({ subjectList });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/updatestudentdetails", async (req, res) => {
  const db = new mongocon();
  const { sid, updatedData } = req.body;

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const studCollection = database.collection("Student_Master");

    const studentId = parseInt(sid, 10);

    const result = await studCollection.updateOne(
      { _id: studentId },
      { $set: updatedData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Record not found" });
    }

    res.status(200).send({ message: "Student details updated successfully" });

  } catch (error) {
    console.error("Error updating student details:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/getstaffdetails", async (req, res) => {
  const db = new mongocon();
  const { sid } = req.body;

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const studCollection = database.collection("Staff_Master");

    const stud = await studCollection.findOne({ _id: parseInt(sid) },{ projection: { Staff_name: 1,Assigned_Class: 1,Section:1,Staff_Email:1,Mob:1,Subject:1}});

    if (!stud) {
      return res.status(404).send({ message: "Record not found" });
    }

   
    if (stud.length === 0) {
      return res
        .status(200)
        .send({ message: "No subjects found for this class" });
    }
    else{

      res.status(200).send({values : stud})
    }


  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/updatestaffdetails", async (req, res) => {
  const db = new mongocon();
  const { sid, Staff_name, Assigned_Class, Section, Staff_Email, Mob, Subject } = req.body;

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const studCollection = database.collection("Staff_Master");

    const updateResult = await studCollection.updateOne(
      { _id: parseInt(sid) },
      {
        $set: {
          Staff_name: Staff_name,
          Assigned_Class: Assigned_Class,
          Section: Section,
          Staff_Email: Staff_Email,
          Mob: Mob,
          Subject: Subject,
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).send({ message: "Record not found" });
    }

    res.status(200).send({ message: "Record updated successfully" });
  } catch (error) {
    console.error("Error updating staff details:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/getstudentdetails", async (req, res) => {
  const db = new mongocon();
  const { sid } = req.body;

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const studCollection = database.collection("Student_Master");

    const stud = await studCollection.findOne({ _id: sid },{ projection: { Student_Name: 1,Class: 1,Section:1,Email:1,Mobile:1,total_rewards: 1}});

    if (!stud) {
      return res.status(404).send({ message: "Record not found" });
    }

   
    if (stud.length === 0) {
      return res
        .status(200)
        .send({ message: "No subjects found for this class" });
    }
    else{

      res.status(200).send({values : stud})
    }


  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});


const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const daysInMonth = (month, year) => {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28; // Handle February properly
  }
  return new Date(year, month, 0).getDate(); // Get correct days for other months
};

app.post("/services/getstuddashatt", async (req, res) => {
  const db = new mongocon();
  const { sid, month,year } = req.body;
   
  let regexPattern = new RegExp(`/${month}/${year}`);

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const attendance = database.collection("Attendance_Master");
    const studentCollection = database.collection("Student_Master");
    const holidays = database.collection("Holiday_Master");

    const checkstd = await studentCollection.findOne({ _id: sid });
    if (!checkstd) {
      return res.status(404).send({ Message: "Student Not Found" });
    }

    const days = daysInMonth(parseInt(month), year); 
    console.log(days)
    console.log(year)

    const presentCount = await attendance.countDocuments({
      Student_id: sid,
      Date: regexPattern,
    });

    const holidayCount = await holidays.countDocuments({
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, parseInt(month)] },
          { $eq: [{ $year: "$date" }, year] },
        ],
      },
    });

    let totalAttendance = days - holidayCount;
    let absentCount = totalAttendance - presentCount;
    console.log(holidayCount)

    res.status(200).send({
      Total: totalAttendance,
      absent: absentCount,
      present: presentCount,
    });
  } catch (error) {
    console.error("Error getting Records:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});


app.post("/services/getstuddashattforpie", async (req, res) => {
  const db = new mongocon();
  const { sid, month, subject } = req.body;
  let regexPattern = new RegExp(`/${month}/${2024}`);

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const attendance = database.collection("Attendance_Master");
    const studentCollection = database.collection("Student_Master");
    const holidays = database.collection("Holiday_Master");

    const checkstd = await studentCollection.findOne({ _id: sid });
    let days = new Date(2024, month, 0).getDate();

    if (checkstd) {
      const presentCount = await attendance.countDocuments({
        Student_id: sid,
        Subject: subject,
        Date: regexPattern,
      });

      const holidayCount = await holidays.countDocuments({
        $expr: {
          $and: [
            { $eq: [{ $month: "$date" }, parseInt(month)] },
            { $eq: [{ $year: "$date" }, 2024] },
          ],
        },
      });

      let totalAttendance = days - holidayCount;
      let absentCount = totalAttendance - presentCount;

      res.status(200).send({ absent: absentCount, present: presentCount });
    } else {
      res.status(404).send({ Message: "Student Not Found" });
    }
  } catch (error) {
    console.error("Error getting Records:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});

app.post("/services/getdataforpieadmin", async (req, res) => {
  const db = new mongocon();
  const { Month, Subject } = req.body;
  
  let days = new Date(2024, parseInt(Month), 0).getDate();
  let monthPattern = `/${Month}/2024`;
  
  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const attendance = database.collection("Attendance_Master");
    const holidays = database.collection("Holiday_Master");
  
    const presentCount = (await attendance.distinct("Date", {
      Subject: Subject,
      Date: { $regex: monthPattern },
    })).length;
  
    const holidayCount = await holidays.countDocuments({
      date: { $regex: monthPattern },
    });
  
    const totalAttendanceDays = days - holidayCount;
    const absentCount = totalAttendanceDays - presentCount;
  
    res.status(200).send({
      absent: absentCount,
      present: presentCount,
      holidays: holidayCount,
    });
  } catch (error) {
    console.error("Error getting Records:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
  
});  
app.post("/services/deletestudent", async (req, res) => {
  const db = new mongocon();

  try {
    const { id } = req.body;

    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Student_Master"); 

    const deletedRecord = await collection.findOneAndDelete({ _id: id });

    if (!deletedRecord) {
      return res.status(404).send({ message: "Record not found" });
    }

    res
      .status(200)
      .send({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/validatestudlogin", async (req, res) => {
  const { email } = req.body;

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Student_Master");

    const searchusername = await collection.findOne({ Email: email });

    if (!searchusername) {
      return res.status(200).send({ Message: "Student Not Found" });
    } else {
      let otp = genotp(searchusername["Email"], searchusername["Student_Name"])
        .then((result) => {
          res.status(200).send({
            Message: "OTP Sent Successfully",
            OTP: result.otp,
            _id: searchusername["_id"],
            profile_pic: searchusername["isprofilepic"],
            name: searchusername["Student_Name"],
            cid: searchusername["Class"],
            sid : searchusername["Section"],
            collegeid : searchusername["college_id"]
          });
        })
        .catch((error) => {
          res.status(200).send({ Error: error });
        });
    }
  } catch (error) {
    console.error("Error Searching Record:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.post("/services/validatestafflogin", async (req, res) => {
  const { email } = req.body;

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Staff_Master");

    const searchusername = await collection.findOne({ Staff_Email: email });

    if (!searchusername) {
      return res.status(200).send({ Message: "Staff Not Found" });
    } else {
      let otp = genotp(
        searchusername["Staff_Email"],
        searchusername["Staff_name"]
      )
        .then((result) => {
          res.status(200).send({
            Message: "OTP Sent Successfully",
            OTP: result.otp,
            _id: searchusername["_id"],
            profile_pic: searchusername["isprofilepic"],
            subject: searchusername["Subject"],
            college: searchusername["college_id"],
            name: searchusername["Staff_name"]
          });
        })
        .catch((error) => {
          res.status(200).send({ Error: error });
        });
    }
  } catch (error) {
    console.error("Error Searching Record:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});

app.post("/services/validateadminlogin", async (req, res) => {
  const { email } = req.body;

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Admin_users");

    const searchadminemail = await collection.findOne({ E_mail: email });

    if (!searchadminemail) {
      return res.status(200).send({ Message: "User Not Found" });
    } else {
      let otp = genotp(
        searchadminemail["E_mail"],
        searchadminemail["Staff_name"]
      )
        .then((result) => {
          res.status(200).json({
            Message: "OTP Sent Successfully",
            OTP: result.otp,
            _id: searchadminemail["_id"],
            profile_pic: searchadminemail["isprofilepic"],
            college: searchadminemail["College_id"],
          });
        })
        .catch((error) => {
          res.status(200).send({ Error: error });
        });
    }
  } catch (error) {
    console.error("Error Searching Record:", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
});
app.use("/profilepics", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath); // Save the file in the uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const updateadmindoc = async (stdid, picurl) => {
  const db = new mongocon();

  try {
    console.log(typeof stdid);
    console.log(picurl);
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Admin_users");

    const updatepic = await collection.updateOne(
      { _id: stdid },
      {
        $set: {
          isprofilepic: true,
          profilepic: picurl,
        },
      }
    );

    if (!updatepic) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error updating the record", error);
    res.status(500).send({ message: "Server error" });
  } finally {
    await db.client.close();
  }
};
const updatestaffdoc = async (stdid, picurl) => {
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Staff_Master");

    const updatepic = await collection.updateOne(
      { _id: parseInt(stdid) },
      {
        $set: {
          isprofilepic: true,
          profilepic: picurl,
        },
      }
    );

    console.log(stdid);
    if (updatepic.matchedCount === 0) {
      console.log("No matching document found");
      return false;
    } else if (updatepic.modifiedCount === 0) {
      console.log("Document found but not modified");
      return true;
    } else {
      console.log("Updated successfully");
      return true;
    }
  } catch (error) {
    console.error("Error updating the record:", error);
    return false;
  } finally {
    await db.client.close();
  }
};

const updatestudendoc = async (stdid, picurl) => {
  const db = new mongocon();
  console.log("Student ID:", stdid);

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Student_Master");

    const studentId = parseInt(stdid);
    console.log(typeof studentId);

    const updatepic = await collection.updateOne(
      { _id: studentId },
      {
        $set: {
          isprofilepic: true,
          profilepic: picurl,
        },
      }
    );

    console.log("Update Result:", updatepic);

    if (updatepic.modifiedCount === 0) {
      console.log("No documents updated");
      return false;
    } else {
      console.log("Document updated successfully");
      return true;
    }
  } catch (error) {
    console.error("Error updating the record:", error);
    return false;
  } finally {
    await db.client.close();
  }
};

const upload = multer({ storage: storage });

app.post("/services/studenpicupload", upload.single("file"), (req, res) => {
  const { stdid, picname } = req.body;

  try {
    if (updatestudendoc(stdid, picname))
      res.status(200).json({
        message: "File uploaded successfully!",
        filename: req.file.filename,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload file", error: error.message });
  }
});
app.post("/services/adminpicupload", upload.single("file"), (req, res) => {
  const { staffid, picname } = req.body;
  try {
    if (updateadmindoc(parseInt(staffid), picname))
      res.status(200).json({
        message: "File uploaded successfully!",
        filename: req.file.filename,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload file", error: error.message });
  }
});
app.post("/services/staffpicupload", upload.single("file"), (req, res) => {
  const { staffid, picname } = req.body;

  try {
    if (updatestaffdoc(staffid, picname))
      res.status(200).json({
        message: "File uploaded successfully!",
        filename: req.file.filename,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload file", error: error.message });
  }
});

app.post("/services/updatestudentdetails", async (req, res) => {
  const { studentId, Email, Mobile, Student_Name } = req.body;

  const db = new mongocon();
  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Student_Master");

    const updateFields = {
      ...(Email && { Email }),
      ...(Mobile && { Mobile }),
      ...(Student_Name && { Student_Name }),
    };

    const result = await collection.updateOne(
      { _id: parseInt(studentId) },
      { $set: updateFields }
    );

    if (result.matchedCount == 0) {
      res.status(404).json({ message: "Student not found" });
    } else {
      res.status(200).json({ message: "Student details updated successfully" });
    }
  } catch (error) {
    console.error("Error updating student details:", error);
    res.status(500).json({ message: "Error updating student details", error });
  } finally {
    await db.client.close();
  }
});

app.post("/services/addholidays", async (req, res) => {
  const holidays = req.body.holidays;

  if (!Array.isArray(holidays) || holidays.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input: holidays array is required" });
  }

  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Holiday_Master");

    const holidayInsertions = [];

    for (const { name, date } of holidays) {
      if (!name || !date) {
        return res.status(400).json({
          message: "Holiday name and date are required for each holiday",
        });
      }

      const [day, month, year] = date.split("/").map(Number);
      const parsedDate = new Date(year, month - 1, day);

      if (isNaN(parsedDate.getTime())) {
        return res
          .status(400)
          .json({ message: `Invalid date for holiday: ${name}` });
      }

      const existingHoliday = await collection.findOne({ date: parsedDate });
      if (!existingHoliday) {
        holidayInsertions.push({ name, date: parsedDate });
      }
    }

    if (holidayInsertions.length > 0) {
      const result = await collection.insertMany(holidayInsertions);
      res
        .status(201)
        .json({ message: "Holidays added successfully", holidays: result.ops });
    } else {
      res.status(409).json({
        message: "No new holidays to add. Some holidays already exist.",
      });
    }
  } catch (error) {
    console.error("Error adding holidays:", error);
    res.status(500).json({ message: "Error adding holidays", error });
  } finally {
    await db.client.close();
  }
});

app.post("/services/getholidays", async (req, res) => {
  const db = new mongocon();
  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Holiday_Master");

    const holidays = await collection.find({}).toArray();

    const formattedHolidays = holidays.map((holiday) => ({
      name: holiday.name,
      date: `${String(holiday.date.getDate()).padStart(2, "0")}/${String(
        holiday.date.getMonth() + 1
      ).padStart(2, "0")}/${holiday.date.getFullYear()}`,
    }));

    res.status(200).json(formattedHolidays);
  } catch (error) {
    console.error("Error retrieving holidays:", error);
    res.status(500).json({ message: "Error retrieving holidays", error });
  } finally {
    await db.client.close();
  }
});
app.post("/services/create-zoom-meeting", async (req, res) => {
  try {
    const { topic, subject, date, time, duration, Class_id, section_id, college_id } = req.body;

    if (!topic || !date || !time || !Class_id || !section_id || !college_id) {
      return res.status(400).json({ error: "All fields (topic, date, time, Class_id, section_id, college_id) are required" });
    }

    const meetingDetails = await createZoomMeeting(topic, date, time, duration);
    console.log(meetingDetails);

    if (meetingDetails) {
      const { hostURL, joinURL, password } = meetingDetails.meeting;

      const db = new mongocon();

      try {
        await db.client.connect();
        const database = db.client.db(db.dbname);
        const collection = database.collection("zoom_meetings");

        const uid = genid();

        const result = await collection.insertOne({
          Meeting_Name: topic,
          class: Class_id,
          Section: section_id,
          Subject: subject,
          date: date,
          host_link: hostURL,
          join_link: joinURL,
          pwd: password,
          college_id: college_id,
        });
        console.log(result);

        if (result.acknowledged) {
          const staffinfo = await getstaff(Class_id, section_id, subject, database);
          const students = await getStudents(Class_id, section_id, database);

          if (staffinfo && students) {
            await sendzoomconftostud(students, topic, subject);
            await sendzoomconf(staffinfo.email, topic, subject, staffinfo.staffName, hostURL);
          } else {
            console.log("No staff or students found for the given criteria.");
          }

          res.status(200).send({ success: "Meeting Created Successfully" });
        } else {
          res.status(500).send("Error inserting meeting into the database");
        }
      } catch (error) {
        console.error("Error inserting documents:", error);
        res.status(500).json({ error: "Failed to insert meeting details", details: error.message });
      } finally {
        if (db.client) {
          await db.client.close();
          console.log("Disconnected from MongoDB");
        }
      }
    } else {
      res.status(500).json({ error: "Failed to create Zoom meeting" });
    }
  } catch (error) {
    console.error("Failed to create Zoom meeting:", error);
    res.status(500).json({ error: "Failed to create Zoom meeting", details: error.message });
  }
});

const getstaff = async (classId, section,subject, db) => {
  console.log(classId)
  console.log(section)
  try {
    const collection = db.collection("Staff_Master");
    const query = {
      Assigned_Class: classId,
      Section: section,
      Subject : subject
    };
    const result = await collection.findOne(query);
    if (result) {
      return {
        staffName: result.Staff_name,
        email: result.Staff_Email,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error searching staff:", error);
    throw error;
  }
};
const getStudents = async (classId, section, db) => {
  console.log("Fetching students for Class:", classId, "Section:", section);

  try {
    const collection = db.collection("Student_Master");
    const query = {
      Class: classId,
      Section: section,
    };

    const students = await collection.find(query).toArray();

    if (students.length > 0) {
      const studentData = students.map((student) => ({
        name: student.Student_Name,
        email: student.Email,
      }));
console.log(studentData)
      return studentData;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
app.post("/services/generate-mcqs", async (req, res) => {
  try {
    const { subject, content, noq, Cid, section_id, college_id, date} = req.body;

    if (!subject || !content || !noq || !Cid || !section_id || !college_id || !date) {
      return res.status(400).json({ error: "All fields (subject, content, noq, Cid, section, tid, college_id, date) are required" });
    }

    const questions = await generateMCQs(content, noq); 
    res.status(200).send({ questions });


  } catch (error) {
    res.status(500).json({ error: "Error generating MCQs", details: error.message });
  }
});

app.post("/services/save-mcqs", async (req, res) => {
  const db = new mongocon();

  try {
    const { Cid, section_id, subject, questions, date, college_id } = req.body;

    if (!Cid || !section_id || !subject || !questions || !date || !college_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("question_bank");

    // Format questions to include the unique ID
    const formattedQuestions = questions.map((q) => ({
      id: q.id, // Include the unique ID
      question: q.question,
      options: q.options,
      correctAnswer: q.answer,
      rewardPoints: q.rewardPoints || 10,
    }));

    const quizData = {
      subject_name: subject,
      class: Cid,
      section: section_id,
      date: date,
      college_id: college_id,
      questions: formattedQuestions, // Include formatted questions with IDs
      createdAt: new Date(),
    };

    const result = await collection.insertOne(quizData);

    if (result.acknowledged) {
      res.status(200).json({ message: "MCQs saved successfully", quizId: result.insertedId });
    } else {
      return res.status(500).json({ error: "Error saving MCQs" });
    }
  } catch (error) {
    console.error("Error saving MCQs:", error);
    return res.status(500).json({ error: "An error occurred while saving MCQs", details: error.message });
  } finally {
    await db.client.close();
  }
});




app.post("/services/get-mcqs", async (req, res) => {
  try {
    const { Cid, section_id, college_id } = req.body;

    if (!Cid || !section_id || !college_id) {
      return res.status(400).json({ error: "Class, section, and college_id are required" });
    }

    const db = new mongocon();
    try {
      await db.client.connect();
      const database = db.client.db(db.dbname);
      const collection = database.collection("question_bank");

      const query = {
        class: Cid,
        section: section_id,
        college_id: college_id
      };

      const questions = await collection.find(query).toArray();
      console.log(questions)

      if (questions.length === 0) {
        return res.status(200).json({ error: "No questions found for the provided class, section, and college_id" });
      }

      res.status(200).send({ questions });
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ error: "Error fetching questions from database", details: error.message });
    } finally {
      await db.client.close();
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving MCQs", details: error.message });
  }
});
app.post("/services/addsubject", async (req, res) => {
  const { subjectName, subjectDescription, from, to, faculty, selectedDate, college_id, Class, section } = req.body;

  try {
    const db = new mongocon();
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Time_Table");

    if (
      !subjectName ||
      !subjectDescription ||
      !from ||
      !to ||
      !faculty ||
      !selectedDate ||
      !college_id ||
      !Class ||
      !section
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing schedule conflict for the same faculty and time
    const existingSchedule = await collection.findOne({
      faculty: faculty,
      date: selectedDate,
      $or: [
        { Sub_From: { $lt: to }, Sub_to: { $gt: from } },
        { Sub_From: { $gte: from, $lt: to } },
        { Sub_to: { $gt: from, $lte: to } },
      ],
    });

    if (existingSchedule) {
      return res.status(409).json({
        message: "A schedule already exists for this faculty at the given time for the Given.",
      });
    }

    // Check if the faculty is already scheduled for a different class during the same time
     const facultyScheduledOtherClass = await collection.findOne({
        faculty: faculty,
        date: selectedDate,
        Class: { $ne: Class }, 
        $or: [
          { Sub_From: { $lt: to }, Sub_to: { $gt: from } },
          { Sub_From: { $gte: from, $lt: to } },
          { Sub_to: { $gt: from, $lte: to } },
        ],
     });

    if (facultyScheduledOtherClass) {
        return res.status(408).json({
            message: "Faculty is already scheduled for another class at this time for the Given Class and Subject.",
        });
    }

    const result = await collection.insertOne({
      Subject_Name: subjectName,
      Subject_Desc: subjectDescription,
      Class: Class,
      Section: section,
      Sub_From: from,
      Sub_to: to,
      faculty: faculty,
      date: selectedDate,
      college_id: college_id,
    });

    if (result.acknowledged === true) {
      res.status(201).json({
        message: "Subject added successfully",
        data: {
          _id: result.insertedId,
          Subject_Name: subjectName,
          Subject_Desc: subjectDescription,
          Sub_From: from,
          Sub_to: to,
          faculty: faculty,
          date: selectedDate,
        },
      });
    } else {
      res.status(500).json({ message: "Error while adding the Time Table" });
    }
  } catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({ message: "Failed to add subject", error });
  }
});

app.post("/services/deletesubject", async (req, res) => {
  const { id } = req.body; // Get subject ID from request body

  try {
    const db = new mongocon();
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Time_Table");

    if (!id) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Subject deleted successfully" });
    } else {
      res.status(404).json({ message: "Subject not found" });
    }
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ message: "Failed to delete subject", error });
  }
});





app.post("/services/getTimeTable", async (req, res) => {
  const { college_id,faculty,date,sid } = req.body;

  try { 
    const db = new mongocon();
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Time_Table");

    
    const query = {};
    if (college_id) query.college_id = college_id;
    if (faculty) query.faculty = faculty;
    if (date) query.date = date;

    
    const data = await collection.find(query).toArray();

    await db.client.close();

    if (data.length > 0) {
      res.status(200).json({
        message: "Data retrieved successfully",
        data: data,
      });
    } else {
      res.status(404).json({
        message: "No data found",
      });
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({
      message: "Failed to retrieve data",
      error: error.message,
    });
  }
});

app.post("/services/addleaveforstud", async (req, res) => {
  const { facultyName, reason, startDate, endDate, college_id } = req.body;

  // Validate required fields
  if (!facultyName || !reason || !startDate || !endDate || !college_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = new mongocon(); // Initialize MongoDB connection
    await db.client.connect(); // Connect to the database
    const database = db.client.db(db.dbname);
    const collection = database.collection("Leave_Requests");

    // Create the document to insert
    const newLeave = {
      sid: facultyName,
      reason: reason,
      startDate: new Date(startDate), 
      endDate: new Date(endDate), 
      submissionDate: new Date(), 
      college_id: college_id,
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newLeave);

    // Check if the insertion was successful
    if (result.acknowledged) {
      res.status(201).json({
        message: "Leave request added successfully",
        data: {
          _id: result.insertedId, // Include the inserted document's ID
          ...newLeave, // Spread the newLeave object to include all fields
        },
      });
    } else {
      res.status(500).json({ message: "Failed to add leave request: Insertion not acknowledged" });
    }
  } catch (error) {
    console.error("Error adding leave request:", error);
    res.status(500).json({ message: "Failed to add leave request", error: error.message });
  } finally {
    // Close the database connection
    if (db && db.client) {
      await db.client.close();
    }
  }
});


app.post("/services/addleaveforstaff", async (req, res) => {
  const { tid, reason, startDate, endDate, college_id } = req.body;

  
  if (!tid || !reason || !startDate || !endDate || !college_id) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = new mongocon(); // Initialize MongoDB connection
    await db.client.connect(); // Connect to the database
    const database = db.client.db(db.dbname);
    const collection = database.collection("Leave_Request");
   genid();
    // Create the document to insert
    const newLeave = {
      lid: uid,
      tid: tid,
      reason: reason,
      startDate: new Date(startDate), 
      endDate: new Date(endDate), 
      submissionDate: new Date(), 
      college_id: college_id,
      status : "pending",
      type : "Faculty"
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newLeave);

    // Check if the insertion was successful
    if (result.acknowledged) {
      res.status(201).json({
        message: "Leave request added successfully",
        data: {
          _id: result.insertedId, // Include the inserted document's ID
          ...newLeave, // Spread the newLeave object to include all fields
        },
      });
    } else {
      res.status(500).json({ message: "Failed to add leave request: Insertion not acknowledged" });
    }
  } catch (error) {
    console.error("Error adding leave request:", error);
    res.status(500).json({ message: "Failed to add leave request", error: error.message });
  } 
});
app.post("/services/getzoomstudents", async (req, res) => {
  const { college_id, cid, section_id } = req.body;
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("zoom_meetings");

    
    const zoom_meetings = await collection.find({
      class: cid,
      Section: section_id,
      college_id: college_id,
    }).toArray();

    
    const formattedMeetings = zoom_meetings.map((meeting) => ({
      Meeting_Name: meeting.Meeting_Name || "N/A",
      Date: meeting.date || "N/A",
      Joinurl: meeting.join_link || "#",
      Subject : meeting.Subject || "N/A",
      Class : meeting.class || "N/A",
      Section : meeting.Section || "N/A"

    }));

    res.status(200).json(formattedMeetings);
  } catch (error) {
    console.error("Error retrieving zoom meetings:", error);
    res.status(500).json({ message: "Error retrieving meetings", error });
  } finally {
    await db.client.close();
  }
});


app.post("/services/addleaverequest", async (req, res) => {
  const { from_date, to_date, reason, college_id, sid } = req.body;

  try {
    const db = new mongocon();
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection("Leave_Request");

    if (
      !sid ||
      !from_date ||
      !to_date ||
      !reason ||
      !college_id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert from_date and to_date from ISO format to Date objects
    const fromDateObject = new Date(from_date);
    const toDateObject = new Date(to_date);

    if (isNaN(fromDateObject.getTime()) || isNaN(toDateObject.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    // Check if a leave request for the same date range already exists
    const existingLeaveRequest = await collection.findOne({
      sid: parseInt(sid), // Parse sid to integer for database query
      $or: [
        {
          from_date: { $lte: toDateObject },
          to_date: { $gte: fromDateObject },
        },
        {
          from_date: { $gte: fromDateObject, $lte: toDateObject },
        },
        {
          to_date: { $gte: fromDateObject, $lte: toDateObject },
        },
      ],
    });

    if (existingLeaveRequest) {
      return res.status(409).json({
        message:
          "Leave request cannot be added as a leave request for the same date range is already there.",
      });
    }

     genid(); // Generate a unique ID for the leave request

    // Insert the new leave request into the database
    const result = await collection.insertOne({
      lid: uid,
      sid: parseInt(sid), // Parse sid to integer for database insertion
      from_date: fromDateObject,
      to_date: toDateObject,
      reason: reason,
      college_id: parseInt(college_id), // Parse college_id to integer for database insertion
      status: "Pending",
      type: "Student",
    });

    if (result.acknowledged === true) {
      const formattedFromDate = formatDate(fromDateObject);
      const formattedToDate = formatDate(toDateObject);

      res.status(201).json({
        message: "Leave request added successfully",
        data: {
          _id: result.insertedId,
          lid: uid,
          from_date: formattedFromDate,
          to_date: formattedToDate,
          reason: reason,
          college_id: parseInt(college_id), // Parse college_id to integer for response
          status: "Pending",
        },
      });
    } else {
      res.status(500).json({ message: "Error while adding the leave request" });
    }
  } catch (error) {
    console.error("Error adding leave request:", error);
    res.status(500).json({ message: "Failed to add leave request", error });
  }
});

// Helper function to format date (dd/mm/yyyy)
function formatDate(date) {
  if (!date || isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

app.post("/services/getleaverequest", async (req, res) => {
  const { college_id, } = req.body;

  if (!college_id) {
    return res.status(400).json({ message: "college_id is required" });
  }

  try {
    const db = new mongocon();
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const leaveCollection = database.collection("Leave_Request");
    const studentCollection = database.collection("Student_Master");
    const staffCollection = database.collection("Staff_Master");

    let query = { college_id: parseInt(college_id) };

    const leaveRequests = await leaveCollection.find(query).toArray();

    const leaveRequestsWithDetails = await Promise.all(
      leaveRequests.map(async (leaveRequest) => {
        let additionalDetails = {};

        if (leaveRequest.type === "Student" && leaveRequest.sid) {
          console.log("Searching Student:", leaveRequest.sid);
          const student = await studentCollection.findOne({
            _id: parseInt(leaveRequest.sid),
            college_id: parseInt(college_id),
          });
          console.log("Student Result:", student);

          if (student) {
            additionalDetails = {
              Student_Name: student.Student_Name,
              Class: student.Class,
              Section: student.Section,
            };
          }
        } else if (leaveRequest.type === "Faculty" && leaveRequest.tid) {
          console.log("Searching Staff:", leaveRequest.tid);
          const staff = await staffCollection.findOne({
            _id: leaveRequest.tid,
            college_id: parseInt(college_id),
          });
          console.log("Staff Result:", staff);

          if (staff) {
            additionalDetails = {
              Staff_Name: staff.Staff_name,
            };
          }
        }

        return { ...leaveRequest, ...additionalDetails };
      })
    );

    res.status(200).json({
      message: "Leave requests retrieved successfully",
      data: leaveRequestsWithDetails,
    });
  } catch (error) {
    console.error("Error retrieving leave requests:", error);
    res.status(500).json({
      message: "Failed to retrieve leave requests",
      error: error.message,
    });
  } 
});
app.post("/services/getfacultyleaverequest", async (req, res) => {
  const { college_id, staff_id } = req.body;

  if (!college_id) {
    return res.status(400).json({ message: "college_id is required" });
  }

  try {
    const db = new mongocon();
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const leaveCollection = database.collection("Leave_Request");
    const studentCollection = database.collection("Student_Master");
    const staffCollection = database.collection("Staff_Master");

    let query = { college_id: parseInt(college_id) };
    let staff;

    const leaveRequests = await leaveCollection.find(query).toArray();

    const filteredLeaveRequests = await Promise.all(
      leaveRequests.filter(async (leaveRequest) => {
        if (leaveRequest.type === "Student" && leaveRequest.sid) {
          const student = await studentCollection.findOne({
            _id: parseInt(leaveRequest.sid),
            college_id: parseInt(college_id),
          });

          if (student) {
            const staffForClass = await staffCollection.findOne({
              Assigned_Class: student.Class,
              Section: student.Section,
              college_id: parseInt(college_id),
            });

            if (staffForClass && staffForClass._id.toString() === staff_id) {
              return true; // Include this leave request
            }
          }
        }
        return false; // Exclude this leave request
      })
    );
      
    const leaveRequestsWithDetails = await Promise.all(
      leaveRequests.map(async (leaveRequest) => {
        let additionalDetails = {};

        if (leaveRequest.type === "Student" && leaveRequest.sid) {
          const student = await studentCollection.findOne({
            _id: parseInt(leaveRequest.sid),
            college_id: parseInt(college_id),
          });

          if (student) {
            additionalDetails = {
              Student_Name: student.Student_Name,
              Class: student.Class,
              Section: student.Section,
            };
          }
        } else if (leaveRequest.type === "Faculty" && leaveRequest.tid) {
          const staff = await staffCollection.findOne({
            tid: leaveRequest.tid,
            college_id: parseInt(college_id),
          });

          if (staff) {
            additionalDetails = {
              Staff_Name: staff.staff_name,
            };
          }
        }

        return { ...leaveRequest, ...additionalDetails };
      })
    );

    const result = leaveRequestsWithDetails.filter(req => {
        if(req.type === "Student"){
            const foundReq = filteredLeaveRequests.find(filReq => filReq.lid === req.lid);
            return foundReq;
        }else{
            return true;
        }
    })

    res.status(200).json({
      message: "Leave requests retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving leave requests:", error);
    res.status(500).json({
      message: "Failed to retrieve leave requests",
      error: error.message,
    });
  } 
});
app.post("/services/updateleaverequest/", async (req, res) => {
  const { id, status } = req.body;

  try {
    const db = new mongocon();
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const leaveCollection = database.collection("Leave_Request");

    const result = await leaveCollection.updateOne(
      { lid: id },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    const studentCollection = database.collection("Student_Master");
    const staffCollection = database.collection("Staff_Master");

    const findLeave = await leaveCollection.findOne({ lid: id });

    if (findLeave) {
      let userDetails = null;
      let email = null;
      let name = null;

      if (findLeave.sid) {
        // Search in Student_Master
        const student = await studentCollection.findOne({ _id: findLeave.sid });
        if (student && student.Email && student.Student_Name) {
          userDetails = student;
          email = student.Email;
          name = student.Student_Name;
        } else {
          console.error("Student not found or missing email/name.");
        }
      } else if (findLeave.tid) {
        // Search in Staff_Master
        const staff = await staffCollection.findOne({ _id: findLeave.tid });
        if (staff && staff.Staff_Email && staff.Staff_Name) {
          console.log(staff.staff_Email)
          userDetails = staff;
          email = staff.Staff_Email;
          name = staff.Staff_Name;
        } else {
          console.error("Staff not found or missing email/name.");
        }
      }

      if (userDetails && email && name) {
        const fromDateFormatted = formatDatel(findLeave.from_date);
        const toDateFormatted = formatDatel(findLeave.to_date);

        await sendleavestat(
          email,
          name,
          fromDateFormatted,
          toDateFormatted,
          status
        );
      }
    } else {
      console.error("Leave request not found after update.");
      res.status(500).json({ message: "Leave request not found after update." });
      return;
    }

    res.status(200).json({ message: "Leave request updated successfully" });
  } catch (error) {
    console.error("Error updating leave request:", error);
    res
      .status(500)
      .json({ message: "Failed to update leave request", error: error.message });
  }
});

// Helper function to format dates
function formatDatel(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

app.post("/services/updateLoyaltyPoints", async (req, res) => {
  const { studentId, loyaltyPointsEarned,college_id} = req.body;

  

  
    try {
      const db = new mongocon();
    await db.client.connect();
       const database = db.client.db(db.dbname);
      const collection = database.collection("Student_Master");

      
      const filter = { _id: studentId };

      
      const updateDoc = {
        $inc: { "total_rewards": loyaltyPointsEarned },
      };

      const result = await collection.updateOne(filter, updateDoc);

      if (result.acknowledged && result.modifiedCount > 0) {
        return res.status(200).json({ success: true, message: 'Loyalty points updated successfully', result: result });
      } else {
        return res.status(404).json({ success: false, message: 'Student not found or no update performed', result: result });
      }
    } catch (error) {
      console.error("Error updating loyalty points:", error);
      return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    } 
  
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
