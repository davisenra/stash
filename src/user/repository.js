import { db } from '../database.js';

/**
 * Finds a user by their email.
 * @param {string} email - The user's email.
 * @returns {Promise<Object|null>} - The user object or null if not found.
 */
async function findByEmail(email) {
  return await db('users').where('email', email).first();
}

/**
 * Saves a new user to the database.
 * @param {Object} user - The user object.
 * @param {string} user.name - The user's name.
 * @param {string} user.email - The user's email.
 * @param {string} user.passwordHash - The hashed password.
 * @returns {Promise<void>}
 */
async function save(user) {
  await db('users').insert({
    name: user.name,
    email: user.email,
    password_hash: user.passwordHash,
    created_at: new Date().toISOString(),
  });
}

/**
 * Changes a user's password.
 * @param {string} email - The user's email.
 * @param {string} newPasswordHash - The new hashed password.
 * @returns {Promise<void>}
 */
async function updatePassword(id, newPasswordHash) {
  await db('users').where('id', id).update({
    password: newPasswordHash,
    updated_at: new Date().toISOString(),
  });
}

export default { findByEmail, save, updatePassword };
