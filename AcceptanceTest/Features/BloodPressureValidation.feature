@BPValidation
Feature: Blood Pressure Validation
  Validates blood pressure input and categorizes it correctly.

  Scenario: Systolic must be greater than Diastolic
    Given the blood pressure for validation is 69/70
    When I click submit and check the BP category for validation
    Then an error should be displayed with message 'Systolic must be greater than Diastolic'

  Scenario: Diastolic value is invalid
    Given the blood pressure for validation is 120/20
    When I click submit and check the BP category for validation
    Then an error should be displayed with message 'Invalid Diastolic Value'

  Scenario: Systolic valie is invalid
    Given the blood pressure for validation is 200/79
    When I click submit and check the BP category for validation
    Then an error should be displayed with message 'Invalid Systolic Value'
