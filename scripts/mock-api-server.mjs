import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";

const app = express();
const PORT = 4000;
const DB_PATH = path.join(process.cwd(), "db.json");

app.use(cors());
app.use(express.json());

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    return { vendors: [] };
  }

  const raw = fs.readFileSync(DB_PATH, "utf8");
  return JSON.parse(raw || "{\"vendors\":[]}");
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function toLower(value) {
  return String(value ?? "").toLowerCase();
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/vendors", (req, res) => {
  const db = readDb();
  const {
    page = "1",
    limit = "10",
    sortBy,
    order = "asc",
    status,
    category,
    city,
    search,
  } = req.query;

  let rows = [...db.vendors];

  if (status) {
    rows = rows.filter((row) => toLower(row.status) === toLower(status));
  }

  if (category) {
    rows = rows.filter((row) => toLower(row.category) === toLower(category));
  }

  if (city) {
    rows = rows.filter((row) => toLower(row.city) === toLower(city));
  }

  if (search) {
    const q = toLower(search);
    rows = rows.filter((row) =>
      [
        row.vendorName,
        row.vendorCode,
        row.category,
        row.contactPerson,
        row.city,
        row.status,
      ].some((value) => toLower(value).includes(q))
    );
  }

  if (sortBy) {
    const dir = toLower(order) === "desc" ? -1 : 1;
    rows.sort((a, b) => {
      const av = a[sortBy];
      const bv = b[sortBy];

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      if (typeof av === "number" && typeof bv === "number") {
        return (av - bv) * dir;
      }

      return String(av).localeCompare(String(bv), undefined, {
        sensitivity: "base",
        numeric: true,
      }) * dir;
    });
  }

  const pageNumber = Math.max(parseInt(String(page), 10) || 1, 1);
  const pageSize = Math.max(parseInt(String(limit), 10) || 10, 1);
  const total = rows.length;
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;
  const data = rows.slice(start, end);

  res.json({
    data,
    meta: {
      total,
      page: pageNumber,
      limit: pageSize,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPrevPage: pageNumber > 1,
    },
  });
});

app.get("/vendors/:id", (req, res) => {
  const db = readDb();
  const vendor = db.vendors.find((row) => row.id === req.params.id);

  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  return res.json(vendor);
});

app.post("/vendors", (req, res) => {
  const db = readDb();
  const ids = db.vendors.map((row) => Number(row.id)).filter(Number.isFinite);
  const nextId = String((Math.max(0, ...ids) || 0) + 1);

  const newVendor = {
    id: nextId,
    ...req.body,
  };

  db.vendors.push(newVendor);
  writeDb(db);

  res.status(201).json(newVendor);
});

app.put("/vendors/:id", (req, res) => {
  const db = readDb();
  const index = db.vendors.findIndex((row) => row.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  db.vendors[index] = {
    ...db.vendors[index],
    ...req.body,
    id: db.vendors[index].id,
  };
  writeDb(db);

  return res.json(db.vendors[index]);
});

app.delete("/vendors/:id", (req, res) => {
  const db = readDb();
  const index = db.vendors.findIndex((row) => row.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  const [deleted] = db.vendors.splice(index, 1);
  writeDb(db);

  return res.json({ message: "Vendor deleted", deleted });
});

app.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
});
