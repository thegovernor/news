// Helper function to get category as string (handles both string and object for backward compatibility)
export function getCategoryString(
  category: string | { _ref?: string; _type?: string; title?: string }
): string {
  if (typeof category === 'string') {
    return category
  }
  // Handle old reference format
  if (category && typeof category === 'object' && 'title' in category) {
    return category.title || 'مقالات'
  }
  return 'مقالات' // Default fallback
}

