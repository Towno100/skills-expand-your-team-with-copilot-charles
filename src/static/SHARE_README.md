# Social Sharing Module

This directory contains a modular implementation of social sharing functionality for activity cards.

## Module Structure

### `share-config.js`
Configuration constants for social sharing.

**Exports:**
- `SHARE_CONFIG` - Object containing:
  - `SCHOOL_NAME` - School name used in share text
  - `POPUP_WIDTH` / `POPUP_HEIGHT` - Popup window dimensions
  - `COPY_FEEDBACK_DURATION` - Duration to show "Copied!" feedback (ms)
  - `SHARE_MENU_HIDE_DELAY` - Delay before hiding share menu (ms)

### `share-utils.js`
Core utility functions for sharing operations.

**Exports:**
- `getShareUrl(activityName)` - Generates shareable URL for an activity
- `copyToClipboard(text)` - Copies text to clipboard using Clipboard API
- `shareActivity(platform, activityName, description, schedule)` - Handles platform-specific sharing

**Supported Platforms:**
- `facebook` - Opens Facebook share dialog
- `twitter` - Opens Twitter share with pre-populated text
- `email` - Opens email client with activity details
- `copy` - Copies link to clipboard

### `share-ui.js`
UI initialization and event handling.

**Exports:**
- `initializeShareFunctionality(activitiesListElement, allActivities, formatSchedule, showMessage)` - Sets up event delegation for share buttons

**Features:**
- Event delegation for optimal performance
- Auto-closes other share menus when opening new one
- Closes share menu when clicking outside
- Visual feedback for copy action

## Usage

```javascript
import { initializeShareFunctionality } from './share-ui.js';

// Initialize after DOM is ready and activities are loaded
initializeShareFunctionality(
  activitiesListElement,  // Container element for activities
  allActivities,          // Object with activity data
  formatSchedule,         // Function to format schedule
  showMessage            // Function to show user messages
);
```

## Integration

The main `app.js` file imports and initializes this module:

```javascript
import { initializeShareFunctionality } from './share-ui.js';

// ... after activities are loaded
initializeShareFunctionality(activitiesList, allActivities, formatSchedule, showMessage);
```

## Browser Support

Requires ES6 module support and modern Clipboard API. The Clipboard API requires:
- HTTPS connection (or localhost for development)
- User interaction (clipboard access is triggered by button clicks)

## Customization

To customize behavior, modify the constants in `share-config.js`:

```javascript
export const SHARE_CONFIG = {
  SCHOOL_NAME: 'Your School Name',  // Change school name
  POPUP_WIDTH: 800,                 // Adjust popup size
  POPUP_HEIGHT: 600,
  COPY_FEEDBACK_DURATION: 3000,     // Longer feedback display
  SHARE_MENU_HIDE_DELAY: 200,       // Slower menu hide
};
```
