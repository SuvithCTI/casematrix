/**
 * Case Matrix Security & Input Sanitization Utilities
 */

/**
 * Strips HTML tags, JavaScript event handlers, and dangerous control characters
 * to prevent XSS (Cross-Site Scripting) and DOM injection attacks.
 */
export function sanitizeText(input, maxLength = 500) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: pseudo-protocol
    .replace(/on\w+=/gi, '') // Remove inline event handlers like onclick=
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        case '&': return '&amp;';
        default: return char;
      }
    });
}

/**
 * Validates and normalizes email addresses
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates Indian Phone / WhatsApp numbers
 */
export function isValidPhone(phone) {
  if (typeof phone !== 'string') return false;
  const clean = phone.replace(/[^0-9]/g, '');
  return clean.length >= 10 && clean.length <= 13;
}

/**
 * Validates password strength (minimum 6 characters)
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long' };
  }
  return { valid: true };
}

/**
 * Safe JSON parser with fallback to prevent runtime crashes on corrupted localStorage
 */
export function safeJSONParse(raw, fallback = null) {
  if (!raw || typeof raw !== 'string') return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed !== null && parsed !== undefined ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
}
