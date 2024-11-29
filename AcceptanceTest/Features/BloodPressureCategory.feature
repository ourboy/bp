@BPCalculator

Feature: Blood Pressure Category

  Scenario: Blood Pressure with Systolic 110 and Diastolic 70
    Given the blood pressure is 110/70
    When I check the BP category
    Then the category should be Ideal

  Scenario: Blood Pressure with Systolic 80 and Diastolic 55
    Given the blood pressure is 80/55
    When I check the BP category
    Then the category should be Low