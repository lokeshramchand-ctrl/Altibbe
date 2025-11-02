const PDFDocument = require("pdfkit");
const Submission = require("../models/submission.model");

exports.generatePDF = async (req, res) => {
  const { category } = req.params;

  try {
    const submissions = await Submission.find({ category });

    if (!submissions.length) {
      return res.status(404).json({ message: "No submissions found." });
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${category}_submissions.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text(`📄 Submissions Report`, { align: "center" });
    doc.moveDown(1);
    doc.fontSize(16).text(`Category: ${category}`, { align: "center" });
    doc.moveDown(2);

    submissions.forEach((sub, index) => {
      doc.fontSize(14).text(`${index + 1}. ${sub.productName || "Unnamed Product"}`, { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(12).text(`Category: ${sub.category}`);
      doc.text(`Price: $${sub.price || "N/A"}`);
      doc.text(`Submitted On: ${new Date(sub.createdAt).toLocaleString()}`);
      doc.moveDown(0.5);

      if (sub.answers && sub.answers.length > 0) {
        doc.fontSize(12).text("Answers:");
        sub.answers.forEach((ans, i) => {
          doc.text(`   Q${i + 1}: ${ans.question}`);
          doc.text(`   A: ${ans.answer}`);
          doc.moveDown(0.3);
        });
      } else {
        doc.fontSize(12).text("No answers provided.");
      }

      doc.moveDown(1);
      doc.moveTo(doc.x, doc.y).lineTo(550, doc.y).stroke(); // separator line
      doc.moveDown(1);
    });

    doc.end();
  } catch (err) {
    console.error("PDF generation failed:", err);
    res.status(500).json({ error: "Failed to generate PDF." });
  }
};
