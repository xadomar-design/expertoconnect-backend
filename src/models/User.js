import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

const User = db.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("admin", "provider", "customer"),
    defaultValue: "customer",
  },

  status: {
    type: DataTypes.ENUM("active", "inactive"),
    defaultValue: "active",
  },
});

export default User;
