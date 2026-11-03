#!/usr/bin/env bash
# PostToolUse hook: run Prettier on the file Claude just edited or wrote.
# Respects .prettierignore and skips files Prettier cannot parse.
# Never blocks the edit: on failure it exits 2 so Claude sees the Prettier error.

project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Read the hook payload from stdin and extract tool_input.file_path.
file=$(node -e '
  let data = "";
  process.stdin.on("data", (chunk) => (data += chunk));
  process.stdin.on("end", () => {
    try {
      process.stdout.write(JSON.parse(data).tool_input?.file_path ?? "");
    } catch {}
  });
')

# Only format existing files inside this project.
if [[ -z "$file" || ! -f "$file" ]]; then
  exit 0
fi
case "$(realpath "$file")" in
  "$(realpath "$project_dir")"/*) ;;
  *) exit 0 ;;
esac

cd "$project_dir" || exit 0
if ! output=$(npx --no-install prettier --write --ignore-unknown --log-level warn -- "$file" 2>&1); then
  echo "Prettier hook: could not format $file" >&2
  echo "$output" >&2
  exit 2
fi
exit 0
