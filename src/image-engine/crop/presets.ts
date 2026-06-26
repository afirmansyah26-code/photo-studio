export interface FaceGuidePreset {
  topMarginPercent: number;
  eyeLinePercent: number;
  chinLimitPercent: number;
  headWidthPercent: number;
}

/**
 * Standard passport and school photo proportions.
 */
export const STANDARD_PASSPORT_PRESET: FaceGuidePreset = {
  topMarginPercent: 0.10, // Top of hair is ~10% from the top edge
  eyeLinePercent: 0.45,   // Eyes are ~45% from the top edge
  chinLimitPercent: 0.85, // Chin ends ~85% from the top edge
  headWidthPercent: 0.60, // Head occupies ~60% of the horizontal width
};
