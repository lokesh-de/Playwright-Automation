from pathlib import Path

root = Path('tests')
for path in sorted(root.glob('*.md')):
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    found_first = False
    out_lines = []
    for line in lines:
        if not found_first and line.strip() == '':
            out_lines.append(line)
            continue
        if not found_first and line.startswith('# '):
            out_lines.append(line)
            found_first = True
            continue
        if line.startswith('# '):
            out_lines.append('## ' + line[2:])
        else:
            out_lines.append(line)
    new_text = '\n'.join(out_lines)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        print(f'Fixed {path.name}')
