@BPCalculator
Feature: Blood Pressure Category

  Scenario: Blood Pressure with Systolic 110 and Diastolic 70
    Given the blood pressure is 110/70
    When I click submit and check the BP category
    Then the category should be Ideal

  Scenario: Blood Pressure with Systolic 80 and Diastolic 55
    Given the blood pressure is 80/55
    When I click submit and check the BP category
    Then the category should be Low
  
  Scenario: Blood Pressure with Systolic 120 and Diastolic 80
    Given the blood pressure is 120/80
    When I click submit and check the BP category
    Then the category should be Ideal

  Scenario: Blood Pressure with Systolic 130 and Diastolic 85
    Given the blood pressure is 130/85
    When I click submit and check the BP category
    Then the category should be PreHigh

  Scenario: Blood Pressure with Systolic 140 and Diastolic 90
    Given the blood pressure is 140/90
    When I click submit and check the BP category
    Then the category should be High

  Scenario: Blood Pressure with Systolic 160 and Diastolic 100
    Given the blood pressure is 160/100
    When I click submit and check the BP category
    Then the category should be High

  Scenario: Blood Pressure with Systolic 90 and Diastolic 60
    Given the blood pressure is 90/60
    When I click submit and check the BP category
    Then the category should be Ideal
