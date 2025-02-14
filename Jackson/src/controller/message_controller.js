const bcrypt = require('bcrypt');
const db = require('../model');
const jwt = require('jsonwebtoken');
const { createdat } = require('../Utils/function');
require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const { Op } = require("sequelize");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
global.io = io;
module.exports = {
    sendmessage: async (req, res) => {
        try {
            const { SenderId, ReceiverId, message } = req.body;            
            if (!SenderId || !ReceiverId || !message) {
                return res.json({ 
                    status: false, 
                    message: "Missing required fields" 
                });
            }
            const message_send = await db.message.create({
                SenderId,
                ReceiverId,
                Data: message,
                CreatedAt: await createdat(),
                status: 'sent',
                CreatedBy : req.UserId
            });
            io.emit('sendmessage', {
                messageId: message_send.id,
                SenderId,
                ReceiverId,
                message,
                timestamp: message_send.CreatedAt
            });
            await db.activity.create({Userid : req.UserId, Type : "Message Send Sucessfully", CreatedAt : await createdat(), CreatedBy: req.UserId})
            return res.json({ 
                status: true, 
                message: "Message Sent Successfully",
                data: message_send 
            });

        } catch (error) {
            console.error("Error in sendmessage:", error);
            return res.json({ 
                status: false, 
                message: "Something Went Wrong!" 
            });
        }
    },
    receivemessage: async (req, res) => {
        try {
            const { userId, SenderId } = req.body;
            const page = req.body.Page || 0; 
            const limit = req.body.DataCount || 10; 
            const offset = page * limit;
            if (!userId) {
                return res.json({ 
                    status: false, 
                    message: "User ID is required" 
                });
            }
            const messages = await db.message.findAll({
                where: { ReceiverId: req.UserId,Deleted: "No" },limit: limit, offset: offset,
                order: [['CreatedAt', 'DESC']],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });
            await db.activity.create({Userid : req.UserId, Type : "Message Received Sucessfully", CreatedAt : await createdat(), CreatedBy: req.UserId})
            return res.json({
                status: true,
                message: "Messages Retrieved Successfully",
                data: {
                    messages: messages,
                    totalCount: messages.length,
                }
            });

        } catch (error) {
            console.error("Error in receivemessage:", error);
            return res.json({ 
                status: false, 
                message: "Something Went Wrong!" 
            });
        }
    },
    startTyping: async (req, res) => {
        try {
            const { receiverId } = req.params;
            const userId = req.UserId
            
            if (!receiverId) {
                return res.json({
                    status: false,
                    message: "User ID and Receiver ID are required"
                });
            }
            global.io.emit('typingStarted', {
                userId,
                receiverId,
                timestamp: await createdat()
            });

            return res.json({
                status: true,
                message: "Typing indicator sent"
            });

        } catch (error) {
            console.error("Error in startTyping:", error);
            return res.json({
                status: false,
                message: "Something went wrong!"
            });
        }
    },
    stopTyping: async (req, res) => {
        try {
            const { receiverId } = req.params;
            const userId = req.UserId
            if (!receiverId) {
                return res.json({
                    status: false,
                    message: "Receiver ID are required"
                });
            }
            global.io.emit('typingStopped', {
                userId,
                receiverId,
                timestamp: await createdat()
            });

            return res.json({
                status: true,
                message: "Typing stopped indicator sent"
            });

        } catch (error) {
            console.error("Error in stopTyping:", error);
            return res.json({
                status: false,
                message: "Something went wrong!"
            });
        }
    },
};
