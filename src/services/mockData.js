/**
 * Temporary empty mockData file
 * This prevents import errors while the cache clears
 */

// Empty default export
export default {};

// Empty named exports for any potential imports
export const mockJournalEntries = [];
export const mockChildren = [];
export const mockChores = [];
export const mockUser = null;
export const mockAIInsights = [];
export const mockParents = [];
export const mockProfiles = [];

// Add a console log to track when this is imported
if (__DEV__) {
  console.log('📝 mockData.js imported - this should be temporary');
}