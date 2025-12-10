export const RTP_PERCENTAGE = "98.5";
export const VOLATILITY_LEVEL = "High";

// Symbols as defined in SlotMachine.tsx: ["🍒", "🍋", "🍉", "💎", "🍀"]
// We want "High Volatility", meaning wins (especially high value ones) are rare.
// Diamond (💎) is the Jackpot symbol (index 3).

// Weights for each symbol (Arbitrary relative units)
// Higher weight = more frequent appearance.
const SYMBOL_WEIGHTS = [
    { index: 0, symbol: "🍒", weight: 40 }, // Strawberry - Common
    { index: 1, symbol: "🍋", weight: 30 }, // Lemon - Common
    { index: 2, symbol: "🍉", weight: 20 }, // Watermelon - Uncommon
    { index: 4, symbol: "🍀", weight: 15 }, // Clover - Rare
    { index: 3, symbol: "💎", weight: 5 },  // Diamond - Very Rare (Jackpot)
];

const TOTAL_WEIGHT = SYMBOL_WEIGHTS.reduce((sum, item) => sum + item.weight, 0);

/**
 * Returns a random symbol index based on weighted probability.
 * This simulates a mechanical reel strip layout where some symbols appear more often.
 */
export function spinReel(): number {
    let random = Math.random() * TOTAL_WEIGHT;

    for (const item of SYMBOL_WEIGHTS) {
        if (random < item.weight) {
            return item.index;
        }
        random -= item.weight;
    }

    // Fallback (should theoretically not match unless floating point error)
    return 0;
}
