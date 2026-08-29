import * as React from "react"
import { BuildingIcon, CalendarIcon, GlobeIcon, UsersIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { CompanyOverviewData } from "@/types/finance"

export interface CompanyOverviewProps extends React.ComponentProps<"div"> {
  company: CompanyOverviewData
}

/**
 * Compact company profile: description plus a handful of basic facts.
 * Intentionally not a full company profile page.
 */
function CompanyOverview({ company, className, ...props }: CompanyOverviewProps) {
  const facts = [
    company.headquarters && { icon: BuildingIcon, label: company.headquarters },
    company.founded && { icon: CalendarIcon, label: `Founded ${company.founded}` },
    company.employees && { icon: UsersIcon, label: `${company.employees} employees` },
    company.website && { icon: GlobeIcon, label: company.website },
  ].filter((fact): fact is { icon: typeof BuildingIcon; label: string } => Boolean(fact))

  return (
    <Card className={cn("gap-3 p-4", className)} {...props}>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-h4">{company.name}</h3>
        {company.sector && <Badge variant="outline">{company.sector}</Badge>}
        {company.industry && <Badge variant="outline">{company.industry}</Badge>}
      </div>

      <p className="text-body-sm text-text-secondary">{company.description}</p>

      {facts.length > 0 && (
        <div className="flex flex-col gap-1.5 border-t border-border pt-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex items-center gap-2 text-caption">
              <fact.icon className="size-3.5 shrink-0 text-text-muted" />
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

export { CompanyOverview }
