# Email Builder

A React-based drag-and-drop email editor that outputs production-ready MJML/HTML. Compatible with **React 18 + 19**.

## Packages

| Package | Description |
|---------|------------|
| `easy-email-core` | Block definitions, MJML generation, utilities |
| `easy-email-editor` | Drag-and-drop visual editor with live preview |
| `easy-email-extensions` | Attribute panels, block toolbars, rich text editor |

## React 19 Compatibility

Includes full React 19 support:

- Polyfills for removed `ReactDOM.render` and `findDOMNode` APIs (used by Arco Design)
- Fixed `<html>/<head>/<body>` nesting (React 19 strict validation)
- Table whitespace text node filtering
- Pre-build Arco Design patches for `useMergeValue` and `Trigger/portal`
- Updated peer dependencies to `^18.2.0 || ^19.0.0`

## Build

```bash
pnpm install
pnpm run build
```

This builds all three packages in order: core → editor → extensions.

The extensions package runs `patch-arco` automatically before building to apply React 19 fixes to Arco Design internals.

## Usage in a Project

Build, then pack tarballs:

```bash
cd packages/easy-email-core && pnpm pack
cd packages/easy-email-editor && pnpm pack
cd packages/easy-email-extensions && pnpm pack
```

Install in your project:

```json
{
  "easy-email-core": "file:.easy-email-packs/easy-email-core-4.17.0.tgz",
  "easy-email-editor": "file:.easy-email-packs/easy-email-editor-4.17.0.tgz",
  "easy-email-extensions": "file:.easy-email-packs/easy-email-extensions-4.17.0.tgz"
}
```

## License

MIT
