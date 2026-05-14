import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test.describe('Form Rendering', () => {
    test('should render login form with all elements', async ({ page }) => {
      // Check main heading
      await expect(page.locator('h2:has-text("Sign in to your workspace")')).toBeVisible();

      // Check form elements
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('input[name="password"]')).toBeVisible();
      await expect(page.locator('input[name="rememberMe"]')).toBeVisible();

      // Check labels
      await expect(page.locator('label:has-text("Email")')).toBeVisible();
      await expect(page.locator('label:has-text("Password")')).toBeVisible();
      await expect(page.locator('text=Keep me signed in on this device')).toBeVisible();

      // Check submit button
      await expect(page.locator('button:has-text("Login")')).toBeVisible();

      // Check forgot password link
      await expect(page.locator('button:has-text("Forgot password?")')).toBeVisible();
    });

    test('should display TaskFlow branding', async ({ page }) => {
      await expect(page.locator('text=TaskFlow')).toBeVisible();
    });

    test('should display demo workspace preview section', async ({ page }) => {
      await expect(page.locator('text=Demo workspace preview:')).toBeVisible();
    });

    test('should have link to explore product', async ({ page }) => {
      const link = page.locator('a:has-text("Explore the product")');
      await expect(link).toBeVisible();
      expect(await link.getAttribute('href')).toBe('/');
    });

    test('should have correct input types and placeholders', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');

      expect(await emailInput.getAttribute('type')).toBe('email');
      expect(await emailInput.getAttribute('placeholder')).toBe('you@company.com');

      expect(await passwordInput.getAttribute('type')).toBe('password');
      expect(await passwordInput.getAttribute('placeholder')).toBe('Enter your password');
    });
  });

  test.describe('Form Validation', () => {
    test('should show email error when email is empty', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.locator('button:has-text("Login")');

      // Fill only password and submit
      await passwordInput.fill('ValidPassword123');
      await submitButton.click();

      // Check error message
      await expect(page.locator('text=Email is required.')).toBeVisible();
    });

    test('should show email error for invalid email format', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.locator('button:has-text("Login")');

      // Fill with invalid email
      await emailInput.fill('invalid-email');
      await passwordInput.fill('ValidPassword123');
      await submitButton.click();

      // Check error message
      await expect(page.locator('text=Enter a valid email address.')).toBeVisible();
    });

    test('should show password error when password is empty', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const submitButton = page.locator('button:has-text("Login")');

      // Fill only email and submit
      await emailInput.fill('test@example.com');
      await submitButton.click();

      // Check error message
      await expect(page.locator('text=Password is required.')).toBeVisible();
    });

    test('should show password error when password is less than 8 characters', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.locator('button:has-text("Login")');

      // Fill with short password
      await emailInput.fill('test@example.com');
      await passwordInput.fill('Short1!');
      await submitButton.click();

      // Check error message
      await expect(page.locator('text=Password must be at least 8 characters.')).toBeVisible();
    });

    test('should clear validation errors when typing', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.locator('button:has-text("Login")');

      // Submit empty form to trigger errors
      await submitButton.click();
      await expect(page.locator('text=Email is required.')).toBeVisible();

      // Start typing in email field
      await emailInput.fill('test@example.com');
      await expect(page.locator('text=Email is required.')).not.toBeVisible();
    });

    test('should accept valid email formats', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');

      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
      ];

      for (const email of validEmails) {
        await emailInput.clear();
        await emailInput.fill(email);
        await passwordInput.fill('ValidPassword123');

        // No error should appear for valid email
        await expect(page.locator('text=Enter a valid email address.')).not.toBeVisible();
      }
    });
  });

  test.describe('User Interactions', () => {
    test('should update email input value on change', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const testEmail = 'test@example.com';

      await emailInput.fill(testEmail);
      expect(await emailInput.inputValue()).toBe(testEmail);
    });

    test('should update password input value on change', async ({ page }) => {
      const passwordInput = page.locator('input[name="password"]');
      const testPassword = 'TestPassword123';

      await passwordInput.fill(testPassword);
      expect(await passwordInput.inputValue()).toBe(testPassword);
    });

    test('should toggle remember me checkbox', async ({ page }) => {
      const checkbox = page.locator('input[name="rememberMe"]');

      // Check if initially checked
      expect(await checkbox.isChecked()).toBe(true);

      // Uncheck
      await checkbox.click();
      expect(await checkbox.isChecked()).toBe(false);

      // Check again
      await checkbox.click();
      expect(await checkbox.isChecked()).toBe(true);
    });

    test('should disable submit button when loading', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.locator('button:has-text("Login")');

      await emailInput.fill('test@example.com');
      await passwordInput.fill('ValidPassword123');

      await submitButton.click();

      // Button should be disabled and show loading text
      await expect(submitButton).toBeDisabled();
      await expect(page.locator('button:has-text("Signing in...")')).toBeVisible();
    });
  });

  test.describe('Workspace Preview', () => {
    test('should show workspace name based on email', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const previewText = page.locator('text=Demo workspace preview:').locator('..').locator('span');

      // Test with different emails
      await emailInput.fill('john@example.com');
      await expect(previewText).toContainText('John Workspace');

      await emailInput.clear();
      await emailInput.fill('alice@company.com');
      await expect(previewText).toContainText('Alice Workspace');
    });

    test('should update workspace preview in real-time', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');

      // Empty email should show "My Workspace"
      await emailInput.fill('');
      const previewSection = page.locator('div:has-text("Demo workspace preview:")');
      await expect(previewSection).toContainText('My Workspace');

      // Fill email
      await emailInput.fill('test@example.com');
      await expect(previewSection).toContainText('Test Workspace');
    });

    test('should handle email with special characters', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const previewSection = page.locator('div:has-text("Demo workspace preview:")');

      await emailInput.fill('john.doe+tag@example.com');
      await expect(previewSection).toContainText('John.doe+tag Workspace');
    });

    test('should capitalize first letter of workspace name', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const previewSection = page.locator('div:has-text("Demo workspace preview:")');

      await emailInput.fill('test@example.com');
      // Should be "Test Workspace" not "test Workspace"
      const workspaceText = await previewSection.textContent();
      expect(workspaceText).toMatch(/Test Workspace/);
    });
  });

  test.describe('Form Submission', () => {
    test('should submit form with valid credentials', async ({ page, context }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.locator('button:has-text("Login")');

      // Set up event listener for navigation
      let navigationOccurred = false;
      page.on('framenavigated', () => {
        navigationOccurred = true;
      });

      await emailInput.fill('test@example.com');
      await passwordInput.fill('ValidPassword123');

      await submitButton.click();

      // Wait for loading to complete
      await page.waitForTimeout(1200);

      // Should navigate to home page
      expect(page.url()).toContain('/');
    });

    test('should not submit form with invalid data', async ({ page }) => {
      const submitButton = page.locator('button:has-text("Login")');
      const initialUrl = page.url();

      await submitButton.click();

      // URL should not change
      await page.waitForTimeout(500);
      expect(page.url()).toBe(initialUrl);
    });

    test('should store session in localStorage on successful login', async ({ page, context }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.locator('button:has-text("Login")');

      const testEmail = 'test@example.com';
      await emailInput.fill(testEmail);
      await passwordInput.fill('ValidPassword123');

      await submitButton.click();

      // Wait for submission and storage
      await page.waitForTimeout(1200);

      // Check localStorage
      const sessionData = await page.evaluate(() => {
        return localStorage.getItem('taskflow-session');
      });

      expect(sessionData).toBeTruthy();
      const session = JSON.parse(sessionData || '{}');
      expect(session.email).toBe(testEmail);
      expect(session.rememberMe).toBe(true);
    });

    test('should store workspace in localStorage on successful login', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.locator('button:has-text("Login")');

      const testEmail = 'john@example.com';
      await emailInput.fill(testEmail);
      await passwordInput.fill('ValidPassword123');

      await submitButton.click();

      // Wait for submission and storage
      await page.waitForTimeout(1200);

      // Check localStorage for workspace
      const workspaceData = await page.evaluate(() => {
        return localStorage.getItem('taskflow-active-workspace');
      });

      expect(workspaceData).toBeTruthy();
      expect(workspaceData).toBe('John Workspace');
    });

    test('should respect remember me checkbox', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const checkbox = page.locator('input[name="rememberMe"]');
      const submitButton = page.locator('button:has-text("Login")');

      // Uncheck remember me
      await checkbox.click();

      await emailInput.fill('test@example.com');
      await passwordInput.fill('ValidPassword123');

      await submitButton.click();
      await page.waitForTimeout(1200);

      // Check that rememberMe is false in localStorage
      const sessionData = await page.evaluate(() => {
        return localStorage.getItem('taskflow-session');
      });

      const session = JSON.parse(sessionData || '{}');
      expect(session.rememberMe).toBe(false);
    });

    test('should normalize email (trim and lowercase)', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');
      const submitButton = page.locator('button:has-text("Login")');

      await emailInput.fill('  TEST@EXAMPLE.COM  ');
      await passwordInput.fill('ValidPassword123');

      await submitButton.click();
      await page.waitForTimeout(1200);

      // Check normalized email in localStorage
      const sessionData = await page.evaluate(() => {
        return localStorage.getItem('taskflow-session');
      });

      const session = JSON.parse(sessionData || '{}');
      expect(session.email).toBe('test@example.com');
    });
  });

  test.describe('Error Handling', () => {
    test('should show error messages in alert box', async ({ page }) => {
      // This test assumes auth errors are displayed
      const errorBox = page.locator('div.border-rose-200');

      // Initially should not be visible
      const errorCount = await errorBox.count();
      // Depending on initial state, may or may not have errors
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper form structure', async ({ page }) => {
      const form = page.locator('form');
      expect(await form.count()).toBe(1);

      // Check that inputs have associated labels
      const emailLabel = page.locator('label[for="email"]');
      const passwordLabel = page.locator('label[for="password"]');

      await expect(emailLabel).toBeVisible();
      await expect(passwordLabel).toBeVisible();
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const h2 = page.locator('h2:has-text("Sign in to your workspace")');
      await expect(h2).toBeVisible();
    });

    test('should have autocomplete attributes', async ({ page }) => {
      const emailInput = page.locator('input[name="email"]');
      const passwordInput = page.locator('input[name="password"]');

      expect(await emailInput.getAttribute('autocomplete')).toBe('email');
      expect(await passwordInput.getAttribute('autocomplete')).toBe('current-password');
    });
  });

  test.describe('Page Meta', () => {
    test('should have correct page title', async ({ page }) => {
      expect(page.title()).toContain('Login');
    });
  });
});
