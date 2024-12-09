using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using BPCalculator;


namespace bpUnitTestProject
{
  [TestClass]
  public class bpTest
  {
    // Verify correct Blood Pressure Category is returned
    [DataTestMethod]
    [DataRow(70, 40, BPCategory.Low)]
    [DataRow(89, 59, BPCategory.Low)]
    [DataRow(90, 55, BPCategory.Ideal)]
    [DataRow(120, 55, BPCategory.Ideal)]
    [DataRow(90, 60, BPCategory.Ideal)]
    [DataRow(120, 60, BPCategory.Ideal)]
    [DataRow(90, 80, BPCategory.Ideal)]
    [DataRow(120, 80, BPCategory.Ideal)]
    [DataRow(90, 81, BPCategory.PreHigh)]
    [DataRow(120, 81, BPCategory.PreHigh)]
    [DataRow(120, 89, BPCategory.PreHigh)]
    [DataRow(120, 90, BPCategory.High)]
    [DataRow(121, 60, BPCategory.PreHigh)]
    [DataRow(139, 60, BPCategory.PreHigh)]
    [DataRow(121, 89, BPCategory.PreHigh)]
    [DataRow(139, 89, BPCategory.PreHigh)]
    [DataRow(121, 90, BPCategory.High)]
    [DataRow(139, 90, BPCategory.High)]
    [DataRow(140, 60, BPCategory.High)]
    [DataRow(140, 95, BPCategory.High)]
    [DataRow(190, 100, BPCategory.High)]
    public void ExpectedCategoryReturned_WhenValuesAreProvided(int systolic, int diastolic, BPCategory expectedCategory)
    {
      var bloodPressure = new BloodPressure { Systolic = systolic, Diastolic = diastolic };
      var actualCategory = bloodPressure.Category;
      Assert.AreEqual(expectedCategory, actualCategory);
    }

    //Verify Correct Error message is returned
    [DataTestMethod]
    [DataRow(70, 101, "Invalid Diastolic Value")] // Diastolic above maximum
    [DataRow(70, 39, "Invalid Diastolic Value")]  // Diastolic below minimum
    [DataRow(191, 80, "Invalid Systolic Value")] // Systolic above maximum
    [DataRow(50, 80, "Invalid Systolic Value")]  // Systolic below minimum
    // TBD Investigate failure
    // [DataRow(71, 100, "Systolic must be greater than Diastolic")]  // Diastolic is greated that Systolic
    // 
    public void BP_ReturnedExpected_ErrorMessages(int systolic, int diastolic, string expectedMessage)
    {
      var bloodPressure = new BloodPressure { Systolic = systolic, Diastolic = diastolic };
      var validationErrors = ValidateBPErrorMessage(bloodPressure);

      // Log the actual validation errors
      Console.WriteLine("Validation Errors: " + string.Join(", ", validationErrors));

      // Verify the validation errors contain the expected message
      Assert.AreEqual(expectedMessage, validationErrors.FirstOrDefault(), $"Expected message '{expectedMessage}' not found for Systolic: {systolic}, Diastolic: {diastolic}");

    }

    private IEnumerable<string> ValidateBPErrorMessage(BloodPressure bloodPressure)
    {
      var validationResults = new List<ValidationResult>();
      var validationContext = new ValidationContext(bloodPressure);

      // Validate the object
      Validator.TryValidateObject(bloodPressure, validationContext, validationResults, true);

      // Return error messages if there are any
      return validationResults.Select(result => result.ErrorMessage);
    }

    //Verify Valid BP Values
    [DataTestMethod]
    [DataRow(120, 80, true)]
    [DataRow(70, 40, true)]
    [DataRow(190, 100, true)]
    [DataRow(69, 39, false)]  // Below lower boundary
    [DataRow(191, 101, false)] // Above upper boundary
    public void ValidBP_WhenValuesAreWithinRange(int systolic, int diastolic, bool expectedValidity)
    {
      var bloodPressure = new BloodPressure { Systolic = systolic, Diastolic = diastolic };
      var isValid = ValidateBloodPressure(bloodPressure);
      Assert.AreEqual(expectedValidity, isValid);
    }

    //validate Blood Pressure
		private bool ValidateBloodPressure(BloodPressure bloodPressure)
		{
      var validationContext = new ValidationContext(bloodPressure);
      var validationResults = new List<ValidationResult>();
      return Validator.TryValidateObject(bloodPressure, validationContext, validationResults, true);
		} 

    // Verify correct recommendation is returned
    [DataTestMethod]
    [DataRow(70, 40, "Your blood pressure is low. Consider increasing your fluid intake, and consult a healthcare provider if you experience symptoms like dizziness.")]
    [DataRow(100, 70, "Your blood pressure is ideal! Keep up the good work with healthy habits.")]
    [DataRow(125, 85, "Your blood pressure is on the higher side. Adopting a healthier diet and increasing your physical activity can help improve your blood pressure.")]
    [DataRow(145, 95, "Your blood pressure is high. Please consult with a healthcare provider for further advice and potential treatment as soon as possible.")]
    public void GetRecommendation_ReturnsCorrectRecommendation(int systolic, int diastolic, string expectedRecommendation)
    {
      var bloodPressure = new BloodPressure { Systolic = systolic, Diastolic = diastolic };
      var actualRecommendation = bloodPressure.GetRecommendation();
      Assert.AreEqual(expectedRecommendation, actualRecommendation, $"Recommendation did not match for Systolic: {systolic}, Diastolic: {diastolic}");
    }

    // Validate Blood Pressure
    private bool ValidateBloodPressure(BloodPressure bloodPressure)
    {
      var validationContext = new ValidationContext(bloodPressure);
      var validationResults = new List<ValidationResult>();
      return Validator.TryValidateObject(bloodPressure, validationContext, validationResults, true);
    }

    // Verify valid BP values
    [DataTestMethod]
    [DataRow(120, 80, true)]
    [DataRow(70, 40, true)]
    [DataRow(190, 100, true)]
    [DataRow(69, 39, false)]  // Below lower boundary
    [DataRow(191, 101, false)] // Above upper boundary
    public void ValidBP_WhenValuesAreWithinRange(int systolic, int diastolic, bool expectedValidity)
    {
      var bloodPressure = new BloodPressure { Systolic = systolic, Diastolic = diastolic };
      var isValid = ValidateBloodPressure(bloodPressure);
      Assert.AreEqual(expectedValidity, isValid);
    }
  }
}
