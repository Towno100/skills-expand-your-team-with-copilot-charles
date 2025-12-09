/**
 * UI initialization and event handling for social sharing functionality
 */

import { SHARE_CONFIG } from './share-config.js';
import { shareActivity } from './share-utils.js';

/**
 * Initialize share functionality with event delegation
 * @param {HTMLElement} activitiesListElement - The activities list container element
 * @param {Object} allActivities - Object containing all activities data
 * @param {Function} formatSchedule - Function to format activity schedule
 * @param {Function} showMessage - Function to show user messages
 */
export function initializeShareFunctionality(activitiesListElement, allActivities, formatSchedule, showMessage) {
  // Event delegation for share buttons
  activitiesListElement.addEventListener("click", async (e) => {
    // Handle share button clicks
    if (e.target.closest(".share-button")) {
      e.stopPropagation();
      const shareButton = e.target.closest(".share-button");
      const activityName = shareButton.dataset.activity;
      const shareOptions = activitiesListElement.querySelector(`[data-share-options="${activityName}"]`);
      
      if (shareOptions) {
        // Close all other share options first
        activitiesListElement.querySelectorAll("[data-share-options]").forEach(opts => {
          if (opts !== shareOptions) {
            opts.classList.add("hidden");
          }
        });
        // Toggle current share options
        shareOptions.classList.toggle("hidden");
      }
    }
    
    // Handle share option clicks
    if (e.target.closest(".share-option")) {
      e.stopPropagation();
      const button = e.target.closest(".share-option");
      const platform = button.dataset.platform;
      const activityName = button.dataset.activity;
      const activityDetails = allActivities[activityName];
      
      if (activityDetails) {
        const formattedSchedule = formatSchedule(activityDetails);
        
        if (platform === 'copy') {
          const success = await shareActivity(platform, activityName, activityDetails.description, formattedSchedule);
          if (success) {
            // Visual feedback for copy action
            button.textContent = '✓ Copied!';
            button.classList.add('copied');
            setTimeout(() => {
              button.textContent = '🔗 Copy Link';
              button.classList.remove('copied');
            }, SHARE_CONFIG.COPY_FEEDBACK_DURATION);
          } else {
            showMessage('Failed to copy link', 'error');
          }
        } else {
          shareActivity(platform, activityName, activityDetails.description, formattedSchedule);
        }
        
        // Hide share options after sharing
        setTimeout(() => {
          const shareOptions = activitiesListElement.querySelector(`[data-share-options="${activityName}"]`);
          if (shareOptions) {
            shareOptions.classList.add("hidden");
          }
        }, SHARE_CONFIG.SHARE_MENU_HIDE_DELAY);
      }
    }
  });

  // Close share options when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#activities-list")) {
      activitiesListElement.querySelectorAll("[data-share-options]").forEach(opts => {
        opts.classList.add("hidden");
      });
    }
  });
}
