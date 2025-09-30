'use client';

import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import clsx from 'clsx';
import styles from './styles.module.scss';

import type {
  HeaderSublinksGroupStoryblok,
  HeaderSublinkStoryblok,
  HeaderContactUsBannerStoryblok,
  HeaderFeaturedArticlesStoryblok,
  LinkStoryblok,
} from '@/src/generated/sb';

type SublinkType = HeaderSublinkStoryblok | HeaderContactUsBannerStoryblok | HeaderFeaturedArticlesStoryblok;

interface ColumnGroup {
  groupingType: string;
  sublinks: SublinkType[];
  isPartial?: boolean;
  partIndex?: number;
}

function distributeGroupsToColumns(groups: [string, SublinkType[]][]) {
  const totalLinks = groups.reduce((sum, [, sublinks]) => sum + sublinks.length, 0);
  const targetPerColumn = Math.ceil(totalLinks / 3);

  const columns: ColumnGroup[][] = [[], [], []];
  const columnCounts = [0, 0, 0];

  for (const [groupingType, sublinks] of groups) {
    const groupSize = sublinks.length;

    // If group is large enough to span multiple columns
    if (groupSize >= targetPerColumn * 1.2) {
      // Calculate how many columns this group should span
      const columnsToSpan = Math.min(3, Math.ceil(groupSize / targetPerColumn));

      // Find consecutive columns with least total content
      let bestStart = 0;
      let bestTotalCount = Infinity;

      for (let start = 0; start <= 3 - columnsToSpan; start++) {
        let totalCount = 0;
        for (let j = 0; j < columnsToSpan; j++) {
          totalCount += columnCounts[start + j];
        }
        if (totalCount < bestTotalCount) {
          bestTotalCount = totalCount;
          bestStart = start;
        }
      }

      // Split the group's links across the columns
      const linksPerColumn = Math.ceil(groupSize / columnsToSpan);
      for (let i = 0; i < columnsToSpan; i++) {
        const columnIndex = bestStart + i;
        if (columnIndex < 3) {
          const startIndex = i * linksPerColumn;
          const endIndex = Math.min(startIndex + linksPerColumn, groupSize);
          const columnSublinks = sublinks.slice(startIndex, endIndex);

          if (columnSublinks.length > 0) {
            columns[columnIndex].push({
              groupingType,
              sublinks: columnSublinks,
              isPartial: columnsToSpan > 1,
              partIndex: i,
            });
            columnCounts[columnIndex] += columnSublinks.length;
          }
        }
      }
    } else {
      // Find the column with the least links
      let bestColumn = 0;
      for (let i = 1; i < 3; i++) {
        if (columnCounts[i] < columnCounts[bestColumn]) {
          bestColumn = i;
        }
      }

      // Add entire group to the best column
      columns[bestColumn].push({
        groupingType,
        sublinks,
        isPartial: false,
      });
      columnCounts[bestColumn] += groupSize;
    }
  }

  return columns;
}

export default function HeaderSublinksGroup({
  blok,
  hasMultipleGroups = false,
  bottomLink,
  isMobile = false,
}: {
  blok: HeaderSublinksGroupStoryblok;
  hasMultipleGroups?: boolean;
  bottomLink?: LinkStoryblok[];
  isMobile?: boolean;
}) {
  const groupedSublinks = !!blok.sublinks?.length
    ? blok.sublinks.reduce(
        (groups, sublinkBlok) => {
          const groupingType = sublinkBlok.groupingType || 'default';
          if (!groups[groupingType]) {
            groups[groupingType] = [];
          }
          groups[groupingType].push(sublinkBlok);
          return groups;
        },
        {} as Record<string, typeof blok.sublinks>,
      )
    : {};

  const groupEntries = Object.entries(groupedSublinks);
  const hasMultipleGroupTypes = groupEntries.length > 1;

  const columns = distributeGroupsToColumns(groupEntries as [string, SublinkType[]][]);

  // Mobile version - simplified layout with group titles
  if (isMobile) {
    return (
      <div className={styles.mobileSublinksGroup} {...storyblokEditable(blok)}>
        {!!groupEntries?.length ? (
          // Show grouped links with titles
          <div className={styles.mobileSublinks}>
            {groupEntries.map(([groupingType, sublinks]) => (
              <div key={groupingType} className={styles.mobileGroup}>
                {groupingType !== 'default' && (
                  <h4 className={styles.groupTitle}>{groupingType}</h4>
                )}
                <div className={styles.mobileGroupLinks}>
                  {sublinks.map((sublinkBlok) => (
                    <StoryblokComponent blok={sublinkBlok} key={sublinkBlok._uid} isMobile={true} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Fallback for simple links without grouping
          !!blok.sublinks?.length && (
            <div className={styles.mobileSublinks}>
              {blok.sublinks.map((sublinkBlok) => (
                <StoryblokComponent blok={sublinkBlok} key={sublinkBlok._uid} isMobile={true} />
              ))}
            </div>
          )
        )}

        {!!bottomLink?.length && (
          <div className={styles.mobileBottomLinks}>
            {bottomLink.map((linkBlok) => (
              <StoryblokComponent blok={linkBlok} key={linkBlok._uid} isMobile={true} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div
      className={clsx(styles.headerSublinksGroup, hasMultipleGroups && styles.hasMultipleGroups)}
      {...storyblokEditable(blok)}
    >
      {hasMultipleGroups
        ? // When hasMultipleGroups is true, use simple 2-column grid without grouping
          !!blok.sublinks?.length && (
            <div className={styles.sublinks}>
              {blok.sublinks.map((sublinkBlok) => (
                <StoryblokComponent blok={sublinkBlok} key={sublinkBlok._uid} />
              ))}
            </div>
          )
        : // When hasMultipleGroups is false, use the column grouping logic
          !!groupEntries?.length && (
            <div className={styles.sublinks}>
              <div className={styles.columnsWrapper}>
                {columns.map((columnGroups, columnIndex) => (
                  <div key={columnIndex} className={styles.column}>
                    {columnGroups.map((group) => (
                      <div
                        key={`${columnIndex}-${group.groupingType}-${group.partIndex || 0}`}
                        className={clsx(styles.sublinkGroup, group.isPartial && styles.partialGroup)}
                      >
                        {(!group.isPartial || group.partIndex === 0) &&
                        group.groupingType !== 'default' ? (
                          <h4 className={styles.groupTitle}>{group.groupingType}</h4>
                        ) : hasMultipleGroupTypes ? (
                          <div className={styles.titleSpacer}></div>
                        ) : null}
                        <div className={styles.linksContainer}>
                          {group.sublinks.map((sublinkBlok) => (
                            <StoryblokComponent blok={sublinkBlok} key={sublinkBlok._uid} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {!!bottomLink?.length && (
                <>
                  <div className={styles.divider} />
                  <div className={styles.bottomLinks}>
                    {bottomLink.map((linkBlok) => (
                      <div key={linkBlok._uid} className={styles.bottomLinkItem}>
                        <StoryblokComponent blok={linkBlok} />
                        <svg
                          width="7"
                          height="12"
                          viewBox="0 0 7 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L6 6L1 11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

      {!!blok.sidebar?.length && (
        <div className={styles.sidebar}>
          {blok.sidebar.map((sidebarBlok) => (
            <StoryblokComponent blok={sidebarBlok} key={sidebarBlok._uid} />
          ))}
        </div>
      )}
    </div>
  );
}
