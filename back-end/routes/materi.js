const express = require("express");
const AuthenticateToken = require("../middleware/AuthenticateToken");
const router = express.Router();

module.exports = function (prisma) {
  router.get("/", AuthenticateToken, async (req, res) => {
    const { page = 1, limit = 3, search = "" } = req.query;
    const offset = (page - 1) * limit;

    try {
      const materi = await prisma.materi.findMany({
        where: { nama_materi: { contains: search, mode: "insensitive" } },
        include: { program: true },
        skip: Number(offset),
        take: Number(limit),
      });
      const total = await prisma.materi.count({
        where: { nama_materi: { contains: search, mode: "insensitive" } },
      });
      const pages = Math.ceil(total / limit);
      res.json({ materi, total, pages });
    } catch (error) {
      res.status(500).json({ message: "Error fetching materi", error });
    }
  });
  router.get("/:id", AuthenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
      const materi = await prisma.materi.findMany({
        where: { id_materi: Number(id) },
        include: { program: true },
      });
      res.json(materi[0]);
    } catch (error) {
      res.status(500).json({ message: "Error fetching materi", error });
    }
  });

  router.post("/", AuthenticateToken, async (req, res) => {
    const { nama_materi, konten, program_id } = req.body;
    const id = Number(program_id);
    try {
      const materi = await prisma.materi.create({
        data: { nama_materi, konten, program_id: id },
      });
      res.status(201).json(materi);
    } catch (error) {
      res.status(500).json({ message: "Error creating materi", error });
    }
  });

  // PUT //:id - Update materi by ID
  router.put("/:id", AuthenticateToken, async (req, res) => {
    const { id } = req.params;
    const { nama_materi, konten, program_id } = req.body;
    try {
      const materi = await prisma.materi.update({
        where: { id_materi: parseInt(id) },
        data: { nama_materi, konten, program_id },
      });
      res.json(materi);
    } catch (error) {
      res.status(500).json({ message: "Error updating materi", error });
    }
  });

  // DELETE //:id - Delete materi by ID
  router.delete("/:id", AuthenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.materi.delete({ where: { id_materi: parseInt(id) } });
      res.json({ message: "Materi deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting materi", error });
    }
  });
  return router;
};
