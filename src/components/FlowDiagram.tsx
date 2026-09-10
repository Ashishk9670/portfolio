import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

export type FlowStep = { label: string; sublabel?: string };

export function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          <div className="flex flex-1 flex-col justify-center rounded-lg border border-border bg-surface p-4 text-center">
            <p className="text-sm font-medium">{step.label}</p>
            {step.sublabel && <p className="mt-1 font-mono text-xs text-muted">{step.sublabel}</p>}
          </div>
          {i < steps.length - 1 && (
            <div className="flex shrink-0 items-center justify-center text-muted">
              <ArrowRight className="hidden h-5 w-5 sm:block" aria-hidden="true" />
              <ArrowDown className="mx-auto h-5 w-5 sm:hidden" aria-hidden="true" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
