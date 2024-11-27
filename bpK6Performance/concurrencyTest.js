//Concurrency tests assess the behavior, performance, and stability of a system under simultaneous, real-world usage, 
// focusing on its handling of concurrent tasks or requests.
import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL } from "./config.js";

export let options = {
  stages: [
    // For this CA the values are set low, Target should be increased up to 200, and run for 60mins
    { duration: '1m', target: 10 },  // Ramp up to 10 concurrent users
    { duration: '1m', target: 30 },  // Hold at 30 concurrent users for 1 minutes
    { duration: '1m', target: 10 },  // Ramp down to 10 users
  ],
  thresholds: {
    http_req_failed: ['rate<0.05'],  // Error rate below 5%
    http_req_duration: ['p(95)<300'], // 95% of requests should complete within 300ms
  },
};

export default function () {
  let res = http.get(BASE_URL);
  
  check(res, {
    "GET is status 200": (r) => r.status === 200,
    "GET response time < 300ms": (r) => r.timings.duration < 300,
  });
}
