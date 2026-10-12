# Winnipeg Event Rentals Website

Static draft website for a Winnipeg event rental business with chairs, 6 ft folding tables, and party setup rentals.

## Update Before Launch

- Replace `Winnipeg Event Rentals` if you choose a different business name.
- Replace `https://winnipegeventrentals.ca/` in `index.html`, `robots.txt`, and `sitemap.xml` after choosing the domain.
- Add a real email form service before launch if you want messages sent without opening the visitor's email app.
- Add final table pricing, table quantity, and policies for deposits, cancellation, damage, pickup windows, delivery fees, setup fees, and cleaning.

## Files

- `index.html` is the main homepage.
- `styles.css` controls the design.
- `script.js` handles the mobile menu, photo preview, and booking-message builder.
- `guides/` contains local SEO guide pages.
- `assets/` contains chair, table, and event setup photos.

## Cloud Resume Challenge #7 — JavaScript visitor counter

The homepage footer contains a DynamoDB-backed visitor counter. Existing site features remain unchanged.

### Configure

1. In AWS Lambda, open `cloudresume-test-api` → **Configuration → Function URL** and copy its HTTPS URL.
2. In `script.js`, the Lambda Function URL is already configured.
3. Configure Lambda Function URL CORS to allow origin `https://winnipegeventrentals.ca` and method `GET` (also add `https://www.winnipegeventrentals.ca` if that origin serves your site). Lambda's CORS configuration handles preflight/response headers; do not duplicate `Access-Control-Allow-Origin` in Lambda code.
4. Lambda must return a JSON number (e.g. `2`) or an object (e.g. `{ "views": 2 }`). It should atomically increment DynamoDB item `ID` (string) = `1` in table `cloud-resume-test`. Its execution role needs `dynamodb:UpdateItem` permission on that table.
5. Publish the updated static files through your normal deployment process. Open the site and check the footer, then refresh and verify the count increments. Check the browser Console/Network panel if it does not appear.

### Notes

- The counter stays hidden until the API returns a valid number. Site functionality is unaffected if the API fails.
- Every successful page load increments the count; this is **page visits**, not unique visitors. Bots and repeated refreshes can inflate it.
- The public Function URL can be invoked outside your site. CORS is not authentication or abuse prevention.
- Do not put AWS credentials or secret keys in frontend JavaScript.
