// Helper function to get category as string (handles new reference format, string, and old reference format for backward compatibility)
export function getCategoryString(
  category: 
    | { _id: string; title: string; slug?: { current: string }; image?: any }
    | string 
    | { _ref?: string; _type?: string; title?: string }
): string {
  if (typeof category === 'string') {
    return category
  }
  // Handle new reference format with title property
  if (category && typeof category === 'object' && 'title' in category && typeof category.title === 'string') {
    return category.title
  }
  // Handle old reference format
  if (category && typeof category === 'object' && '_ref' in category) {
    return 'مقالات' // Fallback for old format
  }
  return 'مقالات' // Default fallback
}

