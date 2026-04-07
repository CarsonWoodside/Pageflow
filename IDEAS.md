# Ideas

These are small, practical improvements that fit the way this app is actually being used:

- just you
- maybe friends or family on their own phones
- fully local
- no accounts
- no backend

## Logging

### 1. One-tap `+10 / +25 / +50` buttons

Inside the quick log sheet, add preset jump buttons for common reading chunks.

Why:

- Faster than typing every time
- Good for casual daily use
- Still keeps the current page model

### 2. `Mark finished` inside quick log

If the entered page matches the total page count, show a `Finish book now` button right in the sheet.

Why:

- Removes another trip into book details
- Feels more natural at the end of a book

### 3. Show `last logged` time on shelf cards

Example:

- `Last updated today`
- `Last updated 3 days ago`

Why:

- Helps you spot books that have gone stale
- Makes the shelf feel more alive

### 4. Add optional session notes

Small optional note field when logging:

- `Great chapter`
- `Read on the train`
- `Started Part II`

Why:

- Makes logs more personal
- Still fully local and lightweight

## Shelf UX

### 5. Pinned `Currently Reading` section at the top

Show active reads before the rest of the shelf.

Why:

- The books you update most are immediately visible
- Better than filtering first every time

### 6. Smarter empty states

Different empty messages for:

- no books at all
- no books in this filter

Why:

- Feels less generic
- Helps people understand what they’re looking at

### 7. Quick actions on long press

On mobile, long-press a reading card for:

- Quick Log
- Mark Finished
- Edit Pages
- Delete

Why:

- Keeps UI clean
- Still gives power-user speed

## Stats

### 8. Goal progress card

Show:

- yearly goal
- finished count
- `% complete`
- books left to goal

Why:

- You already collect the data
- Adds a more personal reason to check stats

### 9. Reading days calendar heatmap

A simple mini grid for the current month or year.

Why:

- Very motivating
- Great fit for a local reading tracker
- Can be hand-coded without extra libraries

### 10. Best streak / current streak

Right now current streak matters, but best-ever streak is also useful.

Why:

- More rewarding
- Helps even when the current streak is broken

## Personal / Family-Friendly Features

### 11. Export and import local data

Allow:

- export to JSON
- import from JSON

Why:

- Useful for backups
- Makes switching phones easier
- Still fully local

This is one of the highest-value local-first improvements.

### 12. Simple theme picker

Offer a few built-in looks:

- Forest Journal
- Golden Lamp
- Rainy Library
- Soft Morning

Why:

- Makes the app feel more personal
- Good for family/friends without adding complexity

### 13. Home screen widget-style summary page

Design the shelf top area like a mini dashboard:

- current read
- yearly goal progress
- streak
- pages this week

Why:

- Makes the app useful at a glance
- Better first impression on open

## Book Management

### 14. Better edition handling

Right now total pages are editable, which is good. Next step could be:

- note edition type manually
- paperback / hardback / ebook / audiobook

Why:

- Useful context without needing external metadata
- Makes page-count differences feel intentional

### 15. Re-read support

Let a finished book be read again without deleting old history.

Why:

- Common for favourite books
- Especially useful for family readers

### 16. DNF reason

Optional short reason when marking DNF:

- lost interest
- too slow
- wrong mood
- might return later

Why:

- Helps later when looking back
- Still simple and local

## Nice Small Polish Ideas

### 17. Cover stack animation on shelf load

Very subtle stagger or lift effect for reading cards.

Why:

- Makes the app feel more premium
- No feature complexity

### 18. Celebrations

Tiny celebration when:

- finishing a book
- hitting a streak milestone
- reaching goal milestones

Why:

- Good emotional payoff
- Works well for a personal app

### 19. Better progress wording

Examples:

- `15 pages today`
- `68 pages this week`
- `You’re 72% through`

Why:

- Makes the data easier to feel
- Less mechanical than raw numbers alone

## Best Next Steps

If the goal is maximum improvement with minimum complexity, the best next additions are probably:

1. Export / import local data
2. Goal progress card
3. `Mark finished` directly from quick log
4. Preset `+10 / +25 / +50` quick log buttons
5. Best streak alongside current streak

Those all fit the local-first model and make the app meaningfully nicer without changing the core architecture.
