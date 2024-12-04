# Run Playwright Tests

```bash
npx playwright test
```

### View HTML Report

```bash
npx playwright show-report --host 0.0.0.0
```

### Everything below this line can only be ran outside of a container

---

### Run Playwright Test Inspector UI

```bash
npx playwright test --ui
```

### To run Codegen with pre-authentication

```bash
npx playwright codegen --load-storage=e2e/test-results/user.json "$PHAMILY_CORE_WEB_URL/choose_account"
```

### Pro tips

| Error                        | Solution                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| Invalid Playwright           | You may need to run `npx playwright install` to run tests.                          |
| Invalid Login                | You may need to change `PLAYWRIGHT_USERNAME` to a different account.                |
| Invalid Login 2              | You may need to add the password for `PLAYWRIGHT_PASSWORD`.                         |
| Invalid Login 3              | You may need to run `npx playwright test` to regenerate authentication credentials. |
| Invalid enviroment variables | You may need to re-run `source env.sh` in Leviathen if you open a new terminal.     |
