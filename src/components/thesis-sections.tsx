"use client"

import { motion } from "framer-motion"
import type { ThesisData } from "@/lib/projects"

/* ── Pipeline Diagram ── */
export function PipelineDiagram({
  pipeline,
}: {
  pipeline: ThesisData["pipeline"]
}) {
  return (
    <div className="flex flex-col gap-0">
      {pipeline.map((step, i) => (
        <div key={step.step} className="flex items-stretch gap-4">
          {/* Vertical connector */}
          <div className="flex w-8 flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.3 }}
              className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-cyan-400/60 bg-card text-xs font-bold text-cyan-400"
            >
              {i + 1}
            </motion.div>
            {i < pipeline.length - 1 && (
              <div className="w-px flex-1 bg-gradient-to-b from-cyan-400/40 to-fuchsia-500/40" />
            )}
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 + 0.05, duration: 0.35 }}
            className="mb-4 flex-1 rounded-lg border border-border bg-background/50 px-4 py-3"
          >
            <p className="text-sm font-semibold text-foreground">
              {step.step}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {step.detail}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

/* ── Research Questions ── */
export function ResearchQuestions({
  questions,
}: {
  questions: ThesisData["researchQuestions"]
}) {
  return (
    <div className="space-y-3">
      {questions.map((rq, i) => (
        <motion.div
          key={rq.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className="flex gap-3 rounded-lg border border-border bg-background/50 px-4 py-3"
        >
          <span className="shrink-0 text-sm font-bold text-cyan-400">
            {rq.id}
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {rq.question}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

/* ── Dataset Overview ── */
export function DatasetOverview({
  dataset,
}: {
  dataset: ThesisData["dataset"]
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Participants", value: dataset.participants },
          { label: "Train", value: dataset.trainSize },
          { label: "Dev", value: dataset.devSize },
          { label: "Test", value: dataset.testSize },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className="rounded-lg border border-border bg-background/50 px-3 py-2 text-center"
          >
            <p className="text-lg font-bold text-cyan-400">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Class distribution bar */}
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          PHQ-8 Severity Distribution
        </p>
        <div className="flex h-6 overflow-hidden rounded-full">
          {dataset.classDistribution.map((cls, i) => {
            const colors = ["#22d3ee", "#a78bfa", "#f472b6"]
            return (
              <motion.div
                key={cls.label}
                initial={{ width: 0 }}
                animate={{ width: `${cls.pct}%` }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="h-full"
                style={{ backgroundColor: colors[i] }}
                title={`${cls.label}: ${cls.pct}%`}
              />
            )
          })}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
          {dataset.classDistribution.map((cls, i) => {
            const colors = ["#22d3ee", "#a78bfa", "#f472b6"]
            return (
              <div key={cls.label} className="flex items-center gap-1.5 text-xs">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: colors[i] }}
                />
                <span className="text-muted-foreground">
                  {cls.label} — {cls.pct}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── Experiment Results Table ── */
export function ExperimentResults({
  experiments,
  bestResult,
}: {
  experiments: ThesisData["experiments"]
  bestResult: ThesisData["bestResult"]
}) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 text-xs font-medium text-muted-foreground">
                #
              </th>
              <th className="pb-2 pr-4 text-xs font-medium text-muted-foreground">
                Experiment
              </th>
              <th className="pb-2 pr-4 text-center text-xs font-medium text-muted-foreground">
                MAE (Dev)
              </th>
              <th className="pb-2 pr-4 text-center text-xs font-medium text-muted-foreground">
                RMSE (Dev)
              </th>
              <th className="pb-2 pr-4 text-center text-xs font-medium text-muted-foreground">
                MAE (Test)
              </th>
              <th className="pb-2 text-center text-xs font-medium text-muted-foreground">
                RMSE (Test)
              </th>
            </tr>
          </thead>
          <tbody>
            {experiments.map((exp, i) => {
              const isBest = exp.id === 7
              return (
                <motion.tr
                  key={exp.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className={`border-b border-border/50 ${isBest ? "bg-cyan-400/5" : ""}`}
                >
                  <td className="py-2 pr-4 text-xs text-muted-foreground">
                    {exp.id}
                  </td>
                  <td className="py-2 pr-4">
                    <p
                      className={`text-sm ${isBest ? "font-semibold text-cyan-400" : "text-foreground/90"}`}
                    >
                      {exp.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {exp.description}
                    </p>
                  </td>
                  <td className="py-2 pr-4 text-center font-mono text-xs text-muted-foreground">
                    {exp.maedev.toFixed(2)}
                  </td>
                  <td className="py-2 pr-4 text-center font-mono text-xs text-muted-foreground">
                    {exp.rmsedev.toFixed(2)}
                  </td>
                  <td
                    className={`py-2 pr-4 text-center font-mono text-xs ${exp.mae ? "text-foreground" : "text-muted-foreground/50"}`}
                  >
                    {exp.mae ? exp.mae.toFixed(2) : "—"}
                  </td>
                  <td
                    className={`py-2 text-center font-mono text-xs ${exp.rmse ? "text-foreground" : "text-muted-foreground/50"}`}
                  >
                    {exp.rmse ? exp.rmse.toFixed(2) : "—"}
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Best result highlight */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-4 py-3"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Best Result
          </span>
          <span className="text-sm text-foreground">{bestResult.model}</span>
        </div>
        <div className="mt-1 flex gap-4">
          <span className="font-mono text-sm text-foreground">
            MAE {bestResult.mae.toFixed(2)}
          </span>
          <span className="font-mono text-sm text-foreground">
            RMSE {bestResult.rmse.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {bestResult.description}
        </p>
      </motion.div>
    </div>
  )
}

/* ── Key Findings ── */
export function KeyFindings({ findings }: { findings: string[] }) {
  return (
    <div className="space-y-2">
      {findings.map((finding, i) => {
        const isCritical = finding.includes("0% recall") || finding.includes("ALL models fail")
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${
              isCritical
                ? "border-red-400/30 bg-red-400/5 text-red-300"
                : "border-border bg-background/50 text-muted-foreground"
            }`}
          >
            {finding}
          </motion.div>
        )
      })}
    </div>
  )
}
