# Tactics and techniques

Read this when you pick, cite or explain ATLAS tactics, techniques and sub-techniques, or relate them to MITRE ATT&CK. Every row is generated from `dist/v6/ATLAS-2026.09.yaml` (content 2026.09, format 6.0.0); the matrix order and the `&` marker come from the ATLAS Matrix page. Sources are listed in [Sources](../SKILL.md#sources).

## The model

- **Tactic** (`AML.TA####`): the adversary's goal, the "why" of an action. The tactic descriptions read "The adversary is trying to …", for example Reconnaissance is "trying to gather information about the AI system they can use to plan future operations".
- **Technique** (`AML.T####`): how the adversary achieves a tactic. A technique links to one or more tactics through `achieves` relationships; eight techniques sit under more than one tactic (listed below).
- **Sub-technique** (`AML.T####.###`): a more specific way to perform a parent technique, linked by a `specializes` relationship. In 2026.09 every sub-technique achieves the same tactics as its parent. In the data its `name` is the short form ("Indirect"); the website and changelog write the full form "LLM Prompt Injection: Indirect".
- **Maturity** (every technique): the level of evidence behind its use (CHANGELOG 5.0.0). **Feasible**: shown to work in a research or academic setting. **Demonstrated**: shown to be effective in a red team exercise or demonstration on a realistic AI-enabled system. **Realized**: used by a threat actor in a real-world incident targeting an AI-enabled system. In 2026.09: 101 Realized, 83 Demonstrated, 24 Feasible.
- **Platforms** (every technique, at least one; CHANGELOG 2026.05): Predictive AI (P), Generative AI (G), Agentic AI (A), Enterprise (E). The matrix page filters on both platforms and maturity.

## Relationship to ATT&CK

- ATLAS uses ATT&CK's tactic, technique and sub-technique structure, and its STIX bundle follows the ATT&CK data model (`atlas-navigator-data` README). The matrix page marks with `&` every tactic or technique "adapted from MITRE ATT&CK".
- In the data, an adapted object carries `attack-reference` with the ATT&CK `id` and `url`. 14 of 16 tactics, 44 of 208 techniques and sub-techniques, and 4 mitigations have one (AML.M0011 to M1044, AML.M0012 to M1041, AML.M0013 to M1045, AML.M0018 to M1017).
- AI Model Access (AML.TA0000) and AI Attack Adaptation (AML.TA0001) are ATLAS-only tactics with no ATT&CK counterpart.
- ATLAS IDs are a separate namespace: `AML.T0012` Valid Accounts references ATT&CK `T1078`, but the two IDs are not interchangeable. Cite the ATLAS ID for the AI-specific view and the ATT&CK ID for the enterprise view. ATT&CK sub-technique IDs (`T####.###`) are allowed in `attack-reference`.
- `stix-atlas-attack-enterprise.json` bundles ATLAS with ATT&CK Enterprise so both can be viewed and queried together; see [`data-format.md`](data-format.md).

## Techniques under more than one tactic

| Technique                                                     | Tactics                                                |
| ------------------------------------------------------------- | ------------------------------------------------------ |
| `AML.T0012` Valid Accounts                                    | Initial Access, Privilege Escalation, Lateral Movement |
| `AML.T0015` Evade AI Model                                    | Initial Access, Defense Evasion, Impact                |
| `AML.T0018` Manipulate AI Model                               | AI Attack Adaptation, Persistence                      |
| `AML.T0052` Phishing                                          | Initial Access, Lateral Movement                       |
| `AML.T0053` AI Agent Tool Invocation                          | Execution, Privilege Escalation, Lateral Movement      |
| `AML.T0054` LLM Jailbreak                                     | Defense Evasion, Privilege Escalation                  |
| `AML.T0081` Modify AI Agent Configuration                     | Persistence, Defense Evasion                           |
| `AML.T0093` Prompt Infiltration via Public-Facing Application | Initial Access, Persistence                            |

When you map an observed step, record the tactic too (`employs` relationships do: `tactic` is required), because the technique alone does not say which column it served.

## Agentic AI techniques in 2026.09

139 techniques and sub-techniques list Agentic AI as a platform. The ones that are about agents specifically, with the first sentence of their description paraphrased:

- **Configuration and discovery**: AML.T0002.002 AI Agent Configuration (acquire public agent configuration files); AML.T0084 Discover AI Agent Configuration with `.000` Embedded Knowledge, `.001` Tool Definitions, `.002` Activation Triggers, `.003` Call Chains; AML.T0133 Discover AI Agent Runtime Capabilities (probe the agent at runtime, without its configuration); AML.T0006.003 Probe AI Agent Trigger Channels.
- **Tools**: AML.T0053 AI Agent Tool Invocation; AML.T0110 AI Agent Tool Poisoning with `.000` Definition and Instructions, `.001` Implementation, `.002` Runtime Response; AML.T0099 AI Agent Tool Data Poisoning; AML.T0010.005 AI Supply Chain Compromise: AI Agent Tool; AML.T0011.002 User Execution: Poisoned AI Agent Tool; AML.T0115.002 Publish Poisoned AI Artifacts: AI Agent Tools; AML.T0016.004 and AML.T0017.002 (obtain or develop AI agent tools).
- **Context and memory**: AML.T0051 LLM Prompt Injection (`.000` Direct, `.001` Indirect, `.002` Triggered); AML.T0080 AI Agent Context Poisoning with `.000` Memory and `.001` Thread; AML.T0130 AI Agent Response Biasing; AML.T0131 Crafted AI Assistant Links; AML.T0134 AI Targeted Cloaking; AML.T0100 AI Agent Clickbait (bait computer-using agents and AI browsers).
- **Credentials and data**: AML.T0083 Credentials from AI Agent Configuration; AML.T0098 AI Agent Tool Credential Harvesting; AML.T0085.001 Data from AI Services: AI Agent Tools; AML.T0086 Exfiltration via AI Agent Tool Invocation; AML.T0101 Data Destruction via AI Agent Tool Invocation; AML.T0034.002 Agentic Resource Consumption.
- **Agents as adversary infrastructure**: AML.T0103 Deploy AI Agent; AML.T0108 AI Agent (command and control); AML.T0112.000 Local AI Agent; AML.T0116 Autonomous Reconnaissance; AML.T0117 Autonomous Attack-Path Adaptation; AML.T0118 Autonomous AI Agent Communication (`.000` via Shared Artifacts, `.001` Direct); AML.T0124 Autonomous Attack Orchestration.

Only these techniques exist in 2026.09. Do not invent agentic IDs or names from other frameworks; map them to the nearest ATLAS technique instead.

## The matrix (2026.09)

Tactics in matrix order (`sequences` `position` 1 to 16). Platforms use the letters above. The ATT&CK column is the technique's `attack-reference`.

### AML.TA0002 Reconnaissance (ATT&CK TA0043)

| Id          | Technique                             | Sub-techniques                                                                                                                                           | Platforms | Maturity     | ATT&CK |
| ----------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------ | ------ |
| `AML.T0000` | Search Open Technical Databases       | `000` Journals and Conference Proceedings, `001` Pre-Print Repositories, `002` Technical Blogs, `003` Scan Databases                                     | E         | Realized     | T1596  |
| `AML.T0001` | Search Open AI Vulnerability Analysis |                                                                                                                                                          | E         | Demonstrated |        |
| `AML.T0003` | Search Victim-Owned Websites          |                                                                                                                                                          | E         | Demonstrated | T1594  |
| `AML.T0004` | Search Application Repositories       |                                                                                                                                                          | E         | Demonstrated |        |
| `AML.T0006` | Active Scanning                       | `000` Enumerate Hosted AI Resources, `001` Query Platform Metadata APIs, `002` Scan for Exposed AI Infrastructure, `003` Probe AI Agent Trigger Channels | PGAE      | Realized     | T1595  |
| `AML.T0064` | Gather RAG-Indexed Targets            |                                                                                                                                                          | GA        | Demonstrated |        |
| `AML.T0087` | Gather Victim Identity Information    |                                                                                                                                                          | E         | Realized     | T1589  |
| `AML.T0095` | Search Open Websites/Domains          | `000` Code Repositories                                                                                                                                  | E         | Realized     | T1593  |
| `AML.T0116` | Autonomous Reconnaissance             |                                                                                                                                                          | PGAE      | Realized     |        |

### AML.TA0003 Resource Development (ATT&CK TA0042)

| Id          | Technique                     | Sub-techniques                                                                                                                                      | Platforms | Maturity     | ATT&CK |
| ----------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------ | ------ |
| `AML.T0002` | Acquire Public AI Artifacts   | `000` Datasets, `001` Models, `002` AI Agent Configuration                                                                                          | PGA       | Realized     |        |
| `AML.T0008` | Acquire Infrastructure        | `000` AI Development Workspaces, `001` Consumer Hardware, `002` Domains, `003` Physical Countermeasures, `004` Serverless, `005` AI Service Proxies | E         | Realized     | T1583  |
| `AML.T0016` | Obtain Capabilities           | `000` Adversarial AI Attack Implementations, `001` Software Tools, `002` Generative AI, `003` Exploits, `004` AI Agent Tools                        | PGAE      | Realized     | T1588  |
| `AML.T0017` | Develop Capabilities          | `000` Adversarial AI Attacks, `001` Autonomous Exploit Development, `002` AI Agent Tools                                                            | PGAE      | Realized     | T1587  |
| `AML.T0021` | Establish Accounts            |                                                                                                                                                     | E         | Realized     | T1585  |
| `AML.T0060` | Publish Hallucinated Entities |                                                                                                                                                     | GA        | Demonstrated |        |
| `AML.T0079` | Stage Capabilities            |                                                                                                                                                     | E         | Realized     |        |
| `AML.T0115` | Publish Poisoned AI Artifacts | `000` Datasets, `001` Models, `002` AI Agent Tools                                                                                                  | PGA       | Realized     |        |
| `AML.T0128` | Compromise Infrastructure     |                                                                                                                                                     | E         | Realized     | T1584  |

### AML.TA0001 AI Attack Adaptation (ATLAS-only)

| Id          | Technique                         | Sub-techniques                                                                                                                                 | Platforms | Maturity     | ATT&CK |
| ----------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------ | ------ |
| `AML.T0005` | Create Proxy AI Model             | `000` Train Proxy via Gathered AI Artifacts, `001` Train Proxy via Replication, `002` Use Pre-Trained Model                                    | PGA       | Demonstrated |        |
| `AML.T0018` | Manipulate AI Model               | `000` Poison AI Model, `001` Modify AI Model Architecture, `002` Embed Malware, `003` Modify Prompt Construction Logic                         | PGA       | Realized     |        |
| `AML.T0042` | Verify Attack                     |                                                                                                                                                | PGA       | Demonstrated |        |
| `AML.T0043` | Craft Adversarial Data            | `000` White-Box Optimization, `001` Black-Box Optimization, `002` Black-Box Transfer, `003` Manual Modification, `004` Insert Backdoor Trigger | P         | Realized     |        |
| `AML.T0065` | LLM Prompt Crafting               |                                                                                                                                                | GA        | Realized     |        |
| `AML.T0066` | Retrieval Content Crafting        |                                                                                                                                                | GA        | Demonstrated |        |
| `AML.T0088` | Generate Deepfakes                |                                                                                                                                                | PE        | Realized     |        |
| `AML.T0102` | Generate Malicious Commands       |                                                                                                                                                | E         | Realized     |        |
| `AML.T0117` | Autonomous Attack-Path Adaptation |                                                                                                                                                | PGAE      | Realized     |        |
| `AML.T0118` | Autonomous AI Agent Communication | `000` Communication via Shared Artifacts, `001` Direct Agent Communication                                                                     | AE        | Realized     |        |
| `AML.T0124` | Autonomous Attack Orchestration   |                                                                                                                                                | PGAE      | Realized     |        |

### AML.TA0004 Initial Access (ATT&CK TA0001)

| Id          | Technique                                         | Sub-techniques                                                                                            | Platforms | Maturity     | ATT&CK |
| ----------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------- | ------------ | ------ |
| `AML.T0010` | AI Supply Chain Compromise                        | `000` Hardware, `001` AI Software, `002` Data, `003` Model, `004` Container Registry, `005` AI Agent Tool | PGA       | Realized     |        |
| `AML.T0012` | Valid Accounts                                    |                                                                                                           | E         | Realized     | T1078  |
| `AML.T0015` | Evade AI Model                                    |                                                                                                           | P         | Realized     |        |
| `AML.T0049` | Exploit Public-Facing Application                 |                                                                                                           | E         | Realized     | T1190  |
| `AML.T0052` | Phishing                                          | `000` Spearphishing via Social Engineering LLM, `001` Deepfake-Assisted Phishing                          | E         | Realized     | T1566  |
| `AML.T0078` | Drive-by Compromise                               |                                                                                                           | E         | Demonstrated | T1189  |
| `AML.T0093` | Prompt Infiltration via Public-Facing Application |                                                                                                           | GA        | Demonstrated |        |
| `AML.T0119` | Exploit Automated Artifact Processing Pipeline    |                                                                                                           | E         | Realized     |        |
| `AML.T0131` | Crafted AI Assistant Links                        |                                                                                                           | GA        | Realized     |        |
| `AML.T0132` | Misconfigured or Publicly Exposed AI Services     |                                                                                                           | PGA       | Demonstrated |        |

### AML.TA0000 AI Model Access (ATLAS-only)

| Id          | Technique                     | Sub-techniques | Platforms | Maturity     | ATT&CK |
| ----------- | ----------------------------- | -------------- | --------- | ------------ | ------ |
| `AML.T0040` | AI Model Inference API Access |                | PGA       | Realized     |        |
| `AML.T0041` | Physical Environment Access   |                | PGA       | Demonstrated |        |
| `AML.T0044` | Full AI Model Access          |                | PGA       | Demonstrated |        |
| `AML.T0047` | AI-Enabled Product or Service |                | PGA       | Realized     |        |

### AML.TA0005 Execution (ATT&CK TA0002)

| Id          | Technique                         | Sub-techniques                                                                                         | Platforms | Maturity     | ATT&CK |
| ----------- | --------------------------------- | ------------------------------------------------------------------------------------------------------ | --------- | ------------ | ------ |
| `AML.T0011` | User Execution                    | `000` Unsafe AI Artifacts, `001` Malicious Package, `002` Poisoned AI Agent Tool, `003` Malicious Link | PGAE      | Realized     |        |
| `AML.T0050` | Command and Scripting Interpreter |                                                                                                        | E         | Realized     | T1059  |
| `AML.T0051` | LLM Prompt Injection              | `000` Direct, `001` Indirect, `002` Triggered                                                          | GA        | Realized     |        |
| `AML.T0053` | AI Agent Tool Invocation          |                                                                                                        | A         | Demonstrated |        |
| `AML.T0100` | AI Agent Clickbait                |                                                                                                        | A         | Demonstrated |        |
| `AML.T0103` | Deploy AI Agent                   |                                                                                                        | A         | Realized     |        |

### AML.TA0006 Persistence (ATT&CK TA0003)

| Id          | Technique                                         | Sub-techniques                                                                                                         | Platforms | Maturity     | ATT&CK |
| ----------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------- | ------------ | ------ |
| `AML.T0018` | Manipulate AI Model                               | `000` Poison AI Model, `001` Modify AI Model Architecture, `002` Embed Malware, `003` Modify Prompt Construction Logic | PGA       | Realized     |        |
| `AML.T0020` | Training Data Poisoning                           |                                                                                                                        | PGA       | Realized     |        |
| `AML.T0061` | LLM Prompt Self-Replication                       |                                                                                                                        | GA        | Demonstrated |        |
| `AML.T0070` | RAG Poisoning                                     |                                                                                                                        | GA        | Demonstrated |        |
| `AML.T0080` | AI Agent Context Poisoning                        | `000` Memory, `001` Thread                                                                                             | GA        | Realized     |        |
| `AML.T0081` | Modify AI Agent Configuration                     |                                                                                                                        | A         | Demonstrated |        |
| `AML.T0093` | Prompt Infiltration via Public-Facing Application |                                                                                                                        | GA        | Demonstrated |        |
| `AML.T0099` | AI Agent Tool Data Poisoning                      |                                                                                                                        | A         | Feasible     |        |
| `AML.T0110` | AI Agent Tool Poisoning                           | `000` Definition and Instructions, `001` Implementation, `002` Runtime Response                                        | A         | Realized     |        |
| `AML.T0121` | AI Agent Environment Reconstruction               |                                                                                                                        | E         | Realized     |        |
| `AML.T0125` | Create Account                                    |                                                                                                                        | E         | Realized     | T1136  |

### AML.TA0012 Privilege Escalation (ATT&CK TA0004)

| Id          | Technique                | Sub-techniques | Platforms | Maturity     | ATT&CK |
| ----------- | ------------------------ | -------------- | --------- | ------------ | ------ |
| `AML.T0012` | Valid Accounts           |                | E         | Realized     | T1078  |
| `AML.T0053` | AI Agent Tool Invocation |                | A         | Demonstrated |        |
| `AML.T0054` | LLM Jailbreak            |                | GA        | Realized     |        |
| `AML.T0105` | Escape to Host           |                | E         | Realized     | T1611  |

### AML.TA0007 Defense Evasion (ATT&CK TA0005)

| Id          | Technique                                  | Sub-techniques  | Platforms | Maturity     | ATT&CK |
| ----------- | ------------------------------------------ | --------------- | --------- | ------------ | ------ |
| `AML.T0015` | Evade AI Model                             |                 | P         | Realized     |        |
| `AML.T0054` | LLM Jailbreak                              |                 | GA        | Realized     |        |
| `AML.T0067` | LLM Trusted Output Components Manipulation | `000` Citations | GA        | Demonstrated |        |
| `AML.T0068` | LLM Prompt Obfuscation                     |                 | GA        | Realized     |        |
| `AML.T0071` | False RAG Entry Injection                  |                 | GA        | Demonstrated |        |
| `AML.T0073` | Impersonation                              |                 | E         | Realized     | T1656  |
| `AML.T0074` | Masquerading                               |                 | E         | Realized     | T1036  |
| `AML.T0076` | Corrupt AI Model                           |                 | PGA       | Realized     |        |
| `AML.T0081` | Modify AI Agent Configuration              |                 | A         | Demonstrated |        |
| `AML.T0092` | Manipulate User LLM Chat History           |                 | GA        | Demonstrated |        |
| `AML.T0094` | Delay Execution of LLM Instructions        |                 | GA        | Demonstrated |        |
| `AML.T0097` | Virtualization/Sandbox Evasion             |                 | E         | Realized     | T1497  |
| `AML.T0107` | Exploitation for Defense Evasion           |                 | E         | Demonstrated | T1211  |
| `AML.T0109` | AI Supply Chain Rug Pull                   |                 | PGA       | Realized     |        |
| `AML.T0111` | AI Supply Chain Reputation Inflation       |                 | PGA       | Demonstrated |        |
| `AML.T0123` | Obfuscated Files or Information            |                 | PE        | Realized     |        |
| `AML.T0129` | Triggers in Multimodal Inputs              |                 | GA        | Feasible     |        |
| `AML.T0134` | AI Targeted Cloaking                       |                 | A         | Feasible     |        |

### AML.TA0013 Credential Access (ATT&CK TA0006)

| Id          | Technique                               | Sub-techniques | Platforms | Maturity     | ATT&CK |
| ----------- | --------------------------------------- | -------------- | --------- | ------------ | ------ |
| `AML.T0055` | Unsecured Credentials                   |                | E         | Realized     | T1552  |
| `AML.T0082` | RAG Credential Harvesting               |                | GA        | Demonstrated |        |
| `AML.T0083` | Credentials from AI Agent Configuration |                | A         | Demonstrated |        |
| `AML.T0090` | OS Credential Dumping                   |                | E         | Demonstrated | T1003  |
| `AML.T0098` | AI Agent Tool Credential Harvesting     |                | A         | Demonstrated |        |
| `AML.T0106` | Exploitation for Credential Access      |                | E         | Demonstrated | T1211  |
| `AML.T0113` | Steal Web Session Cookie                |                | E         | Demonstrated | T1539  |

### AML.TA0008 Discovery (ATT&CK TA0007)

| Id          | Technique                              | Sub-techniques                                                                                 | Platforms | Maturity     | ATT&CK |
| ----------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- | --------- | ------------ | ------ |
| `AML.T0007` | Discover AI Artifacts                  |                                                                                                | PGA       | Demonstrated |        |
| `AML.T0013` | Discover AI Model Ontology             |                                                                                                | P         | Demonstrated |        |
| `AML.T0014` | Discover AI Model Family               |                                                                                                | PGA       | Feasible     |        |
| `AML.T0062` | Discover LLM Hallucinations            |                                                                                                | GA        | Demonstrated |        |
| `AML.T0063` | Discover AI Model Outputs              |                                                                                                | PGA       | Demonstrated |        |
| `AML.T0069` | Discover LLM System Information        | `000` Special Character Sets, `001` System Instruction Keywords, `002` System Prompt           | GA        | Demonstrated |        |
| `AML.T0075` | Enterprise Resource Discovery          |                                                                                                | E         | Realized     |        |
| `AML.T0084` | Discover AI Agent Configuration        | `000` Embedded Knowledge, `001` Tool Definitions, `002` Activation Triggers, `003` Call Chains | A         | Demonstrated |        |
| `AML.T0089` | Enterprise Environment Discovery       |                                                                                                | E         | Realized     |        |
| `AML.T0133` | Discover AI Agent Runtime Capabilities |                                                                                                | A         | Feasible     |        |

### AML.TA0015 Lateral Movement (ATT&CK TA0008)

| Id          | Technique                             | Sub-techniques                                                                   | Platforms | Maturity     | ATT&CK |
| ----------- | ------------------------------------- | -------------------------------------------------------------------------------- | --------- | ------------ | ------ |
| `AML.T0012` | Valid Accounts                        |                                                                                  | E         | Realized     | T1078  |
| `AML.T0052` | Phishing                              | `000` Spearphishing via Social Engineering LLM, `001` Deepfake-Assisted Phishing | E         | Realized     | T1566  |
| `AML.T0053` | AI Agent Tool Invocation              |                                                                                  | A         | Demonstrated |        |
| `AML.T0091` | Use Alternate Authentication Material | `000` Application Access Token, `001` Web Session Cookie                         | E         | Realized     | T1550  |
| `AML.T0122` | Exploitation of Remote Services       |                                                                                  | E         | Realized     | T1210  |

### AML.TA0009 Collection (ATT&CK TA0009)

| Id          | Technique                          | Sub-techniques                            | Platforms | Maturity     | ATT&CK |
| ----------- | ---------------------------------- | ----------------------------------------- | --------- | ------------ | ------ |
| `AML.T0035` | AI Artifact Collection             |                                           | PGA       | Realized     |        |
| `AML.T0036` | Data from Information Repositories |                                           | E         | Realized     | T1213  |
| `AML.T0037` | Data from Local System             |                                           | E         | Realized     | T1005  |
| `AML.T0085` | Data from AI Services              | `000` RAG Databases, `001` AI Agent Tools | GA        | Demonstrated |        |
| `AML.T0126` | Automated Collection               |                                           | E         | Realized     | T1119  |
| `AML.T0127` | Data Staged                        |                                           | E         | Realized     | T1074  |

### AML.TA0014 Command and Control (ATT&CK TA0011)

| Id          | Technique                   | Sub-techniques | Platforms | Maturity     | ATT&CK |
| ----------- | --------------------------- | -------------- | --------- | ------------ | ------ |
| `AML.T0072` | Cyber Communication Channel |                | E         | Realized     |        |
| `AML.T0096` | AI Service API              |                | PGA       | Realized     |        |
| `AML.T0108` | AI Agent                    |                | A         | Demonstrated |        |
| `AML.T0114` | AI Service Web Interface    |                | E         | Demonstrated |        |
| `AML.T0120` | AI Artifact Repository      |                | PGAE      | Realized     |        |

### AML.TA0010 Exfiltration (ATT&CK TA0010)

| Id          | Technique                                 | Sub-techniques                                                                      | Platforms | Maturity     | ATT&CK |
| ----------- | ----------------------------------------- | ----------------------------------------------------------------------------------- | --------- | ------------ | ------ |
| `AML.T0024` | Exfiltration via AI Inference API         | `000` Infer Training Data Membership, `001` Invert AI Model, `002` Extract AI Model | PGA       | Realized     |        |
| `AML.T0025` | Exfiltration via Cyber Means              |                                                                                     | E         | Realized     |        |
| `AML.T0056` | Extract LLM System Prompt                 |                                                                                     | GA        | Feasible     |        |
| `AML.T0057` | LLM Data Leakage                          |                                                                                     | GA        | Demonstrated |        |
| `AML.T0077` | LLM Response Rendering                    |                                                                                     | GA        | Demonstrated |        |
| `AML.T0086` | Exfiltration via AI Agent Tool Invocation |                                                                                     | A         | Realized     |        |

### AML.TA0011 Impact (ATT&CK TA0040)

| Id          | Technique                                     | Sub-techniques                                                                                                            | Platforms | Maturity     | ATT&CK |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------- | ------------ | ------ |
| `AML.T0015` | Evade AI Model                                |                                                                                                                           | P         | Realized     |        |
| `AML.T0029` | Denial of AI Service                          |                                                                                                                           | PGA       | Demonstrated |        |
| `AML.T0031` | Erode AI Model Integrity                      |                                                                                                                           | PGA       | Realized     |        |
| `AML.T0034` | Cost Harvesting                               | `000` Excessive Queries, `001` Resource-Intensive Queries, `002` Agentic Resource Consumption                             | PGA       | Feasible     |        |
| `AML.T0046` | Spamming AI System with Chaff Data            |                                                                                                                           | PGA       | Feasible     |        |
| `AML.T0048` | External Harms                                | `000` Financial Harm, `001` Reputational Harm, `002` Societal Harm, `003` User Harm, `004` AI Intellectual Property Theft | PGAE      | Realized     |        |
| `AML.T0059` | Erode Dataset Integrity                       |                                                                                                                           | PGA       | Demonstrated |        |
| `AML.T0101` | Data Destruction via AI Agent Tool Invocation |                                                                                                                           | A         | Realized     |        |
| `AML.T0112` | Machine Compromise                            | `000` Local AI Agent, `001` AI Artifacts                                                                                  | PGA       | Demonstrated |        |
| `AML.T0130` | AI Agent Response Biasing                     |                                                                                                                           | GA        | Realized     |        |
