import { Request, Response } from "express";
import { Code } from "../models/Code";
import { AuthRequest } from "../middlewares/verifyToken";
import { User } from "../models/User";

export interface fullCodeType {
  html: string;
  css: string;
  javascript: string;
};

export const saveOrUpdateCode = async (req: AuthRequest, res: Response) => {
  try {
    const { fullCode, title }: { fullCode: fullCodeType; title: string } = req.body;

    // checkin auth
    if (!req._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // finding user
    const user = await User.findById(req._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate submit
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
      return res.status(400).json({ message: "Code cannot be blank" });
    }

    // Check if code with same title already exists
    const existingCode = await Code.findOne({ ownerInfo: user._id, title });
    if (existingCode) {
      // update
      existingCode.fullCode = fullCode;
      await existingCode.save();

      return res.status(200).json({ message: "Code updated successfully", urlId: existingCode._id });
    } else {
      // new save
      const newCode = await Code.create({
        fullCode,
        ownerName: user.username,
        ownerInfo: user._id,
        title,
      });

      user.savedCodes.push(newCode._id);
      await user.save();

      return res.status(201).json({ message: "Code saved successfully", urlId: newCode._id });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// export const saveCode = async (req: AuthRequest, res: Response) => {
//   const { fullCode, title }: { fullCode: fullCodeType; title: string } = req.body;
//   let ownerName = "Anonymous";
//   let user = undefined;
//   let ownerInfo = undefined;
//   let isAuthenticated = false;

//   // checking for existing user , if not user has to create account first
//   if (req._id) {
//     user = await User.findById(req._id);
//     if (!user) {
//       return res.status(404).send({ message: "User not found!" });
//     }
//     ownerName = user.username;
//     ownerInfo = user._id;
//     isAuthenticated = true;
//   }
//   // checking if empty strings being pushed
//   if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
//     return res.status(400).send({ message: "Code cannot be blank!" });
//   }

//   // if user exists and code is valid (not empty) push the code
//   try {
//     if (!user) {
//       return res.status(404).send({ message: "User not found!" });
//     }
//     const newCode = await Code.create({
//       fullCode: fullCode,
//       ownerName: user.username,
//       ownerInfo: user._id,
//       title: title,
//     });

//     // now update the user's saved codes as code is saved 
//     if (isAuthenticated && user && newCode) {
//       user.savedCodes.push(newCode._id);
//       await user.save();
//     }
//     return res.status(201).send({ urlId: newCode._id });
//   } catch (error) {
//     return res.status(500).send({ message: "Error saving code", error });
//   }
// };

// export const updateCode = async (req: AuthRequest, res: Response) => {
//   try {
//     const { fullCode, title }: { fullCode: fullCodeType ; title: string } = req.body;
//     // check auth
//     if (!req._id) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }
//     // Fetch user and their saved codes
//     const user = await User.findById(req._id).populate("savedCodes");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     // Find the code with matching title in user's saved codes
//     const existingCode = user.savedCodes.find(
//       (code: any) => code.title.toLowerCase() === title.toLowerCase()
//     );
//     // If not found ask user to save first
//     if (!existingCode) {
//       return res.status(400).json({ message: "Save code first before updating" });
//     }

//     // Update the fullCode section
//     await Code.findByIdAndUpdate(
//       existingCode._id,
//       { fullCode },
//       { new: true }
//     );

//     return res.status(200).json({ message: "Code updated successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const loadCode = async (req: AuthRequest, res: Response) => {
  // getting the id 
  const { urlId } = req.params;
  const userId = req._id;
  let isOwner = false;
  try {
    // check if code exists and user exists
    const existingCode = await Code.findById(urlId);
    if (!existingCode) {
      return res.status(404).send({ message: "Code not found" });
    }
    const user = await User.findById(userId);

    // match credentials
    if (user?.username === existingCode.ownerName) {
      isOwner = true;
    }
    // if credentials match and they exist load the code
    return res.status(200).send({ fullCode: existingCode.fullCode, isOwner });
  } catch (error) {
    return res.status(500).send({ message: "Error loading code", error });
  }
};

// export const getMyCodes = async (req: AuthRequest, res: Response) => {
//   const userId = req._id;
//   try {
//     // finding user
//     const user = await User.findById(userId).populate({
//       path: "savedCodes",
//       options: { sort: { createdAt: -1 } }, // sorting codes in descending order based on creation date
//     });

//     if (!user) {
//       return res.status(404).send({ message: "Cannot find User" });
//     }
//     return res.status(200).send(user.savedCodes);
//   } catch (error) {
//     return res.status(500).send({ message: "Error loading your codes", error });
//   }
// };
export const getMyCodes = async (req: AuthRequest, res: Response) => {
  const userId = req._id;

  try {
    // find user and populate saved codes sorted by updatedAt (descending)
    const user = await User.findById(userId).populate({
      path: "savedCodes",
      options: { sort: { updatedAt: -1 } }, // sort by updatedAt
      select: "title fullCode updatedAt",   // only fetch required fields from DB
    });

    if (!user) {
      return res.status(404).send({ message: "Cannot find User" });
    }

    // explicitly map 
    const formattedCodes = user.savedCodes.map((code: any) => ({
      _id: code._id,
      title: code.title,
      fullCode: code.fullCode
    }));
    return res.status(200).json({codes : formattedCodes , username : user.username , email : user.email});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error loading your codes", error });
  }
};

export const deleteCode = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  const { id } = req.params;
  try {
    // check user and code and match credentials
    const owner = await User.findById(userId);
    if (!owner) {
      return res.status(404).send({ message: "Cannot find the owner profile" });
    }

    const existingCode = await Code.findById(id);
    if (!existingCode) {
      return res.status(404).send({ message: "Code not found" });
    }

    if (existingCode.ownerName !== owner.username) {
      return res
        .status(400)
        .send({ message: "You don't have permission to delete this code" });
    }

    const deleteCode = await Code.findByIdAndDelete(id);

    if (deleteCode) {
      return res.status(200).send({ message: "Code Deleted successfully" });
    } else {
      return res.status(404).send({ message: "Code not found" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error deleting code", error });
  }
};

export const editCode = async (req: AuthRequest, res: Response) => {
  const userId = req._id;
  const { urlId } = req.params;
  const fullCode = req.body;
  try {
    // find user and code
    const owner = await User.findById(userId);
    if (!owner) {
      return res.status(404).send({ message: "Cannot find owner" });
    }
    const existingCode = await Code.findById(urlId);
    if (!existingCode) {
      return res.status(404).send({ message: "Cannot find post to edit" });
    }

    // match credentials 
    if (existingCode.ownerName !== owner.username) {
      return res.status(400).send({ message: "You don't have permission to edit this post" });
    }

    // find and update
    await Code.findByIdAndUpdate(urlId, {
      fullCode: fullCode,
    });

    return res.status(200).send({ message: "Code updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error editing code", error });
  }
};

export const getAllCodes = async (req: AuthRequest, res: Response) => {
  try {
    const allCodes = await Code.find().sort({ createdAt: -1 });
    return res.status(200).send(allCodes);
  } catch (error) {
    return res.status(500).send({ message: "Error editing code", error });
  }
};
