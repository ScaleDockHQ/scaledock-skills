# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Dockerfile reference

Source: https://raw.githubusercontent.com/moby/buildkit/8c91502cf280bd70a0c50912ce251c46a8881d9f/frontend/dockerfile/docs/reference.md

- **Format.** The instruction is not case-sensitive. However, convention is for them to be UPPERCASE to distinguish them from arguments more easily.
- **Parser directives.** A single directive may only be used once.
- **Parser directives.** Therefore, all parser directives must be at the top of a Dockerfile.
- **Parser directives.** Values for a directive are case-sensitive and must be written in the appropriate case for the directive.
- **Shell and exec form, Exec form.** The exec form is parsed as a JSON array, which means that you must use double-quotes (") around words, not single-quotes (').
- **Exec form, Backslashes.** In exec form, you must escape backslashes.
- **FROM.** As such, a valid Dockerfile must start with a `FROM` instruction.
- **FROM.** `ARG` is the only instruction that may precede `FROM` in the Dockerfile.
- **FROM.** Each `FROM` instruction clears any state created by previous instructions.
- **RUN, Cache invalidation for RUN instructions.** The cache for `RUN` instructions isn't invalidated automatically during the next build.
- **RUN --mount=type=secret.** This mount type allows the build container to access secret values, such as tokens or private keys, without baking them into the image.
- **CMD.** There can only be one `CMD` instruction in a Dockerfile. If you list more than one `CMD`, only the last one takes effect.
- **CMD.** The purpose of a `CMD` is to provide defaults for an executing container. These defaults can include an executable, or they can omit the executable, in which case you must specify an `ENTRYPOINT` instruction as well.
- **ENV.** The environment variables set using `ENV` will persist when a container is run from the resulting image.
- **ADD and COPY, Source.** If you specify multiple source files, either directly or using a wildcard, then the destination must be a directory (must end with a slash `/`).
- **ADD, Adding files from a URL.** The URL must have a nontrivial path so that an appropriate filename can be discovered (`http://example.com` doesn't work).
- **ENTRYPOINT.** Only the last `ENTRYPOINT` instruction in the Dockerfile will have an effect.
- **Understand how CMD and ENTRYPOINT interact.** Dockerfile should specify at least one of `CMD` or `ENTRYPOINT` commands.
- **Understand how CMD and ENTRYPOINT interact.** `ENTRYPOINT` should be defined when using the container as an executable.
- **VOLUME, Notes about specifying volumes.** You must specify the mountpoint when you create or run the container.
- **WORKDIR.** Therefore, to avoid unintended operations in unknown directories, it's best practice to set your `WORKDIR` explicitly.
- **ARG, Scope.** To use an argument in multiple distinct stages, each stage must include the `ARG` instruction, or they must both be based on a shared base stage in the same Dockerfile where the variable is declared.
- **ARG, Impact on build caching.** `ARG` variables are not persisted into the built image as `ENV` variables are.
- **HEALTHCHECK.** There can only be one `HEALTHCHECK` instruction in a Dockerfile. If you list more than one then only the last `HEALTHCHECK` will take effect.
- **SHELL.** The `SHELL` instruction must be written in JSON form in a Dockerfile.
