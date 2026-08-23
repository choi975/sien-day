# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are the owner and their partner, using a private, fixed-instance page rather than a public multi-user health product. They need to understand the next expected period date at a glance and occasionally correct the underlying dates.

## Product Purpose

The product provides a lightweight period countdown, keeps a small shared record of confirmed dates, predicts the next date from the latest interval, and sends a Bark reminder when the predicted date is close. Success means the current state is understandable within seconds and date correction remains deliberate and private.

## Positioning

This is a single-purpose private utility: one shared dataset, password-protected editing, cloud synchronization with a read-only cache fallback, and a simple countdown rather than a general health dashboard.

## Operating Context

Users usually glance at the main screen briefly. Less often, they open the editor to add, remove, or correct confirmed dates and compare them with future predictions. The product may be viewed on desktop or mobile and may temporarily operate from cached data while the cloud is unavailable.

## Capabilities and Constraints

- Show the predicted next period date, remaining or overdue days, and the interval used for prediction.
- Preserve loading, ready, cached read-only, offline, overdue, saving, success, and error states.
- Keep editing behind the existing password flow; the password is not stored locally.
- Support confirmed dates, twelve future predictions, interval labels, add/remove actions, and the "record today" shortcut.
- Do not introduce medical advice, health scores, symptoms, accounts, multi-user profiles, or unsupported claims.
- Keep the implementation compatible with the existing static HTML/CSS/JavaScript frontend and Cloudflare Worker/D1 backend when a later build is approved.

## Brand Commitments

- Keep the explicit Chinese term "生理期" in the interface.
- The experience should remain private, calm, direct, and useful to a fixed owner/partner audience.
- Redesign may replace the current pink glass-card visual language, but must preserve product truth, core copy meaning, and familiar web affordances.

## Evidence on Hand

- Current interface and product copy: `public/index.html`
- API, prediction, authentication, and reminder behavior: `src/worker.js`
- Existing interface screenshot: `output/playwright/period-countdown.png`
- Database shape and sample development records: `migrations/`
- Design comps must use synthetic dates and must not expose real health dates.

## Product Principles

- Make the countdown legible at a glance.
- Treat privacy and discretion as product behavior, not decoration.
- Distinguish confirmed facts, predictions, and connection state clearly.
- Keep correction deliberate without making routine use feel administrative.
- Add no health claims or features that the product cannot support.
