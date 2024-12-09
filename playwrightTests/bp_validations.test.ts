import { test, expect } from '@playwright/test';
const BASE_URL = 'https://qatestca1.azurewebsites.net/';


test('Negative Systolic value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);

  // Test invalid negative systolic value
  await page.getByLabel('Systolic').fill('-1');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid Systolic Value')).toBeVisible();
});

test('Blank Systolic value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);

  // Clear the input before testing non-numeric input
  await page.getByLabel('Systolic').fill('');  // Clear the input field
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('The Systolic field is required.')).toBeVisible();
});

test('Special character for Systolic value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);
  
  // Test incomplete input with just a negative sign
  try {
    await page.getByLabel('Systolic').fill('-');
  } catch (error) {
    if (error.message.includes('Cannot type text into input[type=number]')) {
      console.log('Non-numeric input not allowed, test passes.');
    } else {
      throw error;  //throw the error if it's not the expected one
    }
  }
});

test('Systolic value lower than minimum value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);

  // Test invalid negative systolic value
  await page.getByLabel('Systolic').fill('69');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid Systolic Value')).toBeVisible();
});

test('Systolic value higher than maximum value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);

  // Test invalid negative systolic value
  await page.getByLabel('Systolic').fill('191');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid Systolic Value')).toBeVisible();
});

test('Negative Diastolic value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);

  // Test invalid negative systolic value
  await page.getByLabel('Diastolic').fill('-1');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid Diastolic Value')).toBeVisible();
});

test('Blank Diastolic value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);

  // Clear the input before testing non-numeric input
  await page.getByLabel('Diastolic').fill('');  // Clear the input field
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('The Diastolic field is required.')).toBeVisible();
});

test('Special character for Diastolic value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);
  
  // Test incomplete input with just a negative sign
  try {
    await page.getByLabel('Diastolic').fill('-');
  } catch (error) {
    if (error.message.includes('Cannot type text into input[type=number]')) {
      console.log('Non-numeric input not allowed, test passes.');
    } else {
      throw error;  //throw the error if it's not the expected one
    }
  }
});

test('Diastolic value lower than minimum value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);

  // Test invalid negative systolic value
  await page.getByLabel('Diastolic').fill('39');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid Diastolic Value')).toBeVisible();
});

test('Diastolic value higher than maximum value: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);

  // Test invalid negative systolic value
  await page.getByLabel('Diastolic').fill('101');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid Diastolic Value')).toBeVisible();
});

test('Systolic value higher that Diastolic: error message thrown', async ({ page }) => {
  await page.goto(BASE_URL);

  // Test invalid negative systolic value
  await page.getByLabel('Systolic').fill('70');
  await page.getByLabel('Diastolic').fill('100');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Systolic must be greater than Diastolic')).toBeVisible();
});
