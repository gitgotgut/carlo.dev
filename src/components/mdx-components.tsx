import type { MDXComponents } from "mdx/types"

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-8 mb-4 text-3xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-8 mb-3 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 mb-2 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mb-4 leading-7" {...props} />
  ),
  a: (props) => (
    <a
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-4 mb-4 border-l-4 border-primary/30 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-8 border-border" {...props} />,
  table: (props) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-border px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
}
