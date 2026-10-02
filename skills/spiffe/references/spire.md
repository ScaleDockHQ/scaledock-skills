# SPIRE

Sources: [SPIRE Concepts](https://spiffe.io/docs/latest/spire-about/spire-concepts/), [Deploying a Federated SPIRE Architecture](https://spiffe.io/docs/latest/architecture/federation/readme/) and [Working with SVIDs](https://spiffe.io/docs/latest/deploying/svids/), spiffe.io docs latest. The latest SPIRE release is [v1.15.3](https://github.com/spiffe/spire/releases/tag/v1.15.3) (2026-08-21). The federation tutorial was written against SPIRE 1.11.2; check the configuration reference of the version you run.

SPIRE is the reference implementation of the SPIFFE standards. Treat its configuration as one way to meet the standards, not as part of them.

## Server

- A SPIRE Server manages and issues all identities in one trust domain. It stores registration entries and signing keys, uses node attestation to authenticate agents, and creates SVIDs for workloads when an authenticated agent asks.
- Plugins:
  - node attestors;
  - datastore: one built-in plugin backed by MySQL, SQLite 3 (the default) or PostgreSQL;
  - key manager: how the server stores the private keys that sign X.509-SVIDs and JWT-SVIDs;
  - upstream authority: by default the server is its own CA with a self-signed certificate; an upstream authority plugin uses a CA from another PKI.

## Agent

- An agent runs on every node where an identified workload runs. It requests SVIDs from the server and caches them, exposes the Workload API, attests the workloads that call it, and gives them their SVIDs.
- Workload attestor plugins for Unix, Kubernetes and Docker verify the calling process by asking local authorities, such as the kernel or the kubelet.
- Agent key manager plugins generate and use the private keys for workloads' X.509-SVIDs.

## Attestation

- **Node attestation.** The agent proves the node's identity to the server, for example with an AWS Instance Identity Document. Supported environments include AWS EC2, Azure VMs, Google Compute Engine and Kubernetes (service account tokens). Without a platform identity, use a server-generated join token (single use) or an existing X.509 certificate. A successful attestation gives the agent a SPIFFE ID, which becomes the parent of its workloads.
- **Node selectors.** Node attestors may return selectors that describe the node, such as an instance ID.
- **Workload attestation.** The agent collects selectors for the calling process and matches them against registration entries, then returns the matching cached SVID.

## Registration entries

- A registration entry maps a SPIFFE ID to a set of selectors that the workload must have.
- The server sends an agent only its authorized entries: those with the agent's SPIFFE ID as parent, those matching its node selectors, and their descendants.
- Workload attestation compares the caller's discovered selectors with registration entries, so any process that matches an entry's selectors receives its SPIFFE ID. Pick selectors narrow enough that only the intended workload matches.

```text
spire-server entry create \
  -parentID <agent SPIFFE ID> \
  -spiffeID spiffe://broker.example/webapp \
  -selector unix:user:webapp \
  -federatesWith "spiffe://stockmarket.example"
```

`-federatesWith` makes the server send the named foreign trust domain's bundle to the workload with its SVID.

## Federation

Expose this server's bundle endpoint in `server.conf`:

```hcl
server {
  trust_domain = "broker.example"
  federation {
    bundle_endpoint {
      address = "0.0.0.0"
      port = 8443
    }
  }
}
```

For the `https_web` profile, add an `acme` block to `bundle_endpoint` with `domain_name`, `email` and `tos_accepted = true`, serve on port 443, and own the DNS name. Let's Encrypt is the default ACME provider; set `directory_url` for another.

Configure each foreign trust domain with `federates_with`:

```hcl
federates_with "stockmarket.example" {
  bundle_endpoint_url = "https://spire-server-stock:8443"
  bundle_endpoint_profile "https_spiffe" {
    endpoint_spiffe_id = "spiffe://stockmarket.example/spire/server"
  }
}

federates_with "broker.example" {
  bundle_endpoint_url = "https://spire-server-broker:8443"
  bundle_endpoint_profile "https_web" {}
}
```

Bootstrap `https_spiffe` relationships by exchanging bundles once, then let the servers refresh from each other's endpoints:

```text
spire-server bundle show -format spiffe > broker.example.bundle
spire-server bundle set -format spiffe -id spiffe://broker.example -path /some/path/broker.example.bundle
```

No bootstrap file is needed for a server whose endpoint uses `https_web`. The bootstrap transfer is the configuration channel that SPIFFE Federation §7.1 requires to resist tampering.

## Fetching SVIDs

- Workloads use a Workload API client library, the SPIFFE Helper for applications that cannot call the API, or `spire-agent` as a client.
- The Workload API needs no explicit authentication; the implementation authenticates the workload.

```text
spire-agent api fetch x509 -socketPath /run/spire/sockets/agent.sock -write /tmp/
```
