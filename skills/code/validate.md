# Code: Validate

## Apply When
- After code changes.
- After performance work, validate with before/after measurements per @skills/code/performance.md.

## Do
- Run the narrowest relevant check (tests, typecheck, lint, build).
- If you cannot run checks, say so and provide the command to run.
- Report results clearly, referencing paths and commands used.
- If all checks pass, say so.
- If any check fails, say so and provide the command to run.
- If any check fails, identify the offending file and line number.
- If any check fails, explain why it failed, but do not assume the cause if you don't know.

## Don't
- Don't claim tests passed if they were not run.
- Don't claim lint passed if it was not run.
- Don't claim build passed if it was not run.
- Don't claim typecheck passed if it was not run.
- Don't claim code formatting passed if it was not run.
