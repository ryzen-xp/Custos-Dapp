# Custos Contributor Guidelines

Thank you for your interest in contributing to Custos! We welcome contributions of all types, whether you're fixing a bug, adding new features, or improving documentation. Please follow these guidelines to ensure a smooth contribution process.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [How to Contribute](#how-to-contribute)
3. [Setting Up the Project](#setting-up-the-project)
4. [Branching and Commit Guidelines](#branching-and-commit-guidelines)
5. [Pull Requests](#pull-requests)
6. [Coding Standards](#coding-standards)
7. [Styling Guidelines](#styling-guidelines)
8. [Issue Reporting](#issue-reporting)
9. [Resources](#resources)
10. [License](#license)

---

## 1. Code of Conduct

Please read and adhere to our [Code of Conduct](#). We expect all contributors to act with respect and professionalism when engaging with the Custos community.

---

## 2. How to Contribute

There are several ways you can contribute to Custos:

- **Report Bugs**: If you find any bugs or issues, please report them by opening an issue on GitHub.
- **Submit Feature Requests**: If you have an idea for a new feature, create an issue describing the feature and how it can benefit the project.
- **Fix Issues**: Look through our open issues for bugs or enhancements, and submit a pull request (PR) with your fix or improvement.
- **Improve Documentation**: Contributions to the documentation are always appreciated.

---

## 3. Setting Up the Project

Before contributing, you need to set up the project locally:

1. Fork the repository from the [Custos GitHub](https://github.com/Custos-Diretriz/Custos-Dapp).
2. Clone your fork to your local machine:
   ```bash
   git clone https://github.com/your-username/Custos-Dapp.git
   ```
3. Navigate to the project directory:
   ```bash
   cd Custos-Dapp
   ```
4. Install project dependencies:
   ```bash
   yarn
   ```
5. Run the project:
   ```bash
   yarn dev
   ```
6. Ensure everything is working properly before making any changes.

---

## 4. Branching and Commit Guidelines

- **Branch Naming**: 
  - `feature/your-feature-name` for new features.
  - `bugfix/issue-number-description` for bug fixes.
  - `hotfix/critical-fix` for critical updates.

- **Commit Messages**: Write clear, descriptive commit messages following this template:
  - **Short Summary**: What the commit does.
  - **Details**: (Optional) Any relevant details or context.

  **Example**:
  ```
  fix: resolve issue with user authentication

  Fixed a bug where users were unable to log in after a token expired.
  ```

---

## 5. Pull Requests

- **Submitting a Pull Request**:
  1. Ensure your branch is up to date with the main branch:
     ```bash
     git pull origin master
     ```
  2. Push your branch to your forked repository:
     ```bash
     git push origin your-branch-name
     ```
  3. Open a Pull Request (PR) against the master branch of Custos.

- **Checklist Before Submitting**:
  - Provide a clear description of the problem/feature in the PR.
  - Ensure your code follows the project’s [Coding Standards](#coding-standards).
  - Link any relevant issues in the PR description (e.g., closes #issue-number).

- **PR Review Process**:
  - PRs will be reviewed by maintainers.
  - You may be asked to make changes. Please respond promptly to feedback.
  - Once approved and merged, your contribution will become part of Custos!

---

## 6. Coding Standards

- **Style Guide**: Follow our coding style, which is based on ESLint rules for JavaScript.
- **Code Quality**: Write clean, readable, and maintainable code. Use meaningful names for variables, functions, and classes.
- **Testing**: Ensure your changes are covered by tests. Run tests locally before submitting a PR

---

## 7. Styling Guidelines

We use **Tailwind CSS** for styling across the project. Please ensure that all UI changes adhere to Tailwind's utility-first approach.

- Use [Tailwind CSS documentation](https://tailwindcss.com/docs) as a reference for styling components.
- Ensure that your changes align with our design system by following the [Figma design](https://www.figma.com/design/3nZ7dFPCVz4fdnfP5ZGlL6/Custos-Diretriz?node-id=0-1&node-type=canvas&t=J2dpVtjrrrc7mZQK-0).

---

## 8. Issue Reporting

If you encounter any issues or have suggestions, please open an issue on GitHub using the following format:

- **Title**: A brief description of the issue.
- **Description**: A detailed explanation of the issue, including steps to reproduce it, if applicable.
- **Environment**: Include any relevant environment details (e.g., OS, browser, Node version).
- **Screenshots/Logs**: Attach screenshots or logs to help with debugging.

---

## 9. Resources

- [Custos Figma Design](https://www.figma.com/design/3nZ7dFPCVz4fdnfP5ZGlL6/Custos-Diretriz?node-id=0-1&node-type=canvas&t=J2dpVtjrrrc7mZQK-0)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---


We’re excited to have you contribute to Custos and look forward to building something amazing together!


