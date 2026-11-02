# Copy

Words are half of what reads as AI. If the user supplied copy, keep it verbatim; this file is for copy you write or are asked to fix.

## Write the argument first
List the piece as claims with proof, one line each. The claims decide which sections or slides exist and their order. Delete any part without a claim.

## Voice
Sound like the person who built it explaining it to a colleague: plain, specific, a little dry. Short declarative sentences. Concrete nouns from the product: the button text users see, the names in the code, real screens, real numbers.

## Rules
- A specific fact beats a benefit. "Shows on Home, Search and Payments" beats "close to the action".
- Headlines ≈ 5 words / 32 characters; two lines maximum. Read each aloud: would a person on the team say it?
- One supporting sentence, one primary action named for what it does ("Download the deck", not "Get started" / "Learn more").
- Every claim traces to a source. Unproven things are labelled as targets. Never invent customers, quotes, logos, reviews or statistics. Sample content is listed in the report for the user to replace.
- Numbers keep their exact attribution (what was measured, when, over what).

## Banned patterns
- Slogan pairs and parallel rhythm ("One workspace. Clear roles."), tricolons, "not just X, it's Y", rhetorical questions, em-dash flourishes.
- Words: seamless, effortless, empower, unlock, elevate, leverage, supercharge, streamline, robust, cutting-edge, next-gen, revolutionary, game-changing, AI-powered, agentic, intelligent, all-in-one, at a glance, in focus, where it matters, crafted, curated (as filler), delve, tapestry, journey, passionate.
- Performative labels: "Field notes", "Quietly trusted by", "On our desks", local time / coordinates / version stamps as decoration.

`scripts/slop-scan.mjs` flags most of these. For a full human edit of a draft, the `no-ai-slop` skill goes deeper if installed.
