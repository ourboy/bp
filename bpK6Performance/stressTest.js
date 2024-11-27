// A stress test is used to determine the robustness of the application by testing beyond the limits

import http from 'k6/http';
import { sleep, check } from 'k6';
import { BASE_URL } from "./config.js";

export let options = {
  stages: [
    // For this CA the values are set low, Target should be increased up to 1000, and run for 60mins
    { duration: '30s', target: 100 }, // Ramp-up to 100 users over 30 seconds
    { duration: '1m', target: 100 }, // Sustain load for 1 minutes
    { duration: '10s', target: 0 },   // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests should be under 2 seconds
    http_req_failed: ['rate<0.01'],   // Failures should be less than 1%
  },
};

export default function () {
  // Simulate GET request
  let res = http.get(BASE_URL);
  check(res, { 
    "GET is status 200": (r) => r.status === 200 
  });

  const fields = { 
    'BP.Systolic': getRandomInt(70, 190).toString(), 
    'BP.Diastolic': getRandomInt(40, 100).toString() 
  };

  // Simulate POST form submission
  res = res.submitForm({ fields });
  check(res, { 
    'POST is status 200': (r) => r.status === 200,
    'Response contains Blood Pressure or must be greater': (r) => r.body?.includes('Blood Pressure') || r.body?.includes('must be greater'), // this is needed in cases where Diastolic is greater than Systolic
  });

  // Add Error handling here

  sleep(1); // Introduce delay between requests
}

// Utility function to generate random integers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}