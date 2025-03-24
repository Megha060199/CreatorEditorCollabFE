
export function filterProjects(projects, tabIndex) {
    if (tabIndex === 0) return projects; // All
    if (tabIndex === 1) {
      return projects.filter(
        (p) => p.statusType === 'Editing' || p.statusType === 'Ready for Review'
      );
    }
    // tabIndex === 2 => Completed
    return projects.filter((p) => p.statusType === 'Published');
  }
  