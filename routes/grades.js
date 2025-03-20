import express from "express";
// import db from "../db/conn.js";
// import { ObjectId } from "mongodb";
import grade from "../models/grades.js";
import mongoose from "mongoose";

const router = express.Router();

// const newDoc = new grade({
//   "learner_id": 5,
//   "class_id": 391,
//   "scores": []
// });

// This saves (inserts) the document to the database.
// We'll disable it here with an anonymous function wrapper
// to prevent duplicates in our example database.
// newDoc.save().then(() => {
//   console.log('Document saved');
// }).catch((err) => {
//   console.log('Error saving document', err);
// });

// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    let result = await grade.findById({ _id: req.params.id });
    if (!result) {
      return res.status(404).send("Grade not found");
    }
    res.send(result);
  } catch (e) {
    console.error(e);
    res.send("Invalid ID").status(400);
  }
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  try {
    let result = await grade.findOne({ learner_id: req.params.id });

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (e) {
    console.error(e.message);
    res.status(400).send("Invalid Id");
  }
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  try {
    let result = await grade.findOne({ class_id: Number(req.params.id) });

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (e) {
    console.error(e.message);
    res.status(400).send("Invalid Id");
  }
});

// Create a single grade entry
router.post("/", async (req, res) => {
  try {
    let newDocument = req.body;
    let result = await grade.insertOne(newDocument);
    res.send(result).status(204);
  } catch (e) {
    console.error(e);
    res.send("Invalid Data").status(400);
  }
});

// Update a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  try {
    const result = await grade.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (e) {
    console.error(e);
    res.send("Invalid Data").status(400);
  }
});

  // Update a class id
  router.patch("/class/:id", async (req, res) => {
    try {
    let result = await grade.updateMany({class_id: Number(req.params.id)}, 
    {$set: { class_id: req.body.class_id }}
    );  
    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (e) {
    console.error(e.message);
    res.status(400).send("Invalid Id");
  }
  });

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try {
    let query = { _id: req.params.id };
    let result = await grade.deleteOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (e) {
    console.error(e.message);
    res.status(400).send("Invalid Id");
  }
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  try {
    let result = await grade.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { scores: req.body } },
      { new: true }
    );

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (e) {
    console.error(e.message);
    res.status(400).send("Invalid Id");
  }
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try {
    let result = await grade.deleteOne({ _id: req.params.id });

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (e) {
    console.error(e.message);
    res.status(400).send("Invalid Id");
  }
});

  // Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
try{
    let result = await grade.deleteOne({ learner_id: Number(req.params.id) });

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (e) {
    console.error(e.message);
    res.status(400).send("Invalid Id");
  }
  });

  // Delete a class
router.delete("/class/:id", async (req, res) => {
  try{
  let query = { class_id: Number(req.params.id) };
  let result = await grade.deleteMany(query);

  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
} catch (e) {
  console.error(e.message);
  res.status(400).send("Invalid Id");
}
});



export default router;
