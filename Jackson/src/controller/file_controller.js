const bcrypt = require('bcrypt');
const db = require('../model');
const jwt = require('jsonwebtoken');
const { createdat } = require('../Utils/function');
require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');

module.exports = {
    upload : async(req, res) => {
        try {
            console.log(req.UserId);
            const s3 = new AWS.S3({
                accessKeyId: "place your access key !!!",
                secretAccessKey: "Place your Secret key !!!"
            });
            if (!req.files || !req.files.files) {
                return res.json({ status: false, message: "No files uploaded" });
            }
            const allowedMimeTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/pdf", 
                "image/jpeg",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];
            const uploadPromises = files.map(async (file) => {
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return { status: false, message: `Unsupported file type: ${file.mimetype}` };
                }
                const filePath = `${req.UserId}/${Date.now()}/${file.name}`;
                console.log(file.mimetype, "file.mimetype")
                const params = {
                    Bucket: "Place your bucket name hear !!!",
                    Key: filePath,
                    Body: file.data,
                    ACL: 'public-read',
                    ContentType: file.mimetype
                };
                try {
                    const data = await s3.upload(params).promise();
                    const activity = await db.activity.create({Userid : req.UserId, Type : "File Upload Sucessfully", Location :data.Location, CreatedAt: await createdat(), CreatedBy : req.UserId})
                    return { status: true, fileUrl: data.Location };
                } catch (err) {
                    console.log("Error uploading data: ", err);
                    return { status: false, message: "Error uploading file", error: err };
                }
            });
            
            const results = await Promise.all(uploadPromises);
            return res.json({ status: true, message: "Files Uploaded Successfully", results });
        } catch (error) {
            console.log("error", error);
            return res.json({ status: false, message: "Something Went Wrong !!!" });
        }
    }
};
