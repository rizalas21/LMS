const express = require("express");
const router = express.Router();

module.exports = function (prisma) {
  router.get("/", async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;
    try {
      const program = await prisma.program.findMany({
        where: { nama_program: { contains: search, mode: "insensitive" } },
        include: { guru: true },
      });
      const total = await prisma.program.count({
        where: { nama_program: { contains: search, mode: "insensitive" } },
      });
      return res.json({ program, total });
    } catch (error) {
      return res.status(500).json({ message: "Error fetching program", error });
    }
  });
  // GET / - One program with search and pagination
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const program = await prisma.program.findMany({
        where: { id_program: Number(id) },
        include: { program: true },
      });
      return res.json(program[0]);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching program", error });
    }
  });

  // POST / - Create a new program
  router.post("/", async (req, res) => {
    const { nama_program, deskripsi, thumbnail, guru_id } = req.body;
    try {
      const program = await prisma.program.create({
        data: {
          nama_program,
          deskripsi,
          thumbnail: thumbnail ? thumbnail : "",
          guru_id,
        },
      });
      return res.status(201).json(program);
    } catch (error) {
      return res.status(500).json({ message: "Error creating program", error });
    }
  });

  // PUT //:id - Update program by ID
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nama_program, deskripsi, thumbnail, guru_id } = req.body;
    try {
      const program = await prisma.program.update({
        where: { id_program: parseInt(id) },
        data: {
          nama_program,
          deskripsi,
          thumbnail: thumbnail ? thumbnail : "",
          guru_id,
        },
      });
      res.json(program);
    } catch (error) {
      res.status(500).json({ message: "Error updating program", error });
    }
  });

  // DELETE //:id - Delete program by ID
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.program.delete({
        where: { id_program: parseInt(id) },
      });
      res.json({ message: "Program deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting program", error });
    }
  });

  return router;
};
