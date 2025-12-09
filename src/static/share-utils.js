/**
 * Utility functions for social sharing functionality
 */

import { SHARE_CONFIG } from './share-config.js';

/**
 * Generate a shareable URL for an activity
 * @param {string} activityName - Name of the activity to share
 * @returns {string} Shareable URL with activity parameter
 */
export function getShareUrl(activityName) {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?activity=${encodeURIComponent(activityName)}`;
}

/**
 * Copy text to clipboard using modern Clipboard API
 * @param {string} text - Text to copy to clipboard
 * @returns {Promise<boolean>} True if copy was successful, false otherwise
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // If clipboard API is not available, show error message
    console.error('Clipboard API not available:', err);
    return false;
  }
}

/**
 * Handle sharing an activity to a specific platform
 * @param {string} platform - Platform to share to ('facebook', 'twitter', 'email', or 'copy')
 * @param {string} activityName - Name of the activity
 * @param {string} description - Activity description
 * @param {string} schedule - Activity schedule
 * @returns {Promise<boolean>|undefined} Returns promise for 'copy' platform, undefined for others
 */
export function shareActivity(platform, activityName, description, schedule) {
  const shareUrl = getShareUrl(activityName);
  const shareText = `Check out ${activityName} at ${SHARE_CONFIG.SCHOOL_NAME}! ${description} - ${schedule}`;
  const popupOptions = `width=${SHARE_CONFIG.POPUP_WIDTH},height=${SHARE_CONFIG.POPUP_HEIGHT}`;
  
  switch (platform) {
    case 'facebook':
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        '_blank',
        popupOptions
      );
      break;
    case 'twitter':
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        '_blank',
        popupOptions
      );
      break;
    case 'email':
      window.location.href = `mailto:?subject=${encodeURIComponent('Check out this activity!')}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
      break;
    case 'copy':
      return copyToClipboard(shareUrl);
    default:
      console.error('Unknown share platform:', platform);
  }
}
