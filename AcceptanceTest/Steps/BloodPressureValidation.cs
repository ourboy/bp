using NUnit.Framework; // Required for assertions
using BPCalculator; // Reference to the BloodPressure class
using TechTalk.SpecFlow; // SpecFlow's attributes and binding

namespace CA1_Validation.BDD
{
  // BloodPressure Class
  public class BloodPressure
  {
    public int Systolic { get; set; }
    public int Diastolic { get; set; }

    public string? Validate()
    {
      if (Systolic <= Diastolic)
      {
        return "Systolic must be greater than Diastolic";
      }
      if (Diastolic < 40 || Diastolic > 120)
      {
        return "Invalid Diastolic Value";
      }
      if (Systolic < 70 || Systolic > 190)
      {
        return "Invalid Systolic Value";
      }
      return null; // No error
    }
  }

  // SpecFlow Steps
  [Binding]
  public class BloodPressureValidationSteps
  {
    private BloodPressure bloodPressure;
    private string? errorMessage = string.Empty; // Initialize to an empty string

    public BloodPressureValidationSteps()
    {
      // Initialize bloodPressure to a non-null value
      bloodPressure = new BloodPressure();
    }

    [Given(@"the blood pressure for validation is (\d+)/(\d+)")]
    public void GivenTheBloodPressureForValidationIs(int systolic, int diastolic)
    {
      // bloodPressure = new BloodPressure
      // {
      bloodPressure.Systolic = systolic;
      bloodPressure.Diastolic = diastolic;
      // };
    }

    [When(@"I click submit and check the BP category for validation")]
    public void WhenIClickSubmitAndCheckTheBPForValidation()
    {
      // Validate the blood pressure values
      errorMessage = bloodPressure.Validate();
    }

    [Then(@"an error should be displayed with message '(.*)'")]
    public void ThenAnErrorShouldBeDisplayedWithMessage(string expectedError)
    {
      Assert.IsNotNull(errorMessage, "No error message was displayed.");
      Assert.AreEqual(expectedError, errorMessage, 
          $"Expected error message '{expectedError}' but got '{errorMessage}'.");
    }
  }
}
