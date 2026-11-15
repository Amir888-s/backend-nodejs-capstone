# Second Chance User Stories

Use the format: **As a [role], I need [function], so that [benefit].**

1. As a visitor, I need to view available items, so that I can discover reusable products.
2. As a visitor, I need to search by category, so that I can quickly find relevant items.
3. As a visitor, I need to view item details, so that I can decide whether an item fits my needs.
4. As a user, I need to register securely, so that I can create an account.
5. As a registered user, I need to log in, so that I can access protected features.
6. As a registered user, I need to create an item listing with an image, so that I can give an item a second chance.
7. As an item owner, I need to update my listing, so that its information stays accurate.
8. As an item owner, I need to delete my listing, so that unavailable items are removed.
9. As a registered user, I need to update my profile, so that my account information stays current.
10. As a user, I need sentiment feedback, so that inappropriate or overly negative descriptions can be identified.

## Acceptance Criteria

- APIs return JSON and appropriate HTTP status codes.
- Passwords are hashed and protected routes require a JWT.
- Search supports category, condition, age, and free-text filters.
- Uploaded files are accepted through a multipart POST request.
- CI runs linting and automated tests on every push and pull request.
