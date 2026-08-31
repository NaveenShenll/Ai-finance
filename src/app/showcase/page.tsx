"use client";

import * as React from "react";
import Link from "next/link";
import {
  SparklesIcon,
  CopyIcon,
  RotateCcwIcon,
  SearchIcon,
  InfoIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Button,
  Input,
  Textarea,
  Label,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Skeleton,
  Separator,
  NavItem
} from "@/components/ui";

import {
  UserMessage,
  AIMessage,
  ReasoningIndicator,
  SourceCitation,
  AIActionButton,
  PromptSuggestionCard
} from "@/components/chat";

import {
  StockCard,
  FinancialMetric,
  MarketStatus,
  ChartContainer,
  NewsItem
} from "@/components/finance";

import { ModeToggle } from "@/components/shell";

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = React.useState("components");
  const [chartRange, setChartRange] = React.useState("1M");

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            F
          </div>
          <div>
            <h1 className="text-h4 font-bold">Finance AI Design System</h1>
            <p className="text-caption">Showcase & Component Playgrounds</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link
            href="/"
            className="text-xs font-medium text-text-secondary hover:text-foreground transition-colors"
          >
            Go to Landing Page &rarr;
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
        <div className="bg-surface border border-border rounded-container p-8 shadow-card flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-primary-subtle opacity-30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-ai-subtle opacity-20 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />
          
          <Badge variant="outline" className="w-fit border-primary/30 text-primary bg-primary-subtle/50">
            Interactive Design System Sandbox
          </Badge>
          <h2 className="text-display font-bold">Visual Design Foundations</h2>
          <p className="text-body max-w-2xl text-text-secondary">
            This dashboard demonstrates all CSS variables, typography tiers, micro-animations, standard inputs, alerts, AI-specific layouts, and financial cards available in our next-generation frontend. Use the theme control above (Light / Dark / System) to verify tokens.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-muted p-1 rounded-control mb-8">
            <TabsTrigger value="components" className="px-4 py-2 text-xs font-semibold rounded-input">UI Components & Styles</TabsTrigger>
            <TabsTrigger value="theme" className="px-4 py-2 text-xs font-semibold rounded-input">Theme System</TabsTrigger>
            <TabsTrigger value="ai-chat" className="px-4 py-2 text-xs font-semibold rounded-input">AI Message Showcase</TabsTrigger>
            <TabsTrigger value="finance" className="px-4 py-2 text-xs font-semibold rounded-input">Financial Modules</TabsTrigger>
            <TabsTrigger value="states" className="px-4 py-2 text-xs font-semibold rounded-input">Loading & Error States</TabsTrigger>
          </TabsList>

          {/* ==================================================
              TAB 1: BASE UI COMPONENTS
              ================================================== */}
          <TabsContent value="components" className="flex flex-col gap-10">
            {/* Design Tokens & Colors */}
            <section className="flex flex-col gap-4">
              <h3 className="text-h3 border-b border-border pb-2">Color Palettes & Variables</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                <ColorSwatch label="Background" variable="var(--background)" bgClass="bg-background" textClass="text-foreground" border />
                <ColorSwatch label="Surface" variable="var(--surface)" bgClass="bg-surface" textClass="text-foreground" border />
                <ColorSwatch label="Surface Elevated" variable="var(--surface-elevated)" bgClass="bg-surface-elevated" textClass="text-foreground" border />
                <ColorSwatch label="Primary" variable="var(--primary)" bgClass="bg-primary" textClass="text-primary-foreground" />
                <ColorSwatch label="Secondary" variable="var(--secondary)" bgClass="bg-secondary" textClass="text-secondary-foreground" border />
                <ColorSwatch label="Muted" variable="var(--muted)" bgClass="bg-muted" textClass="text-text-secondary" border />
                <ColorSwatch label="Success" variable="var(--success)" bgClass="bg-success" textClass="text-white" />
                <ColorSwatch label="Warning" variable="var(--warning)" bgClass="bg-warning" textClass="text-white" />
                <ColorSwatch label="Error / Destructive" variable="var(--error)" bgClass="bg-error" textClass="text-white" />
                <ColorSwatch label="Info" variable="var(--info)" bgClass="bg-info" textClass="text-white" />
                <ColorSwatch label="AI Theme" variable="var(--ai)" bgClass="bg-ai" textClass="text-white" />
                <ColorSwatch label="Sidebar" variable="var(--sidebar)" bgClass="bg-sidebar" textClass="text-sidebar-foreground" border />
              </div>
            </section>

            {/* Typography */}
            <section className="flex flex-col gap-4">
              <h3 className="text-h3 border-b border-border pb-2">Typography Hierarchy</h3>
              <div className="bg-surface border border-border rounded-card p-6 flex flex-col gap-6">
                <div>
                  <span className="text-label mb-1 block">.text-display</span>
                  <p className="text-display font-bold">54.30% Surge</p>
                </div>
                <div>
                  <span className="text-label mb-1 block">.text-h1</span>
                  <p className="text-h1">AI Market Report</p>
                </div>
                <div>
                  <span className="text-label mb-1 block">.text-h2</span>
                  <p className="text-h2">Corporate Valuations</p>
                </div>
                <div>
                  <span className="text-label mb-1 block">.text-h3</span>
                  <p className="text-h3">Portfolio Allocations</p>
                </div>
                <div>
                  <span className="text-label mb-1 block">.text-h4</span>
                  <p className="text-h4">Interactive Tooltip Metrics</p>
                </div>
                <div>
                  <span className="text-label mb-1 block">.text-body</span>
                  <p className="text-body text-text-secondary">
                    Standard descriptive copy detailing financial transactions. Built using the native variable sans-serif font stack.
                  </p>
                </div>
                <div>
                  <span className="text-label mb-1 block">.text-body-sm</span>
                  <p className="text-body-sm">
                    Secondary annotations for details and sidebar updates.
                  </p>
                </div>
                <div>
                  <span className="text-label mb-1 block">.text-financial</span>
                  <p className="text-financial text-lg">$1,284,952.48 (+4.23%)</p>
                </div>
              </div>
            </section>

            {/* Buttons */}
            <section className="flex flex-col gap-4">
              <h3 className="text-h3 border-b border-border pb-2">Button Variants & Sizes</h3>
              <div className="bg-surface border border-border rounded-card p-6 flex flex-col gap-6">
                {/* Variants Row */}
                <div className="flex flex-col gap-3">
                  <span className="text-label">Variants</span>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default">Primary / Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost Link</Button>
                    <Button variant="destructive">Destructive Action</Button>
                  </div>
                </div>

                {/* Sizes Row */}
                <div className="flex flex-col gap-3">
                  <span className="text-label">Sizes</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="lg">Large Scale</Button>
                    <Button size="default">Default Size</Button>
                    <Button size="sm">Small Action</Button>
                    <Button size="icon" aria-label="Search"><SearchIcon className="size-4" /></Button>
                    <Button size="icon-sm" aria-label="Info"><InfoIcon className="size-3.5" /></Button>
                  </div>
                </div>

                {/* States Row */}
                <div className="flex flex-col gap-3">
                  <span className="text-label">States</span>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Disabled Primary</Button>
                    <Button variant="outline" disabled>Disabled Outline</Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Inputs & Form Elements */}
            <section className="flex flex-col gap-4">
              <h3 className="text-h3 border-b border-border pb-2">Inputs & Form Controls</h3>
              <div className="bg-surface border border-border rounded-card p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="search-ticker">Stock Ticker Lookup</Label>
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
                      <Input id="search-ticker" placeholder="Search AAPL, TSLA, NVDA..." className="pl-9" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="disabled-input">Disabled Field</Label>
                    <Input id="disabled-input" placeholder="Field is locked" disabled />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="chat-text">AI Financial Analysis Prompt</Label>
                    <Textarea 
                      id="chat-text" 
                      placeholder="Ask a question about asset diversification or market sentiment..." 
                      className="min-h-24 resize-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Navigation & Sidebar Elements */}
            <section className="flex flex-col gap-4">
              <h3 className="text-h3 border-b border-border pb-2">Navigation & Avatar Structures</h3>
              <div className="bg-surface border border-border rounded-card p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nav Items */}
                <div className="flex flex-col gap-3">
                  <span className="text-label">Navigation Mentions (.dark integration)</span>
                  <div className="flex flex-col gap-1 max-w-xs border border-border rounded-input p-2 bg-background">
                    <NavItem href="#" active icon={<SparklesIcon className="size-4" />}>
                      AI Copilot Terminal
                    </NavItem>
                    <NavItem href="#" icon={<TrendingUpIcon className="size-4" />}>
                      Market Watchlists
                    </NavItem>
                    <NavItem href="#" count={12} icon={<InfoIcon className="size-4" />}>
                      Earnings Alerts
                    </NavItem>
                  </div>
                </div>

                {/* Avatars */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-label">Avatar Options</span>
                    <div className="flex items-center gap-4">
                      {/* Standard with fallback */}
                      <Avatar>
                        <AvatarFallback className="bg-primary-subtle text-primary font-bold">NS</AvatarFallback>
                      </Avatar>
                      {/* Avatar with AI badge */}
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-ai-subtle text-ai">
                            <SparklesIcon className="size-4" />
                          </AvatarFallback>
                        </Avatar>
                        <AvatarBadge className="bg-success" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-label">Group Stack</span>
                    <AvatarGroup>
                      <Avatar>
                        <AvatarFallback className="bg-primary-subtle text-primary">A</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback className="bg-info-subtle text-info">B</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback className="bg-success-subtle text-success">C</AvatarFallback>
                      </Avatar>
                      <AvatarGroupCount>+4</AvatarGroupCount>
                    </AvatarGroup>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* ==================================================
              TAB: THEME SYSTEM (Light / Dark / System)
              ================================================== */}
          <TabsContent value="theme" className="flex flex-col gap-6">
            <section className="flex flex-col gap-2">
              <h3 className="text-h3 border-b border-border pb-2">Light / Dark / System</h3>
              <p className="text-body max-w-2xl text-text-secondary">
                Theme is applied via a single <code className="text-xs font-mono">dark</code> class on{" "}
                <code className="text-xs font-mono">&lt;html&gt;</code> (managed by{" "}
                <code className="text-xs font-mono">next-themes</code>), with every color sourced from the semantic
                CSS variables in <code className="text-xs font-mono">globals.css</code> — never hardcoded per
                component. Switch themes with the control in the header; the columns below force each palette
                side-by-side using the same application components, for comparison only.
              </p>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThemePreviewColumn label="Light" forceClass="light" />
              <ThemePreviewColumn label="Dark" forceClass="dark" />
            </div>
          </TabsContent>

          {/* ==================================================
              TAB 2: AI MESSAGING SHOWCASE
              ================================================== */}
          <TabsContent value="ai-chat" className="flex flex-col gap-8">
            <div className="bg-surface border border-border rounded-container p-6 flex flex-col gap-8">
              {/* User Message */}
              <div className="flex flex-col gap-2">
                <span className="text-label">User Query bubble</span>
                <div className="border border-border bg-background/50 rounded-card p-4">
                  <UserMessage 
                    content="Evaluate Apple (AAPL) cash-flow strength and outline risks concerning regulatory lawsuits in Q3." 
                    timestamp="3:15 PM"
                  />
                </div>
              </div>

              {/* AI Streaming Response */}
              <div className="flex flex-col gap-2">
                <span className="text-label">AI Response (Streaming / Thinking state)</span>
                <div className="border border-border bg-background/50 rounded-card p-4 flex flex-col gap-3">
                  <ReasoningIndicator label="Synthesizing SEC statements and reports" />
                  <AIMessage 
                    content="Evaluating AAPL balance sheet metrics..." 
                    isStreaming 
                  />
                </div>
              </div>

              {/* Complete AI Response */}
              <div className="flex flex-col gap-2">
                <span className="text-label">AI Finished Response (With Sources & Suggested Next Prompts)</span>
                <div className="border border-border bg-background/50 rounded-card p-4">
                  <AIMessage 
                    content="Apple Inc. (AAPL) exhibits exceptionally robust cash flow parameters. As of their latest filing, Apple generated over $28.2 billion in cash from operations. However, key headwinds persist regarding the DOJ antitrust lawsuit focusing on iPhone monetization restrictions and global hardware margin compression."
                    timestamp="3:16 PM"
                    actions={
                      <div className="flex items-center gap-1.5">
                        <AIActionButton label="Copy analysis" icon={<CopyIcon className="size-3.5" />} />
                        <AIActionButton label="Regenerate" icon={<RotateCcwIcon className="size-3.5" />} />
                      </div>
                    }
                    sources={
                      <>
                        <SourceCitation index={1} title="Apple Q3 10-Q SEC filing" sourceName="SEC.gov" />
                        <SourceCitation index={2} title="DOJ Antitrust Case Files Summary" sourceName="Justice.gov" />
                      </>
                    }
                    suggestions={
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 w-full max-w-lg">
                        <PromptSuggestionCard label="Review gross margin parameters" description="Detailed breakdown of Apple services margins" />
                        <PromptSuggestionCard label="Compare with Microsoft (MSFT)" description="Analyze cash flow against major tech competitors" />
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ==================================================
              TAB 3: FINANCIAL DATA MODULES
              ================================================== */}
          <TabsContent value="finance" className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Stocks & Market Sessions */}
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-label">Active Trading Sessions</span>
                  <div className="bg-surface border border-border rounded-card p-4 flex flex-wrap gap-2">
                    <MarketStatus status="open" />
                    <MarketStatus status="closed" />
                    <MarketStatus status="pre-market" />
                    <MarketStatus status="after-hours" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-label">Live Quote Components (StockCard)</span>
                  <div className="flex flex-col gap-3">
                    <StockCard
                      stock={{ symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 1.43, changePercent: 0.79 }}
                      history={[180.5, 181.2, 180.9, 182.1, 181.8, 182.52]}
                      interactive
                    />
                    <StockCard
                      stock={{ symbol: "TSLA", name: "Tesla, Inc.", price: 175.34, change: -5.46, changePercent: -3.02 }}
                      history={[184.2, 182.1, 180.8, 178.5, 177.2, 175.34]}
                      interactive
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Chart & Metrics */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-label">Market Charts Shell & Timeframes</span>
                  <ChartContainer 
                    title="NVIDIA Corporation (NVDA)" 
                    subtitle="Daily Closing Trend Chart"
                    activeRange={chartRange}
                    onRangeChange={setChartRange}
                  >
                    {/* Inner custom graphic representing simple mock SVG chart */}
                    <div className="w-full h-full px-8 py-4 flex flex-col justify-end">
                      <svg viewBox="0 0 400 120" className="w-full h-32 overflow-visible">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0"/>
                          </linearGradient>
                        </defs>
                        <path 
                          d="M0,100 C50,80 80,95 120,60 C160,25 200,45 250,15 C300,-15 350,5 400,-10 L400,120 L0,120 Z" 
                          fill="url(#chartGrad)"
                        />
                        <path 
                          d="M0,100 C50,80 80,95 120,60 C160,25 200,45 250,15 C300,-15 350,5 400,-10" 
                          fill="none" 
                          stroke="var(--primary)" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                        />
                        {/* Dot indicator */}
                        <circle cx="400" cy="-10" r="4.5" fill="var(--primary)" className="animate-pulse" />
                      </svg>
                      <div className="flex items-center justify-between text-caption mt-2 border-t border-border pt-1">
                        <span>Jul 28</span>
                        <span>Aug 04</span>
                        <span>Aug 11</span>
                        <span>Aug 18</span>
                        <span>Aug 28 (Current)</span>
                      </div>
                    </div>
                  </ChartContainer>
                </div>

                {/* Metrics Matrix */}
                <div className="flex flex-col gap-2">
                  <span className="text-label">Company Metrics Overview</span>
                  <div className="bg-surface border border-border rounded-card p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                    <FinancialMetric label="Market Cap" value="$3.15T" change="+$12.4B" changeTone="positive" />
                    <FinancialMetric label="P/E Ratio" value="68.20" change="-1.20" changeTone="negative" />
                    <FinancialMetric label="Daily Volume" value="184.5M" description="30-day average: 154.2M" />
                    <FinancialMetric label="Gross Margin" value="75.12%" change="+0.45%" changeTone="positive" />
                  </div>
                </div>

                {/* News Cards */}
                <div className="flex flex-col gap-2">
                  <span className="text-label">Contextual News Tickers</span>
                  <div className="bg-surface border border-border rounded-card p-3 flex flex-col gap-1">
                    <NewsItem 
                      source="Bloomberg Finance" 
                      headline="NVIDIA Blackwell Chips Face Massive Orders Amid Supply Constraints" 
                      timestamp="2 hours ago" 
                      category="Semiconductors"
                    />
                    <Separator />
                    <NewsItem 
                      source="Reuters Markets" 
                      headline="Federal Reserve Hints at Slower Rate Cuts as Inflation Metric Stagnates" 
                      timestamp="4 hours ago" 
                      category="Macroeconomics"
                    />
                  </div>
                </div>
              </div>

            </div>
          </TabsContent>

          {/* ==================================================
              TAB 4: FEEDBACK STATES (LOADING/ERROR)
              ================================================== */}
          <TabsContent value="states" className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Skeletons and Loadings */}
              <div className="flex flex-col gap-4">
                <h4 className="text-h4">Skeleton Loading Cards</h4>
                <div className="bg-surface border border-border rounded-card p-6 flex flex-col gap-4">
                  {/* Stock Card Skeleton */}
                  <div className="border border-border p-4 rounded-card flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1.5">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-3 w-28" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <div className="flex justify-between items-end">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>

                  {/* List Skeleton */}
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[75%]" />
                  </div>
                </div>
              </div>

              {/* Error and Alert States */}
              <div className="flex flex-col gap-4">
                <h4 className="text-h4">System & Transaction Error Alerts</h4>
                <div className="bg-surface border border-border rounded-card p-6 flex flex-col gap-4">
                  {/* Alert Error Box */}
                  <div className="flex items-start gap-3 border border-error-subtle bg-error-subtle/40 rounded-input p-4 text-error">
                    <AlertTriangleIcon className="size-5 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1 text-sm">
                      <span className="font-semibold">Financial API Network Disruption</span>
                      <p className="text-xs text-error/90 leading-relaxed">
                        Unable to pull historical candlestick patterns for AAPL. Please check your network connectivity or try again in a few minutes.
                      </p>
                      <Button variant="destructive" size="sm" className="w-fit mt-2">
                        Reconnect API Server
                      </Button>
                    </div>
                  </div>

                  {/* Warning Inline Box */}
                  <div className="flex items-start gap-2.5 border border-warning-subtle bg-warning-subtle/50 rounded-input p-3 text-warning">
                    <InfoIcon className="size-4 shrink-0 mt-0.5" />
                    <span className="text-xs leading-normal">
                      Disclaimer: AI insights are mock demonstrations only and do not represent actual trading recommendations.
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

/**
 * Forces one palette (`.light` / `.dark`) on a subtree regardless of the
 * page's actual active theme, so both can be compared side-by-side. Renders
 * real application components — not theme-specific duplicates — per
 * "Design System Showcase" phase requirements.
 */
function ThemePreviewColumn({ label, forceClass }: { label: string; forceClass: "light" | "dark" }) {
  return (
    <div className={cn(forceClass, "flex flex-col gap-4 rounded-container border border-border bg-background p-5 text-foreground")}>
      <span className="text-label">{label}</span>

      <div className="flex flex-wrap gap-2">
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">Secondary</Button>
        <Button size="sm" variant="outline">Outline</Button>
        <Button size="sm" variant="destructive">Destructive</Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Badge variant="success">Success</Badge>
        <Badge variant="negative">Negative</Badge>
        <Badge variant="ai">AI</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>

      <Input placeholder="Search AAPL, TSLA, NVDA..." />

      <StockCard
        stock={{ symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 1.43, changePercent: 0.79 }}
        history={[180.5, 181.2, 180.9, 182.1, 181.8, 182.52]}
      />

      <div className="rounded-card border border-border bg-surface p-4 grid grid-cols-2 gap-4">
        <FinancialMetric label="Market Cap" value="$3.15T" change="+$12.4B" changeTone="positive" />
        <FinancialMetric label="P/E Ratio" value="68.20" change="-1.20" changeTone="negative" />
      </div>

      <div className="rounded-card border border-border bg-surface p-4">
        <AIMessage content="AAPL cash flow remains robust, supported by Services growth and disciplined buybacks." />
      </div>

      <div className="flex flex-col gap-2 rounded-card border border-border bg-surface p-4">
        <Skeleton className="h-3.5 w-[80%]" />
        <Skeleton className="h-3.5 w-[55%]" />
        <Skeleton className="h-3.5 w-[65%]" />
      </div>

      <div className="flex items-start gap-2.5 rounded-input border border-error-subtle bg-error-subtle/60 p-3 text-error">
        <AlertTriangleIcon className="size-4 shrink-0 mt-0.5" />
        <span className="text-xs leading-normal">Something went wrong while generating your answer.</span>
      </div>
    </div>
  );
}

/* Swatch Component Helper */
interface ColorSwatchProps {
  label: string;
  variable: string;
  bgClass: string;
  textClass: string;
  border?: boolean;
}

function ColorSwatch({ label, variable, bgClass, textClass, border }: ColorSwatchProps) {
  return (
    <div className={cn(
      "flex flex-col rounded-input overflow-hidden bg-surface border shadow-subtle",
      border ? "border-border" : "border-transparent"
    )}>
      <div className={cn("h-16 w-full flex items-center justify-center font-bold text-xs uppercase", bgClass, textClass)}>
        Aa
      </div>
      <div className="p-2.5 flex flex-col gap-0.5 bg-surface text-left">
        <span className="text-caption truncate text-foreground font-semibold">{label}</span>
        <code className="text-[10px] text-text-muted truncate font-mono">{variable}</code>
      </div>
    </div>
  );
}
