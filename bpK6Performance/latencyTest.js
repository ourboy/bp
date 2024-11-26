// A latency test is the time it takes for a request to travel from a client to a server and receive a subsequent response.
import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from "./config.js";

export let options = {
  vus: 1,
  iterations: 100,
  summaryTrendStats: ['avg', 'min', 'max', 'p(95)'], // Report the average, minimum, maximum, and 95th percentile response times
};

export default function () {
  let res = http.get(BASE_URL);

  // Check that response time is below 200ms
  check(res, {
    "response time < 30ms": (r) => r.timings.duration < 30,
  });
  // Log detailed timings for analysis
  console.log(`Response Time: ${res.timings.duration}`);
}
