// Finance-specific visual foundations. Presentational only — no live API
// connections, and no dependency on chat state. See src/lib/finance and
// src/data/mock-finance-data.ts for the (mock) data layer.
export { StockCard } from "./stock-card";
export type { StockCardProps } from "./stock-card";

export { FinancialMetric } from "./financial-metric";
export type { FinancialMetricProps } from "./financial-metric";

export { FinancialMetrics } from "./financial-metrics";
export type { FinancialMetricsProps } from "./financial-metrics";

export { MarketStatus } from "./market-status";
export type { MarketStatusProps, MarketStatusState } from "./market-status";

export { ChartContainer } from "./chart-container";
export type { ChartContainerProps } from "./chart-container";

export { PriceChart } from "./price-chart";
export type { PriceChartProps } from "./price-chart";

export { CompanyOverview } from "./company-overview";
export type { CompanyOverviewProps } from "./company-overview";

export { NewsItem } from "./news-item";
export type { NewsItemProps } from "./news-item";

export { NewsSection } from "./news-section";
export type { NewsSectionProps } from "./news-section";

export { Sparkline } from "./sparkline";
export type { SparklineProps } from "./sparkline";
