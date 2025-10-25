"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCodes = exports.editCode = exports.deleteCode = exports.getMyCodes = exports.loadCode = exports.saveCode = void 0;
const Code_1 = require("../models/Code");
const User_1 = require("../models/User");
;
const saveCode = async (req, res) => {
    const { fullCode, title } = req.body;
    let ownerName = "Anonymous";
    let user = undefined;
    let ownerInfo = undefined;
    let isAuthenticated = false;
    // checking for existing user , if not user has to create account first
    if (req._id) {
        user = await User_1.User.findById(req._id);
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }
        ownerName = user?.username;
        ownerInfo = user._id;
        isAuthenticated = true;
    }
    // checking if empty strings being pushed
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
        return res.status(400).send({ message: "Code cannot be blank!" });
    }
    // if user exists and code is valid (not empty) push the code
    try {
        const newCode = await Code_1.Code.create({
            fullCode: fullCode,
            ownerName: ownerName,
            ownerInfo: ownerInfo,
            title: title,
        });
        // now update the user's saved codes as code is saved 
        if (isAuthenticated && user && newCode) {
            user.savedCodes.push(newCode._id);
            await user.save();
        }
        return res.status(201).send({ urlId: newCode._id });
    }
    catch (error) {
        return res.status(500).send({ message: "Error saving code", error });
    }
};
exports.saveCode = saveCode;
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
        // finding user
        const user = await User_1.User.findById(userId).populate({
            path: "savedCodes",
            options: { sort: { createdAt: -1 } }, // sorting codes in descending order based on creation date
        });
        if (!user) {
            return res.status(404).send({ message: "Cannot find User!" });
        }
        return res.status(200).send(user.savedCodes);
    }
    catch (error) {
        return res.status(500).send({ message: "Error loading my codes!", error });
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
            return res.status(404).send({ message: "Cannot find the owner profile!" });
        }
        const existingCode = await Code_1.Code.findById(id);
        if (!existingCode) {
            return res.status(404).send({ message: "Code not found" });
        }
        if (existingCode.ownerName !== owner.username) {
            return res
                .status(400)
                .send({ message: "You don't have permission to delete this code!" });
        }
        const deleteCode = await Code_1.Code.findByIdAndDelete(id);
        if (deleteCode) {
            return res.status(200).send({ message: "Code Deleted successfully!" });
        }
        else {
            return res.status(404).send({ message: "Code not found" });
        }
    }
    catch (error) {
        return res.status(500).send({ message: "Error deleting code!", error });
    }
};
exports.deleteCode = deleteCode;
const editCode = async (req, res) => {
    const userId = req._id;
    const { urlId } = req.params;
    const fullCode = req.body;
    try {
        // find user and code
        const owner = await User_1.User.findById(userId);
        if (!owner) {
            return res.status(404).send({ message: "Cannot find owner!" });
        }
        const existingCode = await Code_1.Code.findById(urlId);
        if (!existingCode) {
            return res.status(404).send({ message: "Cannot find post to edit!" });
        }
        // match credentials 
        if (existingCode.ownerName !== owner.username) {
            return res.status(400).send({ message: "You don't have permission to edit this post!" });
        }
        // find and update
        await Code_1.Code.findByIdAndUpdate(urlId, {
            fullCode: fullCode,
        });
        return res.status(200).send({ message: "Code updated successfully" });
    }
    catch (error) {
        return res.status(500).send({ message: "Error editing code!", error });
    }
};
exports.editCode = editCode;
const getAllCodes = async (req, res) => {
    try {
        const allCodes = await Code_1.Code.find().sort({ createdAt: -1 });
        return res.status(200).send(allCodes);
    }
    catch (error) {
        return res.status(500).send({ message: "Error editing code!", error });
    }
};
exports.getAllCodes = getAllCodes;
//# sourceMappingURL=compiler-Controller.js.map