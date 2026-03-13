# Email Builder

Drag-and-drop email editor for React 18 + 19. Outputs production-ready MJML/HTML.

Forked from [zalify/easy-email-editor](https://github.com/zalify/easy-email-editor) (MIT).

## Packages

| Package | Description |
|---------|------------|
| `easy-email-core` | Block definitions, MJML generation, utilities |
| `easy-email-editor` | Drag-and-drop visual editor with live preview |
| `easy-email-extensions` | Attribute panels, block toolbars, rich text editor |

## React 19 Fixes (source-level)

- HTML renderer remaps `<html>/<head>/<body>` to `<div>` (React 19 strict validation)
- Table whitespace text node filtering (React 19 parser strictness)
- `pnpm patch` for `@arco-design/web-react@2.66.11` — fixes `useMergeValue`, `Trigger/portal`, `callbackOriginRef`, `popupChildren.ref`
- Minimal `findDOMNode` no-op fallback for bundled `react-transition-group`
- Peer dependencies: `"react": "^18.2.0 || ^19.0.0"`

## Build

```bash
pnpm install
pnpm run build
```

## Install in your project

```bash
cd packages/easy-email-core && pnpm pack --pack-destination /path/to/your-project/.easy-email-packs/
cd packages/easy-email-editor && pnpm pack --pack-destination /path/to/your-project/.easy-email-packs/
cd packages/easy-email-extensions && pnpm pack --pack-destination /path/to/your-project/.easy-email-packs/
```

```json
{
  "easy-email-core": "file:.easy-email-packs/easy-email-core-4.17.0.tgz",
  "easy-email-editor": "file:.easy-email-packs/easy-email-editor-4.17.0.tgz",
  "easy-email-extensions": "file:.easy-email-packs/easy-email-extensions-4.17.0.tgz"
}
```

## License

MIT
