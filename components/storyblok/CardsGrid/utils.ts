import { CardsGridStoryblok } from '@/src/generated/sb';

// Helper function to determine LinkIconCard layout
export function getLinkIconCardLayout(
  containerLayout: CardsGridStoryblok['layout'],
  index: number,
): 'horizontal' | 'vertical' | 'vertical-reverse' {
  if (containerLayout === 'two-one-cards') {
    // Row calculation: cards 1-2 are row 1, card 3 is row 2, cards 4-5 are row 3, etc.
    const rowNumber = index < 2 ? 1 : Math.ceil((index - 2) / 3) + 2;
    // Odd rows: vertical, even rows: horizontal
    return rowNumber % 2 === 1 ? 'vertical' : 'horizontal';
  }
  if (containerLayout === 'two-one-one-two') {
    // Pattern: 2-1 (row 1), 1-2 (row 2), repeating
    const position = index % 4;
    // Only card at position 0 is horizontal (spans 2 columns)
    // Cards at positions 1, 2, 3 are vertical-reverse
    return position === 0 ? 'horizontal' : 'vertical-reverse';
  }
  if (containerLayout === 'one-one-two') {
    const position = index % 4;
    // First card (position 0): horizontal (spans 2 columns)
    // Second, third and fourth cards (positions 1, 2, 3): vertical-reverse
    return position === 0 ? 'horizontal' : 'vertical-reverse';
  }
  return 'horizontal';
}

// Helper function to determine ImageCard layout
export function getImageCardLayout(
  containerLayout: CardsGridStoryblok['layout'],
  index: number,
): 'horizontal' | 'vertical' | 'vertical-reverse' {
  switch (containerLayout) {
    case 'one-card':
      // Single card layout is always horizontal
      return 'horizontal';
    case 'one-one-two': {
      const position = index % 4;
      // First card (position 0): horizontal (spans 2 columns)
      // Second, third and fourth cards (positions 1, 2, 3): vertical-reverse
      return position === 0 ? 'horizontal' : 'vertical-reverse';
    }
    case 'two-one-one-one-two-one': {
      const position = index % 6;
      // Cards at positions 0 and 4 span 2 columns (horizontal)
      // Cards at positions 1, 2, 3, 5 span 1 column (vertical)
      return position === 0 || position === 4 ? 'horizontal' : 'vertical-reverse';
    }
    case 'three-two-cards': {
      const position = index % 5;
      // First row (positions 0, 1, 2): vertical-reverse cards
      // Second row (positions 3, 4): horizontal cards
      return position <= 2 ? 'vertical-reverse' : 'horizontal';
    }
    case 'two-three-cards': {
      const position = index % 5;
      // First two cards (positions 0, 1): horizontal (span 3 columns each)
      // Cards 3, 4, 5 (positions 2, 3, 4): vertical-reverse (span 2 columns each)
      return position < 2 ? 'horizontal' : 'vertical-reverse';
    }
    case 'two-one-one-two': {
      const position = index % 4;
      // Only card at position 0 is horizontal (spans 2 columns)
      // Cards at positions 1, 2, 3 are vertical-reverse
      return position === 0 ? 'horizontal' : 'vertical-reverse';
    }
    case 'two-one-one-one-one-two':
    case 'two-cards':
    case 'two-cards-max':
      // All cards are vertical-reverse in these layouts
      return 'vertical-reverse';
    case 'three-cards': {
      // Odd rows: vertical, even rows: vertical-reverse
      const rowNumber = Math.floor(index / 3) + 1;
      return rowNumber % 2 === 1 ? 'vertical' : 'vertical-reverse';
    }
    default:
      return 'horizontal';
  }
}
