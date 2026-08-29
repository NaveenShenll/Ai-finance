"use client";

import * as React from "react";
import {
  CopyIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  RefreshCwIcon,
  MenuIcon,
  SendIcon,
  BarChart3Icon,
  ClockIcon,
  SettingsIcon,
  BellIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Avatar,
  AvatarFallback,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Skeleton,
  Separator,
  NavItem,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui";
import {
  UserMessage,
  AIMessage,
  ReasoningIndicator,
  SourceCitation,
  AIActionButton,
  PromptSuggestionCard,
} from "@/components/chat";
import {
  StockCard,
  FinancialMetric,
  MarketStatus,
  ChartContainer,
  NewsItem,
} from "@/components/finance";
import { Sidebar, SidebarDrawer } from "@/components/sidebar";
import { MOCK_STOCKS, generateMockHistory } from "@/data/mock-stocks";
import { MOCK_NEWS } from "@/data/mock-news";

const COLOR_SWATCHES = [
  { name: "Background", varName: "--background", className: "bg-background" },
  { name: "Surface", varName: "--surface", className: "bg-surface" },
  { name: "Surface elevated", varName: "--surface-elevated", className: "bg-surface-elevated" },
  { name: "Primary", varName: "--primary", className: "bg-primary" },
  { name: "Primary hover", varName: "--primary-hover", className: "bg-primary-hover" },
  { name: "Primary subtle", varName: "--primary-subtle", className: "bg-primary-subtle" },
  { name: "Text primary", varName: "--foreground", className: "bg-text-primary" },
  { name: "Text secondary", varName: "--text-secondary", className: "bg-text-secondary" },
  { name: "Text muted", varName: "--text-muted", className: "bg-text-muted" },
  { name: "Border", varName: "--border", className: "bg-border" },
  { name: "Border strong", varName: "--border-strong", className: "bg-border-strong" },
  { name: "Success", varName: "--success", className: "bg-success" },
  { name: "Warning", varName: "--warning", className: "bg-warning" },
  { name: "Error", varName: "--error", className: "bg-error" },
  { name: "Info", varName: "--info", className: "bg-info" },
];

const FINANCE_SWATCHES = [
  { name: "Positive", className: "bg-positive" },
  { name: "Negative", className: "bg-negative" },
  { name: "Neutral", className: "bg-neutral" },
  { name: "AI accent", className: "bg-ai" },
];

const RADIUS_TOKENS = [
  { name: "control", className: "rounded-control" },
  { name: "input", className: "rounded-input" },
  { name: "button", className: "rounded-button" },
  { name: "card", className: "rounded-card" },
  { name: "container", className: "rounded-container" },
  { name: "modal", className: "rounded-modal" },
];

const SHADOW_TOKENS = [
  { name: "subtle", className: "shadow-subtle" },
  { name: "card", className: "shadow-card" },
  { name: "elevated", className: "shadow-elevated" },
  { name: "modal", className: "shadow-modal" },
];

// Static display strings for the news demo — MOCK_NEWS timestamps are
// computed relative to Date.now() at import time, which would otherwise
// differ between server and client render and cause a hydration mismatch.
const NEWS_TIMESTAMP_LABELS = ["3h ago", "6h ago", "12h ago"];

const SPACING_SCALE = [
  { token: "1", px: 4 },
  { token: "2", px: 8 },
  { token: "3", px: 12 },
  { token: "4", px: 16 },
  { token: "5", px: 20 },
  { token: "6", px: 24 },
  { token: "8", px: 32 },
  { token: "10", px: 40 },
  { token: "12", px: 48 },
  { token: "16", px: 64 },
];

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="flex flex-col gap-5 py-10 first:pt-0">
      <div className="flex flex-col gap-1">
        <h2 className="text-h2">{title}</h2>
        {description && <p className="text-body-sm max-w-2xl">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Swatch({ name, className, hint }: { name: string; className: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={cn("h-16 w-full rounded-card border border-border", className)} />
      <div>
        <p className="text-sm font-medium text-foreground">{name}</p>
        {hint && <p className="text-caption">{hint}</p>}
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [range, setRange] = React.useState("1M");
  const aapl = MOCK_STOCKS.AAPL;
  const tsla = MOCK_STOCKS.TSLA;

  // generateMockHistory uses Math.random(), so the sparkline is only
  // rendered once mounted on the client — computing it during the initial
  // render would produce a server/client hydration mismatch.
  const isClient = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const history = isClient
    ? generateMockHistory("AAPL", "1M").dataPoints.map((p) => p.close)
    : [];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-6 pb-24">
      <header className="flex flex-col gap-2 py-10">
        <Badge variant="ai" className="w-fit">
          Design system
        </Badge>
        <h1 className="text-display">Finance AI Chat — Foundations</h1>
        <p className="text-body max-w-2xl text-text-secondary">
          Reusable tokens and component foundations for the application. This
          page exists to review the system in isolation — it is not the chat
          product itself.
        </p>
      </header>

      <Separator />

      <Section
        id="colors"
        title="Colors"
        description="Core palette. Every swatch below is a CSS variable registered as a Tailwind token — never hardcode these values inside a component."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {COLOR_SWATCHES.map((c) => (
            <Swatch key={c.name} name={c.name} className={c.className} hint={c.varName} />
          ))}
        </div>
        <div>
          <p className="text-label mb-3">Finance semantics</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {FINANCE_SWATCHES.map((c) => (
              <Swatch key={c.name} name={c.name} className={c.className} />
            ))}
          </div>
        </div>
      </Section>

      <Separator />

      <Section id="typography" title="Typography" description="Geist Sans, with tabular numerals for financial figures.">
        <div className="flex flex-col gap-3">
          <p className="text-display">Display heading</p>
          <p className="text-h1">Heading 1</p>
          <p className="text-h2">Heading 2</p>
          <p className="text-h3">Heading 3</p>
          <p className="text-h4">Heading 4</p>
          <p className="text-body">Body — Portfolio performance improved 4.2% this quarter, driven by strong gains in technology holdings.</p>
          <p className="text-body-sm">Body small — Data as of market close, delayed by 15 minutes.</p>
          <p className="text-caption">Caption — Last updated 2 minutes ago</p>
          <p className="text-label">Label text</p>
          <p className="text-financial text-2xl">
            $182.52 <span className="text-positive">+1.43 (0.79%)</span>
          </p>
        </div>
      </Section>

      <Separator />

      <Section id="spacing" title="Spacing" description="Standard Tailwind spacing scale, restricted to this approved set of steps.">
        <div className="flex flex-wrap items-end gap-4">
          {SPACING_SCALE.map((s) => (
            <div key={s.token} className="flex flex-col items-center gap-2">
              <div className="bg-primary" style={{ width: s.px, height: s.px }} />
              <span className="text-caption">{s.px}px</span>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section id="radius-shadow" title="Radius &amp; shadow" description="Soft, restrained elevation — never more than shadow-modal.">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {RADIUS_TOKENS.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className={cn("size-14 border border-border-strong bg-surface", r.className)} />
              <span className="text-caption">{r.name}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {SHADOW_TOKENS.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-3 py-2">
              <div className={cn("size-16 rounded-card bg-surface", s.className)} />
              <span className="text-caption">shadow-{s.name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Separator />

      <Section id="buttons" title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="icon" aria-label="Settings">
            <SettingsIcon />
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Separator />

      <Section id="inputs" title="Inputs">
        <div className="grid max-w-md gap-3">
          <Input placeholder="Ask about a stock, sector, or filing…" />
          <Input placeholder="Focused state — click to try" />
          <Input placeholder="Disabled" disabled />
          <Input placeholder="Invalid ticker" aria-invalid />
          <Textarea placeholder="Multi-line input" />
        </div>
      </Section>

      <Separator />

      <Section id="cards-badges" title="Cards &amp; badges">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <CardHeader className="p-0">
              <CardTitle>Default card</CardTitle>
              <CardDescription>Static container</CardDescription>
            </CardHeader>
          </Card>
          <Card interactive className="p-4">
            <CardHeader className="p-0">
              <CardTitle>Interactive card</CardTitle>
              <CardDescription>Hover / press affordance</CardDescription>
            </CardHeader>
          </Card>
          <Card className="gap-3 p-4">
            <CardHeader className="p-0">
              <CardTitle>Financial card</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <FinancialMetric label="Market cap" value="$2.85T" change="+0.8%" changeTone="positive" />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Success</Badge>
          <Badge variant="negative">Negative</Badge>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="ai">AI</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Separator />

      <Section id="navigation" title="Navigation &amp; tabs">
        <div className="grid max-w-xs gap-0.5 rounded-container border border-border bg-surface p-2">
          <NavItem label="Default item" icon={<BarChart3Icon className="size-4" />} />
          <NavItem label="Active item" active icon={<BarChart3Icon className="size-4" />} />
          <NavItem label="Disabled item" disabled icon={<BarChart3Icon className="size-4" />} />
        </div>

        <Tabs defaultValue="overview" className="max-w-md">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-body-sm pt-2">
            Overview panel content.
          </TabsContent>
          <TabsContent value="financials" className="text-body-sm pt-2">
            Financials panel content.
          </TabsContent>
          <TabsContent value="news" className="text-body-sm pt-2">
            News panel content.
          </TabsContent>
        </Tabs>
      </Section>

      <Separator />

      <Section id="overlays" title="Avatar, tooltip, dropdown, popover, dialog, skeleton">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </div>

          <Tooltip>
            <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
            <TooltipContent>Helpful context</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">Menu</Button>} />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Export CSV</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger render={<Button variant="outline">Popover</Button>} />
            <PopoverContent>Short supporting content lives here.</PopoverContent>
          </Popover>

          <Dialog>
            <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm action</DialogTitle>
                <DialogDescription>This is a foundation dialog, not wired to any real action.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">Cancel</Button>} />
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex max-w-sm flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
      </Section>

      <Separator />

      <Section
        id="ai-patterns"
        title="AI-specific patterns"
        description="Presentational only — not wired to a live model yet."
      >
        <div className="flex flex-col gap-4 rounded-container border border-border bg-surface p-4">
          <UserMessage content="What's driving NVDA's move today?" timestamp="10:41 AM" />
          <AIMessage
            content="NVDA is up on strong data-center demand signals ahead of earnings."
            timestamp="10:41 AM"
            sources={
              <>
                <SourceCitation index={1} title="NVIDIA Q3 preview" sourceName="Reuters" />
                <SourceCitation index={2} title="Semiconductor demand tracker" sourceName="Bloomberg" />
              </>
            }
            actions={
              <>
                <AIActionButton icon={<CopyIcon className="size-3.5" />} label="Copy" />
                <AIActionButton icon={<RefreshCwIcon className="size-3.5" />} label="Regenerate" />
                <AIActionButton icon={<ThumbsUpIcon className="size-3.5" />} label="Good response" />
                <AIActionButton icon={<ThumbsDownIcon className="size-3.5" />} label="Bad response" />
              </>
            }
          />
          <AIMessage content="Pulling the latest filings" isStreaming />
          <ReasoningIndicator label="Analyzing market data" />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <PromptSuggestionCard label="Summarize my portfolio risk" description="Uses your current holdings" />
          <PromptSuggestionCard label="Compare AAPL vs MSFT" description="Valuation & growth" />
        </div>
      </Section>

      <Separator />

      <Section
        id="finance-patterns"
        title="Finance-specific patterns"
        description="No live market data connected — all values below are local mock data."
      >
        <div className="flex flex-wrap gap-3">
          <MarketStatus status="open" />
          <MarketStatus status="pre-market" />
          <MarketStatus status="after-hours" />
          <MarketStatus status="closed" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <StockCard stock={aapl} history={history} interactive />
          <StockCard stock={tsla} />
          <Card className="grid grid-cols-2 gap-4 p-4">
            <FinancialMetric label="P/E ratio" value={String(aapl.peRatio)} />
            <FinancialMetric label="Dividend yield" value={`${aapl.dividendYield}%`} />
            <FinancialMetric label="Day high" value={`$${aapl.high}`} change="+0.7%" changeTone="positive" />
            <FinancialMetric label="Day low" value={`$${aapl.low}`} change="-0.4%" changeTone="negative" />
          </Card>
        </div>

        <ChartContainer
          title={`${aapl.symbol} price`}
          subtitle="Static placeholder — no charting library connected yet"
          activeRange={range}
          onRangeChange={setRange}
        />

        <div className="flex flex-col divide-y divide-border rounded-container border border-border bg-surface">
          {MOCK_NEWS.slice(0, 3).map((n, i) => (
            <NewsItem
              key={n.id}
              source={n.source}
              headline={n.title}
              timestamp={NEWS_TIMESTAMP_LABELS[i] ?? "recently"}
              category={n.relatedSymbols[0]}
            />
          ))}
        </div>
      </Section>

      <Separator />

      <Section
        id="responsive"
        title="Responsive sidebar"
        description="Desktop renders a persistent rail; below md it collapses into this drawer, opened here for review."
      >
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setDrawerOpen(true)}>
            <MenuIcon /> Open mobile drawer
          </Button>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Notifications">
                  <BellIcon />
                </Button>
              }
            />
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </div>

        <div className="hidden overflow-hidden rounded-container border border-border md:block">
          <div className="flex h-64">
            <Sidebar
              header={<p className="text-h4 px-1">Finance AI</p>}
              className="static flex w-56"
            >
              <NavItem label="Chats" active icon={<ClockIcon className="size-4" />} />
              <NavItem label="Watchlist" icon={<BarChart3Icon className="size-4" />} />
            </Sidebar>
            <div className="flex flex-1 items-center justify-center text-caption">
              Main content area
            </div>
          </div>
        </div>

        <SidebarDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          header={<p className="text-h4 px-1">Finance AI</p>}
        >
          <NavItem label="Chats" active icon={<ClockIcon className="size-4" />} />
          <NavItem label="Watchlist" icon={<BarChart3Icon className="size-4" />} />
        </SidebarDrawer>
      </Section>

      <Separator />

      <Section id="chat-input" title="Chat input shape" description="A preview of the composer surface — not wired to send.">
        <div className="flex items-end gap-2 rounded-container border border-border bg-surface p-2 shadow-subtle">
          <Textarea placeholder="Ask anything about the markets…" className="min-h-9 flex-1 resize-none border-0 shadow-none focus-visible:ring-0" />
          <Button size="icon" aria-label="Send">
            <SendIcon />
          </Button>
        </div>
      </Section>
    </div>
  );
}
