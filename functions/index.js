const functions = require("firebase-functions");
const admin = require("firebase-admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

// REGISTER USER
exports.register = functions.https.onRequest(function(req, res) {
  cors(req, res, async () => {
    try {
      const { fullName, email, password, role } = req.body;

      const userRef = db.collection("users").doc(email);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashed = await bcrypt.hash(password, 10);

      await userRef.set({
        fullName,
        email,
        password: hashed,
        role: role || "customer",
        status: "active",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});
// LOGIN USER
exports.login = functions.https.onRequest(function(req, res) {
  cors(req, res, async () => {
    try {
      const { email, password } = req.body;

      const userRef = db.collection("users").doc(email);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const user = userDoc.data();
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { email: user.email, role: user.role },
        "SUPER_SECRET_KEY",
        { expiresIn: "7d" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});
