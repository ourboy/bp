// A throughput test is used to measure the rate at which data is successfully processed by a system,
// typically over a network or a service.

import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL } from "./config.js";

export let options = {
  stages: [
    // For this CA the values are set low, Target should be increased up to 200, and run for 10-30mins
    { duration: '20s', target: 5 },  // Ramp up to 5 users
    { duration: '1m', target: 20 },   // Sustain 20 users
    { duration: '20s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_reqs: ['rate>20'], // Ensure throughput is above 20 requests/second
    http_req_failed: ['rate<0.05'], // Keep error rate below 5%
    http_req_duration: ['p(95)<300'], // 95% of requests should complete within 300ms
  },
};

export default function () {
  let res = http.get(BASE_URL);
  check(res, {
    "GET response time < 200ms": (r) => r.timings.duration < 200
  });

  const fields = { 
    'BP.Systolic': getRandomInt(70, 190).toString(), 
    'BP.Diastolic': getRandomInt(40, 100).toString() 
  };

  // Simulate POST form submission
  res = res.submitForm({ fields });
  check(res, {
    "POST status is 200": (r) => r.status === 200,
    "POST response time < 300ms": (r) => r.timings.duration < 300
  });

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
