from pathlib import Path

root = Path('tests')
for path in sorted(root.glob('*.md')):
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    found_first = False
    extras = []
    for i, line in enumerate(lines, start=1):
        if line.startswith('# '):
            if not found_first:
                found_first = True
            else:
                extras.append((i, line))
    if extras:
        print(path.name)
        for i, line in extras:
            print(f'  {i}: {line}')
