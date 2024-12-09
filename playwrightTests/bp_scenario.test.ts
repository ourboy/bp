import { test, expect } from '@playwright/test';
const BASE_URL = 'https://qatestca1.azurewebsites.net/';

test(' Calculate Low Blood Pressure correctly', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('85');
  await page.getByLabel('Diastolic').fill('55');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Low Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is low. Consider increasing your fluid intake, and consult a healthcare provider if you experience symptoms like dizziness.')).toBeVisible();
});


test(' Calculate Ideal Blood Pressure correctly', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('110');
  await page.getByLabel('Diastolic').fill('75');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Ideal Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is ideal! Keep up the good work with healthy habits.')).toBeVisible();
});

test(' Calculate Pre-high Blood Pressure correctly', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('130');
  await page.getByLabel('Diastolic').fill('80');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Pre-High Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is on the higher side. Adopting a healthier diet and increasing your physical activity can help improve your blood pressure.')).toBeVisible();

});

test(' Calculate High Blood Pressure correctly', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('150');
  await page.getByLabel('Diastolic').fill('95');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('High Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is high. Please consult with a healthcare provider for further advice and potential treatment as soon as possible.')).toBeVisible();
});

test(' Miminum Systolic and Diastolic', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('70');
  await page.getByLabel('Diastolic').fill('40');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('low Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is low. Consider increasing your fluid intake, and consult a healthcare provider if you experience symptoms like dizziness.')).toBeVisible();
});

test(' Maximum Systolic and Diastolic', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('190');
  await page.getByLabel('Diastolic').fill('100');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('High Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is high. Please consult with a healthcare provider for further advice and potential treatment as soon as possible.')).toBeVisible();
});

test(' Maximum Systolic and Minimum Diastolic', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('190');
  await page.getByLabel('Diastolic').fill('40');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('High Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is high. Please consult with a healthcare provider for further advice and potential treatment as soon as possible.')).toBeVisible();
});

test(' Systolic lower range and Diastolic in ideal range', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('70');
  await page.getByLabel('Diastolic').fill('60');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Ideal Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is ideal! Keep up the good work with healthy habits.')).toBeVisible();
});

test(' Systolic lower boundry range and Diastolic in ideal range', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('90');
  await page.getByLabel('Diastolic').fill('60');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Ideal Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is ideal! Keep up the good work with healthy habits.')).toBeVisible();
});


test(' Systolic Pre-High upper boundry and Diastolic in range', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('139');
  await page.getByLabel('Diastolic').fill('85');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Pre-High Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is on the higher side. Adopting a healthier diet and increasing your physical activity can help improve your blood pressure.')).toBeVisible();
});

test(' Systolic Pre-High range and Diastolic pre-high upper boundry', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByLabel('Systolic').fill('125');
  await page.getByLabel('Diastolic').fill('89');
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Pre-High Blood Pressure')).toBeVisible();
  await expect(page.getByText('Your blood pressure is on the higher side. Adopting a healthier diet and increasing your physical activity can help improve your blood pressure.')).toBeVisible();
});
