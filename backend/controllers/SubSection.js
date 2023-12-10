const Section = require("../model/Section");
const SubSection = require("../model/SubSection");

exports.createSubSection = async (req, res) => {
  try {
    const { title, details, sectionId } = req.body;

    if ((!title, !details)) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const createdSubSection = await SubSection.create({ title, details });

    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: createdSubSection._id },
      },

      { new: true }
    )
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      message: " SubSection Created",
      data: section,
    });
  } catch (error) {
    console.log("Subsection Creating Error => ", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    await SubSection.findByIdAndDelete(subSectionId);

    const section = await Section.findByIdAndUpdate(
      sectionId,
      {
        $pull: { subSection: subSectionId },
      },

      { new: true }
    )
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      message: " SubSection Created",
      data: section,
    });
  } catch (error) {
    console.log("Subsection Deleting Error => ", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, details } = req.body;
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "SubSection Not found",
      });
    }

    await SubSection.findByIdAndUpdate(
      subSectionId,
      { title: title, details: details },
      { new: true }
    );

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    return res.status(200).json({
      success: true,
      message: " SubSection Updated",
      data: updatedSection,
    });
  } catch (error) {
    console.log("Subsection Editing Error => ", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
