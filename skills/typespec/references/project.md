# Project setup, configuration and CLI

Read this when creating a TypeSpec project or wiring it into a build. Sources: the Getting started, CLI usage and Configuration pages, and the compiler changelog.

## Install and create a project

1. Install Node.js 22.0.0 or later and npm 7.0.0 or later.
2. Install the CLI: `npm install -g @typespec/compiler`, then check `tsp --version`.
3. Run `tsp init` and choose a template (the REST tutorial uses "Generic REST API"), then `tsp install`.
4. Compile with `tsp compile .`, or `tsp compile . --watch` to recompile on save.

A new project has `main.tsp` (the entry point), `tspconfig.yaml`, `package.json`, and output under `tsp-output/@typespec/openapi3/openapi.yaml`.

`tsp init` with an external template URL can download malicious packages; verify the source first (CLI usage). `TYPESPEC_NPM_REGISTRY` sets the registry `tsp init` and `tsp install` use for package metadata; it does not configure the package manager itself.

## CLI commands (CLI usage)

| Command                   | Use                                                      |
| ------------------------- | -------------------------------------------------------- |
| `tsp compile <path>`      | Compile TypeSpec source and run the configured emitters. |
| `tsp format <include...>` | Format `.tsp` files.                                     |
| `tsp init [templatesUrl]` | Create a project.                                        |
| `tsp install`             | Install dependencies.                                    |
| `tsp info`                | Show compiler information.                               |
| `tsp code`, `tsp vs`      | Manage the VS Code and Visual Studio extensions.         |

## tspconfig.yaml (Configuration)

The compiler uses the closest `tspconfig.yaml` in the entrypoint's directory or a parent directory.

```yaml
kind: project
entrypoint: main.tsp
output-dir: "{project-root}/tsp-output"
warn-as-error: true
emit:
  - "@typespec/openapi3"
options:
  "@typespec/openapi3":
    openapi-versions:
      - "3.1.0"
      - "3.2.0"
    file-type: yaml
```

| Key             | CLI flag                              | Meaning                                                                                   |
| --------------- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `kind: project` | none                                  | Marks a project boundary (compiler 1.13.0 and later).                                     |
| `entrypoint`    | none                                  | Main file; needs `kind: project`; defaults to `main.tsp`.                                 |
| `output-dir`    | `--output-dir`                        | Common output directory. Must be absolute in the config; use `{cwd}` or `{project-root}`. |
| `warn-as-error` | `--warn-as-error`                     | Treat warnings as errors. Recommended in CI.                                              |
| `imports`       | `--import`                            | Extra files to import.                                                                    |
| `emit`          | `--emit`                              | Emitters to run, by package name or path.                                                 |
| `options`       | `--option <emitter>.<option>=<value>` | Emitter options. CLI options win over the file.                                           |
| `trace`         | `--trace`                             | Tracing areas.                                                                            |
| `linter`        | none                                  | `extends`, `enable` and `disable` rules by `<library>/<rule>` ID.                         |
| `extends`       | none                                  | Inherit another config. A property set in both files is replaced, not merged.             |

Every emitter also accepts `emitter-output-dir`, defaulting to `{output-dir}/{emitter-name}`. Project `parameters` and `environment-variables` can be interpolated as `{name}` and `{env.NAME}`; every parameter needs a default.

Linter rules and rulesets are named `<libraryName>/<ruleName>`; a library must be imported for its short names to resolve. List only rulesets the library documents.
