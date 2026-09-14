/**
 * Configuration data for macOS Notification Center & Widgets.
 */
export const WIDGETS_CONFIG = {
  weather: {
    city: "Cupertino",
    temperature: "18°",
    condition: "Clear",
    high: "26°",
    low: "12°",
    icon: "🌙",
  },
  stocks: [
    { symbol: "AAPL", price: "232.40", change: "+1.85%", up: true },
    { symbol: "REACT", price: "192.80", change: "+4.20%", up: true },
    { symbol: "GSAP", price: "135.50", change: "+8.92%", up: true },
  ],
  devReport: {
    title: "Weekly Report Available",
    timestamp: "Yesterday, 9:24 AM",
    description: "Last week your coding screen time was 38h, with React & GSAP averaging 5.5 hours a day.",
  },
};
