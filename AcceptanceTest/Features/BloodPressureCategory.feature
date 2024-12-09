@BPCalculator
Feature: Blood Pressure Category

  Scenario: Blood Pressure with Systolic 110 and Diastolic 70
    Given the blood pressure is 110/70
    When I click submit and check the BP category
    Then the category should be Ideal
    And the recommendation should be "Your blood pressure is ideal! Keep up the good work with healthy habits."

  Scenario: Blood Pressure with Systolic 80 and Diastolic 55
    Given the blood pressure is 80/55
    When I click submit and check the BP category
    Then the category should be Low
    And the recommendation should be "Your blood pressure is low. Consider increasing your fluid intake, and consult a healthcare provider if you experience symptoms like dizziness."

  Scenario: Blood Pressure with Systolic 120 and Diastolic 80
    Given the blood pressure is 120/80
    When I click submit and check the BP category
    Then the category should be Ideal
    And the recommendation should be "Your blood pressure is ideal! Keep up the good work with healthy habits."

  Scenario: Blood Pressure with Systolic 130 and Diastolic 85
    Given the blood pressure is 130/85
    When I click submit and check the BP category
    Then the category should be PreHigh
    And the recommendation should be "Your blood pressure is on the higher side. Adopting a healthier diet and increasing your physical activity can help improve your blood pressure."

  Scenario: Blood Pressure with Systolic 140 and Diastolic 90
    Given the blood pressure is 140/90
    When I click submit and check the BP category
    Then the category should be High
    And the recommendation should be "Your blood pressure is high. Please consult with a healthcare provider for further advice and potential treatment as soon as possible."

  Scenario: Blood Pressure with Systolic 160 and Diastolic 100
    Given the blood pressure is 160/100
    When I click submit and check the BP category
    Then the category should be High
    And the recommendation should be "Your blood pressure is high. Please consult with a healthcare provider for further advice and potential treatment as soon as possible."

  Scenario: Blood Pressure with Systolic 90 and Diastolic 60
    Given the blood pressure is 90/60
    When I click submit and check the BP category
    Then the category should be Ideal
    And the recommendation should be "Your blood pressure is ideal! Keep up the good work with healthy habits."
