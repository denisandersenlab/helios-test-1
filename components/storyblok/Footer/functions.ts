import type { FooterLinksGroupStoryblok } from '@/src/generated/sb';
import {
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  LAPTOP_BREAKPOINT,
  DESKTOP_BREAKPOINT,
} from '@/src/utils/constants';

export function distributeGroupsIntoColumns(
  groups: FooterLinksGroupStoryblok[],
  maxColumns: number = 5,
): FooterLinksGroupStoryblok[][] {
  if (!groups || groups.length === 0) return [];

  const groupsWithCounts = groups.map((group) => ({
    group,
    linkCount: group.links?.length || 0,
  }));

  const totalLinks = groupsWithCounts.reduce((sum, item) => sum + item.linkCount, 0);
  const targetLinksPerColumn = Math.ceil(totalLinks / maxColumns);

  const columns: FooterLinksGroupStoryblok[][] = [];
  let currentColumn: FooterLinksGroupStoryblok[] = [];
  let currentColumnLinkCount = 0;

  for (let i = 0; i < groupsWithCounts.length; i++) {
    const { group, linkCount } = groupsWithCounts[i];
    const remainingGroups = groupsWithCounts.length - i;
    const remainingColumns = maxColumns - columns.length;

    // Force a new column if we need to ensure we use all available columns
    const shouldStartNewColumn =
      currentColumn.length > 0 &&
      // We have more columns available than remaining groups
      ((remainingColumns > remainingGroups && columns.length < maxColumns - 1) ||
        // Current column exceeds target by too much
        (currentColumnLinkCount + linkCount > targetLinksPerColumn * 1.3 &&
          columns.length < maxColumns - 1) ||
        // We need to balance better - if current column already has reasonable content
        (currentColumnLinkCount >= targetLinksPerColumn * 0.7 &&
          columns.length < maxColumns - 1 &&
          remainingColumns > 1));

    if (shouldStartNewColumn) {
      columns.push(currentColumn);
      currentColumn = [];
      currentColumnLinkCount = 0;
    }

    currentColumn.push(group);
    currentColumnLinkCount += linkCount;
  }

  if (currentColumn.length > 0) {
    columns.push(currentColumn);
  }

  // If we have fewer columns than max and multiple groups per column, try to redistribute
  if (columns.length < maxColumns && columns.some((col) => col.length > 1)) {
    const flatGroups = columns.flat();
    const newColumns: FooterLinksGroupStoryblok[][] = [];
    const itemsPerColumn = Math.ceil(flatGroups.length / maxColumns);

    for (let i = 0; i < flatGroups.length; i += itemsPerColumn) {
      newColumns.push(flatGroups.slice(i, i + itemsPerColumn));
    }

    return newColumns.slice(0, maxColumns);
  }

  return columns;
}

export function getMaxColumnsForBreakpoint(): number {
  if (typeof window === 'undefined') return 5;

  const width = window.innerWidth;
  if (width <= MOBILE_BREAKPOINT) return 1;
  if (width <= TABLET_BREAKPOINT) return 2;
  if (width <= LAPTOP_BREAKPOINT) return 3;
  if (width <= DESKTOP_BREAKPOINT) return 4;
  return 5; // larger than desktop
}
