import Team from "../models/Team.js";

/* ===========================
   Get All Members
=========================== */

export const getMembers = async (req, res) => {
  try {
    const members = await Team.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===========================
   Get Single Member
=========================== */

export const getMember = async (req, res) => {
  try {
    const member = await Team.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===========================
   Create Member
=========================== */

export const createMember = async (req, res) => {
  try {
    const member = await Team.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===========================
   Update Member
=========================== */

export const updateMember = async (req, res) => {
  try {
    const member = await Team.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===========================
   Delete Member
=========================== */

export const deleteMember = async (req, res) => {
  try {
    const member = await Team.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.status(200).json({
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};