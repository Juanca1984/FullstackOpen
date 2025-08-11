import { test, expect } from '@playwright/test';

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      },
    });
    await page.goto('/');
  });

  test('5.17: Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible();
    await expect(page.getByLabel('username')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
  });

  test.describe('Login', () => {
    test('5.18: succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai');
      await page.getByLabel('password').fill('salainen');
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
    });

    test('5.18: fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai');
      await page.getByLabel('password').fill('wrong');
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('wrong username or password')).toBeVisible();
    });
  });

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai');
      await page.getByLabel('password').fill('salainen');
      await page.getByRole('button', { name: 'login' }).click();
    });

    test('5.19: a new blog can be created', async ({ page }) => {
      await page.getByText('create new blog').click();
      await page.getByLabel('title:').fill('E2E Blog');
      await page.getByLabel('author:').fill('Tester');
      await page.getByLabel('url:').fill('http://e2e.com');
      await page.getByRole('button', { name: 'create' }).click();
      await expect(page.getByText('E2E Blog Tester')).toBeVisible();
    });

    test('5.20: blog can be liked', async ({ page }) => {
      await page.getByText('view').click();
      await page.getByRole('button', { name: 'like' }).click();
      await expect(page.getByText('likes 1')).toBeVisible();
    });

    test('5.21: user can delete their own blog', async ({ page }) => {
      await page.getByText('view').click();
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'remove' }).click();
      await expect(page.locator('.blog')).not.toContainText('E2E Blog');
    });

    test('5.22: only creator sees remove button', async ({ page, request }) => {
      await page.getByRole('button', { name: 'logout' }).click();

      await request.post('http://localhost:3003/api/users', {
        data: {
          username: 'another',
          name: 'Another User',
          password: 'pass123',
        },
      });

      await page.getByLabel('username').fill('another');
      await page.getByLabel('password').fill('pass123');
      await page.getByRole('button', { name: 'login' }).click();
      await page.getByText('view').click();
      await expect(page.getByRole('button', { name: 'remove' })).toHaveCount(0);
    });

    test('5.23: blogs are ordered by likes', async ({ page }) => {
      await page.reload(); // recargar para actualizar los likes

      const blogs = await page.locator('.blog').all();
      const firstTitle = await blogs[0].locator('.title').innerText();
      const secondTitle = await blogs[1].locator('.title').innerText();

      expect(firstTitle).toContain('blog with most likes');
      expect(secondTitle).not.toContain('blog with most likes');
    });
  });
});
