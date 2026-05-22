# Playwright Tests for Login Page

This directory contains Playwright unit tests for the `login.tsx` component.

## Test Coverage

The test suite includes comprehensive coverage for:

### Form Rendering
- All form elements render correctly (inputs, labels, buttons)
- LotusFlow branding display
- Demo workspace preview section
- Correct input types and placeholders
- Navigation links

### Form Validation
- Email validation (required, valid format)
- Password validation (required, minimum 8 characters)
- Error messages display correctly
- Validation errors clear on user input
- Various valid email format acceptance

### User Interactions
- Email input value updates
- Password input value updates
- Remember me checkbox toggle
- Submit button disabled state during loading
- Loading text display

### Workspace Preview
- Dynamic workspace name generation based on email
- Real-time preview updates
- Special character handling
- Proper name capitalization

### Form Submission
- Successful form submission with valid credentials
- Failed submission prevention with invalid data
- Session storage in localStorage
- Workspace storage in localStorage
- Remember me checkbox persistence
- Email normalization (trim, lowercase)

### Error Handling
- Error message display

### Accessibility
- Proper form structure
- Label associations with inputs
- Heading hierarchy
- Autocomplete attributes

### Page Meta
- Correct page title

## Setup Instructions

### 1. Install Playwright
```bash
npm install --save-dev @playwright/test
```

Or if using yarn:
```bash
yarn add --dev @playwright/test
```

### 2. Install Playwright Browsers
```bash
npx playwright install
```

### 3. Update package.json Scripts

Add the following test scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:headed": "playwright test --headed"
  }
}
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode
```bash
npm run test:ui
```

This launches the Playwright Test for VS Code extension or the Playwright Inspector for interactive testing.

### Run Tests in Headed Mode
```bash
npm run test:headed
```

This runs tests with visible browser windows.

### Run Tests in Debug Mode
```bash
npm run test:debug
```

This launches the Playwright Inspector for debugging.

### Run Specific Test File
```bash
npx playwright test login.spec.ts
```

### Run Specific Test Suite
```bash
npx playwright test --grep "Form Validation"
```

### Run Tests for Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### View Test Report
After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Test Configuration

The tests are configured in `playwright.config.ts` with:

- **Base URL**: `http://localhost:5173` (for the dev server)
- **Test Directory**: `app/pages/`
- **Test Match Pattern**: `**/*.spec.ts`
- **Browsers Tested**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Auto-start Dev Server**: The dev server starts automatically before tests
- **Screenshots**: Captured on failure
- **Traces**: Collected on first retry for debugging

## Writing Additional Tests

When adding new tests, follow this structure:

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('http://localhost:5173/login');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const emailInput = page.locator('input[name="email"]');
    
    // Act
    await emailInput.fill('test@example.com');
    
    // Assert
    await expect(emailInput).toHaveValue('test@example.com');
  });
});
```

## Best Practices

1. **Use Meaningful Test Names**: Test names should clearly describe what is being tested
2. **Follow AAA Pattern**: Arrange, Act, Assert
3. **Use Page Locators Wisely**: Prefer semantic locators (role, test-id) over CSS selectors
4. **Wait for Elements**: Use `waitFor` for elements that appear dynamically
5. **Clean State**: Clear localStorage and state between tests if needed
6. **Avoid Hard Waits**: Use `waitForSelector` or `waitForNavigation` instead of `setTimeout`

## Debugging Failed Tests

### Check Screenshots
Failed tests automatically capture screenshots in `test-results/` folder.

### View Traces
```bash
npx playwright show-trace path/to/trace.zip
```

### Debug Mode
```bash
npx playwright test --debug
```

### Check Console Logs
```typescript
page.on('console', msg => console.log(msg.text()));
```

## Environment Variables

Create a `.env` file in the `apps/web` directory for test-specific configuration:

```env
BASE_URL=http://localhost:5173
```

## CI/CD Integration

The tests are configured to run in CI environments. In CI mode:
- Tests run with 1 worker (sequential)
- Tests retry twice on failure
- Traces are collected on first retry
- Full HTML report is generated

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npx playwright test --base-url=http://localhost:3000
```

### Browser Installation Issues
```bash
npx playwright install --with-deps
```

### Tests Timing Out
Increase timeout in `playwright.config.ts`:
```typescript
use: {
  navigationTimeout: 30000,
  actionTimeout: 10000,
}
```

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Test Configuration Guide](https://playwright.dev/docs/test-configuration)
- [Best Practices](https://playwright.dev/docs/best-practices)
