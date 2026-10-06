# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Buildpacks platform API

Source: https://raw.githubusercontent.com/buildpacks/spec/main/platform.md

A platform orchestrates a lifecycle to make buildpack functionality available to end-users such as application developers.

- **document.** Platform API versions: - MUST be in form ` .
- **document.** `or` `, where ` `is equivalent to` .0`- When` `is greater than`0`increments to` ` SHALL exclusively indicate additive changes ## Terminology #### CNB Terminology A **buildpack** refers to software compliant with the [Buildpack Interface Specification](buildpack.md).
- **document.** The value MUST NOT contain the character `/` as it is reserved for future use.
- **document.** The platform MUST ensure that: - The image config's `User` field is set to a non-root user with a writable home directory.
- **document.** The platform SHOULD ensure that: - The image config's `Label` field has the label `io.buildpacks.base.maintainer` set to the name of the image maintainer.
- **document.** The platform MUST ensure that: - The image config's `Env` field has the environment variable `PATH` set to a valid set of paths or explicitly set to empty (`PATH=`).
- **document.** The platform SHOULD ensure that: - The image config's `User` field is set to a user with a **DIFFERENT** user [†](README.md#operating-system-conventions)UID/[‡](README.md#operating-system-conventions)SID as the build image.
- **document.** ### Target Data For run images, the platform SHOULD ensure that: - The image config's `Label` field has the label `io.buildpacks.base.id` set to the target ID of the run image.

## Buildpack API

Source: https://raw.githubusercontent.com/buildpacks/spec/main/buildpack.md

This document specifies the interface between a lifecycle program and one or more buildpacks.

- **document.** - [build.toml (TOML) `bom` Array](#buildtoml-toml-bom-array) - [Build Plan (TOML) `requires.version` Key](#build-plan-toml-requiresversion-key) ## Buildpack API Version This document specifies Buildpack API version `0.12` Buildpack API versions: - MUST be in form ` .
- **document.** `or` `, where ` `is equivalent to` .0`-` `and` `MUST only contain numbers (unsigned 64 bit integer) - When` `is greater than`0`increments to` `SHALL exclusively indicate additive changes ## Terminology ### CNB Terminology A **buildpack** is a directory containing a`buildpack.toml`.
- **document.** They MUST be [resolvable](#order-resolution) into a collection of component buildpacks.
- **document.** The lifecycle MUST invoke executables in component buildpacks as described in the Phase sections.
- **document.** Buildpacks SHOULD adapt their behavior based on the `CNB_EXEC_ENV` environment variable during detection and build phases.
- **document.** - A buildpack MAY mark processes as applicable only to specific execution environments - A buildpack MAY create layers that are specific to certain execution environments - A buildpack MAY use different build strategies depending on the execution environment When the `CNB_EXEC_ENV` environment variable is not set, buildpacks MUST assume the default value of `production`.
- **document.** The value of `CNB_EXEC_ENV` MUST NOT contain the character `/` as it is reserved for future use.
- **document.** When a platform builds an application with a different execution environment than was used in a previous build, the platform SHOULD NOT restore layers from the previous build's image.
