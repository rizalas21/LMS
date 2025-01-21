const express = require("express");
const AuthenticateToken = require("../middleware/AuthenticateToken");
const router = express.Router();

module.exports = function (prisma) {
  router.get("/", async (req, res) => {
    const { page = 1, limit = 3, search = "" } = req.query;
    const offset = (page - 1) * limit;

    try {
      const peserta = await prisma.siswa.findMany({
        where: { nama_siswa: { contains: search, mode: "insensitive" } },
        include: { user: true },
        skip: Number(offset),
        take: Number(limit),
      });
      const total = await prisma.siswa.count({
        where: { nama_siswa: { contains: search, mode: "insensitive" } },
      });
      const pages = Math.ceil(total / limit);
      res.json({ peserta, total, pages });
    } catch (error) {
      res.status(500).json({ message: "Error fetching siswa", error });
    }
  });
  router.get("/:id", AuthenticateToken, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const siswa = await prisma.siswa.findUnique({
        where: { id_siswa: parseInt(id) },
      });
      if (!siswa) {
        return res.status(404).json({ message: "siswa not found" });
      }
      res.json(siswa);
    } catch (error) {
      res.status(500).json({ message: "Error fetching siswa", error });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nama_siswa, nis } = req.body;
    try {
      const siswa = await prisma.siswa.update({
        where: { id_siswa: parseInt(id) },
        data: { nama_siswa, nis },
      });
      res.json(siswa);
    } catch (error) {
      res.status(500).json({ message: "Error updating siswa", error });
    }
  });

  router.delete("/:id", AuthenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
      const siswa = await prisma.siswa.delete({
        where: { user_id: parseInt(id) },
      });
      if (!siswa) {
        return res.status(404).json({ message: "siswa not found" });
      } else {
        const user = await prisma.user.delete({
          where: { id_user: parseInt(id) },
        });
        if (!user) {
          return res.status(404).json({ message: "user not found" });
        }
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting materi", error });
    }
  });
  return router;
};
