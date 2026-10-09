# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The OWASP ML Security Top Ten has no MUST or SHALL keywords, so each risk is given by its description and by the How to Prevent controls that drive implementation, quoted as written. Apply the ones that match the role. Each is labelled with its risk id.

## ML01:2023 Input Manipulation Attack

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML01_2023-Input_Manipulation_Attack.md

- **ML01:2023.** Input Manipulation Attacks is an umbrella term, which include Adversarial Attacks, a type of attack in which an attacker deliberately alters input data to mislead the model.
- **ML01:2023.** This involves checking the input data for anomalies, such as unexpected values or patterns, and rejecting inputs that are likely to be malicious.

## ML02:2023 Data Poisoning Attack

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML02_2023-Data_Poisoning_Attack.md

- **ML02:2023.** Data poisoning attacks occur when an attacker manipulates the training data to cause the model to behave in an undesirable way.
- **ML02:2023.** Ensure that the training data is thoroughly validated and verified before it is used to train the model.
- **ML02:2023.** Implement access controls to limit who can access the training data and when they can access it.
- **ML02:2023.** Validate the model using a separate validation set that has not been used during training.

## ML03:2023 Model Inversion Attack

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML03_2023-Model_Inversion_Attack.md

- **ML03:2023.** Model inversion attacks occur when an attacker reverse-engineers the model to extract information from it.
- **ML03:2023.** Limiting access to the model or its predictions can prevent attackers from obtaining the information needed to invert the model.

## ML04:2023 Membership Inference Attack

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML04_2023-Membership_Inference_Attack.md

- **ML04:2023.** Membership inference attacks occur when an attacker manipulates the model's training data in order to cause it to behave in a way that exposes sensitive information.
- **ML04:2023.** Obfuscating the model's predictions by adding random noise or using differential privacy techniques can help prevent membership inference attacks by making it harder for an attacker to determine the model's training data.

## ML05:2023 Model Theft

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML05_2023-Model_Theft.md

- **ML05:2023.** Model theft attacks occur when an attacker gains access to the model's parameters.
- **ML05:2023.** Implementing strict access control measures, such as two-factor authentication, can prevent unauthorized individuals from accessing and stealing the model.

## ML06:2023 AI Supply Chain Attacks

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML06_2023-AI_Supply_Chain_Attacks.md

- **ML06:2023.** In ML Supply Chain Attacks threat actors target the supply chain of ML models.
- **ML06:2023.** Before using any packages in your infrastructure or application dependencies, verify the authenticity of the package by checking the digital signature of the package.
- **ML06:2023.** Ensure that only authorized personnel have access to the MLOps platforms.

## ML07:2023 Transfer Learning Attack

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML07_2023-Transfer_Learning_Attack.md

- **ML07:2023.** Transfer learning attacks occur when an attacker trains a model on one task and then fine-tunes it on another task to cause it to behave in an undesirable way.
- **ML07:2023.** For example, separating the training and deployment environments can prevent attackers from transferring knowledge from the training environment to the deployment environment.

## ML08:2023 Model Skewing

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML08_2023-Model_Skewing.md

- **ML08:2023.** Model skewing attacks occur when an attacker manipulates the distribution of the training data to cause the model to behave in an undesirable way.
- **ML08:2023.** Use techniques such as digital signatures and checksums to verify that the feedback data received by the system is genuine, and reject any data that does not match the expected format.

## ML09:2023 Output Integrity Attack

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML09_2023-Output_Integrity_Attack.md

- **ML09:2023.** In an Output Integrity Attack scenario, an attacker aims to modify or manipulate the output of a machine learning model in order to change its behavior or cause harm to the system it is used in.
- **ML09:2023.** Communication channels between the model and the interface responsible for displaying the results should be secured using secure protocols such as SSL/TLS.
- **ML09:2023.** Maintaining tamper-evident logs of all input and output interactions can help detect and respond to any output integrity attacks.

## ML10:2023 Model Poisoning

Source: https://raw.githubusercontent.com/OWASP/www-project-machine-learning-security-top-10/b3addcd63769cf3176c1ac75ea9a21a6a7e0241d/docs/ML10_2023-Model_Poisoning.md

- **ML10:2023.** Adding regularisation techniques like L1 or L2 regularization to the loss function helps to prevent overfitting and reduce the chance of model poisoning attacks.
- **ML10:2023.** Cryptographic techniques can be used to secure the parameters and weights of the model, and prevent unauthorized access or manipulation of these parameters.
