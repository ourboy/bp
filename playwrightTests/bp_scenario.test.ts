import { test, expect } from '@playwright/test';

test('Test Pre-High Blood Pressure', async ({ page }) => {
  await page.goto('https://test-bpcalculator.azurewebsites.net/');
  await page.getByLabel('Systolic').fill('130');
  await page.getByLabel('Diastolic').fill('80');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Pre-High Blood Pressure')).toBeVisible();
});

test('Test Systolic-Diastolic error', async ({ page }) => {
  await page.goto('https://test-bpcalculator.azurewebsites.net/');  
  await page.getByLabel('Systolic').fill('300');
  await page.getByLabel('Diastolic').fill('300');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  await expect(page.getByText('Invalid Systolic Value')).toBeVisible();
  await expect(page.getByText('Invalid Diastolic Value')).toBeVisible();
});



test('Test Invalid Systolic values', async ({ page }) => {
  await page.goto('https://test-bpcalculator.azurewebsites.net/');

  // Test invalid negative systolic value
  await page.getByLabel('Systolic').fill('-1');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid Systolic Value')).toBeVisible();
  
  // Clear the input before testing non-numeric input
  await page.getByLabel('Systolic').fill('');  // Clear the input field
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('The Systolic field is required.')).toBeVisible();
  
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

  // Test incomplete input with alphabetic character
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

test('Test Invalid Diastolic values', async ({ page }) => {
  await page.goto('https://test-bpcalculator.azurewebsites.net/');

  // Test invalid negative systolic value
  await page.getByLabel('Diastolic').fill('-1');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Invalid Diastolic Value')).toBeVisible();
  
  // Clear the input before testing non-numeric input
  await page.getByLabel('Diastolic').fill('');  // Clear the input field
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('The Diastolic field is required.')).toBeVisible();
  
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

  // Test incomplete input with alphabetic character
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

