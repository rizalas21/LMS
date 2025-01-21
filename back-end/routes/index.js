const { PrismaClient } = require("@prisma/client");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const AuthenticateToken = require("../middleware/AuthenticateToken");

const prisma = new PrismaClient();
router.post("/register", async function (req, res) {
  const { email, password, nama_siswa, nis, nama_guru, nip, role } = req.body;
  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password, dan role harus diisi." });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: "Email sudah digunakan." });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });
    if (role === "siswa") {
      if (!nama_siswa) {
        return res
          .status(400)
          .json({ message: "Nama siswa dan NIS harus diisi untuk siswa." });
      }

      const siswa = await prisma.siswa.create({
        data: {
          nama_siswa,
          nis,
          user_id: user.id_user,
        },
      });

      return res.status(201).json({
        message: "Registrasi siswa berhasil.",
        user,
        siswa,
      });
    } else if (role === "guru") {
      if (!nama_guru) {
        return res
          .status(400)
          .json({ message: "Nama guru dan NIP harus diisi untuk guru." });
      }

      const guru = await prisma.guru.create({
        data: {
          nama_guru,
          nip: nip ? nip : "",
          user_id: user.id_user,
        },
      });

      return res.status(201).json({
        message: "Registrasi guru berhasil.",
        user,
        guru,
      });
    } else if (role === "admin") {
      return res.status(201).json({
        message: "Registrasi admin berhasil.",
        user,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server.", error });
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const data = await req.body;

    const rows = await prisma.user.findUnique({
      where: {
        email: data?.email,
      },
    });

    const jwtData = {
      email: data.email,
      role: data.role,
    };

    if (rows.password && rows.password === data.password) {
      const token = jwt.sign(jwtData, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ token, rows }).status(200);
    }

    return res.json(null).status(403);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server.", error });
  }
});
router.get(
  "/data/user/:id",
  AuthenticateToken,
  async function (req, res, next) {
    try {
      const { id } = await req.params;

      const rows = await prisma.user.findMany({
        where: {
          id_user: Number(id),
        },
      });

      return res.json(rows[0]).status(304);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan pada server.", error });
    }
  }
);

module.exports = router;
