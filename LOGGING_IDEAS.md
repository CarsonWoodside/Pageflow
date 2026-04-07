# Logging Ideas

The current flow works, but it asks for too much navigation:

1. Open book details
2. Find the progress section
3. Enter the new page
4. Save

That is accurate, but it is not especially fast.

## Better Options

### 1. Quick log directly from the shelf

Add a small `Log pages` or `Update page` button on each reading card.

Why this is better:

- Removes the need to open the detail view
- Keeps logging to one tap from the main shelf
- Makes daily use much faster

Possible UI:

- Tap button
- Small bottom sheet opens
- Enter current page
- Save

This is probably the strongest next change.

### 2. Inline page stepper on reading cards

Show the current page on the card with quick actions like:

- `-10`
- `+10`
- `Set page`

Why this is better:

- Very fast for people reading in chunks
- Feels more app-like and less form-like
- Good for frequent daily updates

Risk:

- Can get visually busy if every card has too many controls

### 3. Floating quick-log action

Keep the main `Add Book` button, but also add a second floating action for `Log Progress`.

Why this is better:

- Makes logging feel like a core action, not a hidden one
- Good if logging happens more often than adding books

Possible flow:

- Tap `Log Progress`
- Choose one of currently reading books
- Enter new current page
- Save

### 4. Tap progress bar to update

Let the progress bar or page count on each reading card open a mini page-update sheet.

Why this is better:

- Very natural interaction
- Keeps the card clean
- Makes progress feel directly editable

### 5. Daily reading session modal

Instead of treating logging as part of a book detail page, treat it as a daily session flow.

Possible flow:

1. Open `Log reading`
2. Choose the book
3. Enter starting page or current page
4. Save session

Why this is better:

- Better for readers actively switching between books
- Makes stats feel tied to reading sessions rather than book editing

### 6. Smart recent-books logger

Show the last 3 reading books at the top of the shelf with large quick-log buttons.

Why this is better:

- Optimized for the books most likely to be updated
- Reduces scrolling and repeated detail-page navigation

### 7. Swipe action on a reading card

Add a swipe or hold interaction:

- Swipe left: `Log progress`
- Swipe right: `Finish book`

Why this is better:

- Fast once learned
- Keeps the main layout clean

Risk:

- Slightly less discoverable than visible buttons

## Recommendation

If we improve this next, the best version is probably:

1. Add a `Quick Log` action directly on reading cards
2. Open a compact bottom sheet
3. Let the user set the new current page
4. Auto-calculate pages read from the previous saved page

That keeps the current data model, preserves stats accuracy, and removes the most annoying navigation step.

## Nice Add-Ons

- Show `Last updated on page 42` before saving
- Preview: `This session will count as 18 pages`
- Offer a `Mark finished` shortcut if the entered page reaches total pages
- Add optional notes like `Great chapter` or `Read before bed`
- Let users undo the last log entry

## If We Want The Fastest Possible Version

The smallest improvement with the biggest payoff is:

- Add `Update page` to each reading card
- Reuse the existing current-page logic in a small sheet

That would likely make logging feel much better without a large refactor.
