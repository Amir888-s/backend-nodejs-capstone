# Assignment Evidence Guide

Do not submit invented outputs. Run these commands against your own deployed application and save the real terminal output.

## Task 3 — inserted_items

```bash
npm run seed | tee inserted_items
```

The output must show that 16 MongoDB documents were imported.

## Task 10 — deployed_landingpage.png

Open the deployed URL in a browser and capture the full page with the address bar visible. The screenshot must show the Second Chance title, tagline, and Get Started button.

## Tasks 11–15 — cURL evidence

Replace `DEPLOYED_URL`, credentials, IDs, and tokens with values from your environment.

```bash
curl -i "$DEPLOYED_URL/api/secondchance/items" | tee mainpage

curl -i -X POST "$DEPLOYED_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Course","lastName":"User","email":"course@example.com","password":"StrongPass123!"}' | tee register

curl -i -X POST "$DEPLOYED_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"course@example.com","password":"StrongPass123!"}' | tee login

curl -i "$DEPLOYED_URL/api/secondchance/items/ITEM_ID" | tee item_detail

curl -i "$DEPLOYED_URL/api/secondchance/search?category=Electronics" | tee search_item
```

## Task 16 — CICD

Open the successful GitHub Actions run, expand all steps, and save or copy the actual workflow output as `CICD`.
