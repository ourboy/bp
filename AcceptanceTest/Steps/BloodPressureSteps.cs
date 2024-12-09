using NUnit.Framework; // Required for assertions
using BPCalculator; // Reference to the BloodPressure class
using TechTalk.SpecFlow; // SpecFlow's attributes and binding

namespace CA1.BDD
{
  [Binding]
  public class BloodPressureCategorySteps
  {
    private BloodPressure bloodPressure;
    private BPCategory actualCategory;

    private string? recommendation;  // Declare recommendation
  public BloodPressureCategorySteps()
  {
    // Initialize bloodPressure to a non-null value
    bloodPressure = new BloodPressure(); // or another appropriate initialization
  }
    [Given(@"the blood pressure is (\d+)/(\d+)")]
    public void GivenTheBloodPressureIs(int systolic, int diastolic)
    {
      bloodPressure = new BloodPressure
      {
        Systolic = systolic,
        Diastolic = diastolic
      };
    }

    [When(@"I click submit and check the BP category")]
    public void WhenIClickSubmitAndCheckTheBP()
    {
      actualCategory = bloodPressure.Category;
      recommendation = bloodPressure.GetRecommendation();
    }

    [Then(@"the category should be (.*)")]
    public void ThenTheCategoryShouldBe(string expectedCategory)
    {
      // Remove spaces
      var expected = Enum.Parse<BPCategory>(expectedCategory.Replace(" ", ""), true);
      Assert.AreEqual(expected, actualCategory, 
        $"Expected category '{expected}' but got '{actualCategory}'.");
    }

    [Then(@"the recommendation should be ""(.*)""")]
      public void ThenTheRecommendationShouldBe(string expectedRecommendation)
      {
        Assert.AreEqual(expectedRecommendation, recommendation);
      }
  }
}
