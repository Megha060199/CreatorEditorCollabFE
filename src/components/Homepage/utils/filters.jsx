export function calculateSkip(page, limit) {
    return page > 1 ? (page - 1) * limit : 0;
  }
export function filterByCategory(editors, activeTab) {
    const categories = ['All', 'Video Editors', 'Proofreaders', 'Article Editors'];
    if (activeTab === 0) return editors;
    return editors.filter(row => row.at(-1) === categories[activeTab]);
  }
  