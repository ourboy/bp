using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

// page model

namespace BPCalculator.Pages
{
    public class BloodPressureModel : PageModel
    {
        [BindProperty]                              // bound on POST
        public BloodPressure BP { get; set; }

        // Recommendation to be displayed on the page
        public string Recommendation { get; set; }

        // setup initial data
        public void OnGet()
        {
            BP = new BloodPressure();
        }

        // POST, validate
        public IActionResult OnPost()
        {
            // extra validation
            if (!(BP.Systolic > BP.Diastolic))
            {
                ModelState.AddModelError("", "Systolic must be greater than Diastolic");
            }
            // If the model state is valid, get the recommendation
            if (ModelState.IsValid)
            {
                // Get the recommendation based on the BP values
                Recommendation = BP.GetRecommendation();
            }
            return Page();
        }
    }
}
