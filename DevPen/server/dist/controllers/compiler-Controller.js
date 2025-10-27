"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCode = exports.getMyCodes = exports.loadCode = exports.saveOrUpdateCode = void 0;
const Code_1 = require("../models/Code");
const User_1 = require("../models/User");
;
const saveOrUpdateCode = async (req, res) => {
    try {
        const { fullCode, title, urlId } = req.body;
        // checkin auth
        if (!req._id) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        // finding user
        const user = await User_1.User.findById(req._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Validate submit
        if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
            return res.status(400).json({ message: "Code cannot be blank" });
        }
        // if this project exist with the user then update that
        if (user.savedCodes.includes(urlId)) {
            const prevProject = await Code_1.Code.findById(urlId);
            if (prevProject) {
                prevProject.fullCode = fullCode;
                await prevProject.save();
                return res.status(200).json({ message: "Code updated successfully", urlId: prevProject._id });
            }
        }
        // Check if code with same title already exists
        const existingCode = await Code_1.Code.findOne({ ownerInfo: user._id, title });
        if (existingCode) {
            // update
            existingCode.fullCode = fullCode;
            await existingCode.save();
            return res.status(200).json({ message: "Code updated successfully", urlId: existingCode._id });
        }
        else {
            // new save
            const newCode = await Code_1.Code.create({
                fullCode,
                ownerName: user.username,
                ownerInfo: user._id,
                title,
            });
            user.savedCodes.push(newCode._id);
            await user.save();
            return res.status(201).json({ message: "Code saved successfully", urlId: newCode._id });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};
exports.saveOrUpdateCode = saveOrUpdateCode;
const loadCode = async (req, res) => {
    // getting the id 
    const { urlId } = req.params;
    const userId = req._id;
    let isOwner = false;
    try {
        // check if code exists and user exists
        const existingCode = await Code_1.Code.findById(urlId);
        if (!existingCode) {
            return res.status(404).send({ message: "Code not found" });
        }
        const user = await User_1.User.findById(userId);
        // match credentials
        if (user?.username === existingCode.ownerName) {
            isOwner = true;
        }
        // if credentials match and they exist load the code
        return res.status(200).send({ fullCode: existingCode.fullCode, isOwner });
    }
    catch (error) {
        return res.status(500).send({ message: "Error loading code", error });
    }
};
exports.loadCode = loadCode;
const getMyCodes = async (req, res) => {
    const userId = req._id;
    try {
        // find user and populate saved codes sorted by updatedAt (descending)
        const user = await User_1.User.findById(userId).populate({
            path: "savedCodes",
            options: { sort: { createdAt: -1 } }, // sort by updatedAt
            select: "title fullCode updatedAt", // only fetch required fields from DB
        });
        if (!user) {
            return res.status(404).send({ message: "Cannot find User" });
        }
        // explicitly map 
        const formattedCodes = user.savedCodes.map((code) => ({
            _id: code._id,
            title: code.title,
            fullCode: code.fullCode
        }));
        return res.status(200).json({ codes: formattedCodes, username: user.username, email: user.email });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error loading your codes", error });
    }
};
exports.getMyCodes = getMyCodes;
const deleteCode = async (req, res) => {
    const userId = req._id;
    const { id } = req.params;
    try {
        // check user and code and match credentials
        const owner = await User_1.User.findById(userId);
        if (!owner) {
            return res.status(404).send({ message: "Cannot find the owner profile" });
        }
        const existingCode = await Code_1.Code.findById(id);
        if (!existingCode) {
            return res.status(404).send({ message: "Code not found" });
        }
        if (existingCode.ownerName !== owner.username) {
            return res
                .status(400)
                .send({ message: "You don't have permission to delete this code" });
        }
        const deleteCode = await Code_1.Code.findByIdAndDelete(id);
        if (deleteCode) {
            return res.status(200).send({ message: "Code Deleted successfully", urlId: deleteCode._id });
        }
        else {
            return res.status(404).send({ message: "Code not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Error deleting code", error });
    }
};
exports.deleteCode = deleteCode;
//# sourceMappingURL=compiler-Controller.js.map