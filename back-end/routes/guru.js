const express = require("express");
const AuthenticateToken = require("../middleware/AuthenticateToken");
const router = express.Router();

module.exports = function (prisma) {
  router.get("/", AuthenticateToken, async (req, res) => {
    const { page = 1, limit = 3, search = "" } = req.query;
    try {
      const guru = await prisma.guru.findMany({
        where: { nama_guru: { contains: search, mode: "insensitive" } },
        include: { program: true, user: true },
        take: Number(limit),
        skip: (page - 1) * limit,
      });

      const email = await prisma.user.findMany({
        where: { id_user: guru.user_id },
      });

      const total = await prisma.guru.count({
        where: { nama_guru: { contains: search, mode: "insensitive" } },
      });

      const totalPages = Math.ceil(total / limit);

      res.json({ guru, total, totalPages, email });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching guru", error: error.message });
    }
  });

  router.get("/:id", AuthenticateToken, async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    try {
      const guru = await prisma.guru.findUnique({
        where: { id_guru: parseInt(id) },
        include: { program: true },
      });
      if (!guru) {
        return res.status(404).json({ message: "Guru not found" });
      }
      res.json(guru);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching guru", error: error.message });
    }
  });

  router.delete("/:id", AuthenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
      const guru = await prisma.guru.delete({
        where: {
          user_id: parseInt(id),
        },
      });
      if (!guru) {
        return res.status(404).json({ message: "user not found" });
      } else {
        const user = await prisma.user.delete({
          where: { id_user: parseInt(id) },
        });
        if (!user) {
          return res.status(404).json({ message: "Guru not found" });
        }
        res.json(user);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching guru", error: error.message });
    }
  });

  router.post("/", AuthenticateToken, async (req, res) => {
    const { nama_guru, email, no_telepon } = req.body;
    try {
      const guru = await prisma.guru.create({
        data: { nama_guru, email, no_telepon },
      });
      res.status(201).json(guru);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating guru", error: error.message });
    }
  });

  router.put("/:id", AuthenticateToken, async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const { nama_guru, email, no_telepon } = req.body;
    try {
      const updatedGuru = await prisma.guru.update({
        where: { id_guru: parseInt(id) },
        data: { nama_guru, email, no_telepon },
      });
      res.json(updatedGuru);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating guru", error: error.message });
    }
  });

  router.post("/pendaftaran", async (req, res) => {
    const { siswa_id, program_id } = req.body;
    try {
      const pendaftaran = await prisma.pendaftaran.create({
        data: { siswa_id, program_id },
      });
      res.status(201).json(pendaftaran);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating pendaftaran", error: error.message });
    }
  });

  return router;
};
