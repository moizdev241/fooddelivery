// Single-accent light theme, modeled after Apple's HIG system palette.
// The accent is a dark ink tone — used for buttons, links, active tab/segment
// state, and other actionable elements. Status colors below are a separate,
// purely semantic set (order status only), not a second brand accent.

export const PRIMARY = '#161618'; // near-black ink accent
export const PRIMARY_DARK = '#000000'; // pressed state
export const PRIMARY_TINT = '#F1F1F2'; // neutral light tint (avatars, chips)

export const BACKGROUND = '#FFFFFF';
export const SURFACE = '#F7F7F8'; // grouped-content background
export const BORDER = '#E5E5EA';

export const LABEL = '#1C1C1E'; // primary text
export const SECONDARY_LABEL = '#6E6E73'; // secondary text
export const TERTIARY_LABEL = '#AEAEB2'; // placeholder / disabled text

export const WHITE = '#FFFFFF';
export const BLACK = '#000000';

// Semantic — order status only, never used as the interactive accent.
export const ERROR = '#FF3B30';
export const SUCCESS = '#34C759';
export const WARNING = '#FF9500';
export const INFO = '#007AFF';
