import { Long, MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import express from "express";
import { nanoid, customAlphabet } from "nanoid";
import cors from "cors";
import { exectemail, genotp } from "./email/config.mjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { totalmem } from "os";

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

app.post("/services/addstudent", async (req, res) => {
  const { studentdata, collecname } = req.body;

  console.log(studentdata);
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const collection = database.collection(collecname);
    const result = await collection.insertMany(studentdata);
    if (result.acknowledged == true && result.insertedCount > 0) {
      res.status(200).json({ Message: "Successfull" });
    } else {
      res.status(400).json({ Message: "Error" });
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
  } finally {
    await db.client.close();
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
  const { staffid } = req.body;
  const db = new mongocon();

  try {
    await db.client.connect();
    const database = db.client.db(db.dbname);
    const staffcol = database.collection("Staff_Master");
    const getstaff = await staffcol.findOne({ _id: staffid });
    const collection = database.collection("Student_Master");
    console.log(getstaff["Assigned_Class"]);
    const staff = await collection
      .find(
        { Class: getstaff["Assigned_Class"], Section: getstaff["Section"] },
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
      .find(
        {},
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

    const staffCount = await collection1.findOne({ _id: staff_id });
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

app.post("/services/getstuddashatt", async (req, res) => {
  const db = new mongocon();
  const { sid, month } = req.body;
  let regexPattern = new RegExp(`/${month}/${2024}`);

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

    const days = new Date(2024, month, 0).getDate();

    const presentCount = await attendance.countDocuments({
      Student_id: sid,
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

    const presentCount = (
      await attendance.distinct("Date", {
        Subject: Subject,
        Date: { $regex: monthPattern },
      })
    ).length;

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
      .send({ message: "Record deleted successfully", deletedRecord });
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
