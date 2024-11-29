using NUnit.Framework; // Required for assertions
using System;
using BPCalculator; // Reference to the BloodPressure class
using TechTalk.SpecFlow; // SpecFlow's attributes and binding

namespace MyProject.BDD.Steps
{
  [Binding]
  public class BloodPressureSteps
  {
    private BloodPressure bloodPressure;
    private BPCategory actualCategory;

    public BloodPressureSteps()
    {
      // Initialize bloodPressure to a non-null value
      bloodPressure = new BloodPressure(); // or another appropriate initialization
    }

    // Given step to set the blood pressure values
    [Given(@"the blood pressure is (\d+)/(\d+)")]
    public void GivenTheBloodPressureIs(int systolic, int diastolic)
    {
      bloodPressure = new BloodPressure
      {
        Systolic = systolic,
        Diastolic = diastolic
      };
    }

    // When step to get the calculated BP category
    [When(@"I check the BP category")]
    public void WhenICheckTheBPCategory()
    {
      actualCategory = bloodPressure.Category;
    }

    // Then step to assert that the category matches the expected one
    [Then(@"the category should be (.*)")]
    public void ThenTheCategoryShouldBe(string expectedCategory)
    {
        
      Console.WriteLine($"Expected: '{expectedCategory}'");
      Console.WriteLine($"Actual: '{actualCategory}'");

      // Assert that the expected category matches the actual category
      Assert.AreEqual(expectedCategory.Trim(), actualCategory.ToString().Trim());
    }
  }
}

