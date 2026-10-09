# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The AI Exchange has no MUST or SHALL keywords, so each control is given by its description as written. Apply the ones that match the role and the threats in scope. Each is labelled with its control tag.

## 1. General controls

Source: https://raw.githubusercontent.com/OWASP/www-project-ai-security-and-privacy-guide/e894338312f9a9f448bfd7ece3e412cfbce890ce/content/ai_exchange/content/docs/1_general_controls.md

- **#AI PROGRAM.** AI program: Install and execute a program to govern AI.
- **#DATA MINIMIZE.** Data minimize: remove data fields or records (e.g. from a training set) that are unnecessary for the application, in order to prevent potential data leaks or manipulation because we cannot leak what isn't there in the first place
- **#OVERSIGHT.** Oversight of internal and external AI system behaviour by humans and/or automated mechanisms (e.g.,using rules).
- **#LEAST MODEL PRIVILEGE.** Least model privilege: Minimize what a model can do (trigger actions or access data), to prevent harm in case the model is manipulated, or makes a mistake by itself.
- **#LEAST MODEL PRIVILEGE.** Execute actions of AI systems with the rights and privileges of the user or service being served.
- **#CONTINUOUS VALIDATION.** Continuous validation: by frequently testing the behaviour of the model against an appropriate test set, it is possible to detect sudden changes caused by a permanent attack (e.g. data poisoning, model poisoning), and also some robustness issues against for example evasion attacks.

## 2. Threats through use

Source: https://raw.githubusercontent.com/OWASP/www-project-ai-security-and-privacy-guide/e894338312f9a9f448bfd7ece3e412cfbce890ce/content/ai_exchange/content/docs/2_threats_through_use.md

- **#MONITOR USE.** Monitor use: observe, correlate, and log model usage (date, time, user), inputs, outputs, and system behavior to identify events or patterns that may indicate a cybersecurity incident.
- **#RATE LIMIT.** Limit the rate (frequency) of access to the model - preferably per actor (user, API key or session).
- **#MODEL ACCESS CONTROL.** Restrict access to model inference functions to approved and identifiable users.
- **#PROMPT INJECTION I/O HANDLING.** This control focuses on detecting, containing, and responding to unwanted or unsafe behavior that is introduced through model inputs or observed in model outputs.
- **#INPUT SEGREGATION.** Input segregation: clearly separate/delimit/delineate untrusted data from trusted instructions when inserting it into a prompt and instruct the model to ignore instructions in that data.
- **#SENSITIVE OUTPUT HANDLING.** Handle sensitive model output by actively detecting and blocking, masking, stopping, or logging the unwanted disclosure of data.
- **#LIMIT RESOURCES.** Quotas must be enforced by containers, API gateways, or orchestration — not by the agent.

## 3. Development-time threats

Source: https://raw.githubusercontent.com/OWASP/www-project-ai-security-and-privacy-guide/e894338312f9a9f448bfd7ece3e412cfbce890ce/content/ai_exchange/content/docs/3_development_time_threats.md

- **#DEV SECURITY.** Development security: appropriate security of the AI development infrastructure, also taking into account the sensitive information that is typical to AI: training data, test data, model parameters and technical documentation.
- **#SUPPLY CHAIN MANAGE.** Supply chain management focuses on managing the supply chain to minimize the security risk from externally obtained elements.
- **#DATA QUALITY CONTROL.** Data quality control: Perform quality control on data including detecting poisoned samples through integrity checks, statistical deviation or pattern recognition.

## 4. Runtime application security threats

Source: https://raw.githubusercontent.com/OWASP/www-project-ai-security-and-privacy-guide/e894338312f9a9f448bfd7ece3e412cfbce890ce/content/ai_exchange/content/docs/4_runtime_application_security_threats.md

- **#RUNTIME MODEL INTEGRITY.** Run-time model integrity: apply traditional conventional security controls to protect the storage of model parameters (e.g., access control, checksums, encryption)
- **#ENCODE MODEL OUTPUT.** Encode model output: apply output encoding on model output if it's text.
- **#AUGMENTATION DATA INTEGRITY.** Protect the integrity of augmentation data at rest and in transit — vector stores, system prompt storage, RAG indexes, and agent working or long-term memory.
