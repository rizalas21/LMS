const express = require("express");
const router = express.Router();

router.get("/nilai", async (req, res) => {
  const { page = 1, limit = 10, siswa_id } = req.query;
  try {
    const nilai = await prismaClient.nilai.findMany(
      paginate(
        {
          where: siswa_id ? { siswa_id: parseInt(siswa_id) } : {},
          include: { siswa: true, program: true },
        },
        parseInt(page),
        parseInt(limit)
      )
    );
    const total = await prismaClient.nilai.count({
      where: siswa_id ? { siswa_id: parseInt(siswa_id) } : {},
    });
    res.json({ nilai, total });
  } catch (error) {
    res.status(500).json({ message: "Error fetching nilai", error });
  }
});

// POST /nilai - Add nilai
router.post("/nilai", async (req, res) => {
  const { nilai, siswa_id, program_id } = req.body;
  try {
    const createdNilai = await prismaClient.nilai.create({
      data: { nilai, siswa_id, program_id },
    });
    res.status(201).json(createdNilai);
  } catch (error) {
    res.status(500).json({ message: "Error creating nilai", error });
  }
});

// PUT /nilai/:id - Update nilai
router.put("/nilai/:id", async (req, res) => {
  const { id } = req.params;
  const { nilai } = req.body;
  try {
    const updatedNilai = await prismaClient.nilai.update({
      where: { id_nilai: parseInt(id) },
      data: { nilai },
    });
    res.json(updatedNilai);
  } catch (error) {
    res.status(500).json({ message: "Error updating nilai", error });
  }
});

// DELETE /nilai/:id - Delete nilai
router.delete("/nilai/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prismaClient.nilai.delete({ where: { id_nilai: parseInt(id) } });
    res.json({ message: "Nilai deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting nilai", error });
  }
});

module.exports = router;
