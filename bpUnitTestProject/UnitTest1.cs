using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BPCalculator;


namespace bpUnitTestProject
{
	[TestClass]
	public class Test1
	{
		[TestMethod]
		public void TestMethod1()
		{
			var bloodPressure = new BloodPressure { Systolic = 70, Diastolic = 40 };
			var actualCategory = bloodPressure.Category;
			Assert.AreEqual(BPCategory.Low, actualCategory);
		}
	}
}
