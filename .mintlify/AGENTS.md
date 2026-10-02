# Latchel Help Center: instructions for the Mintlify agent

You maintain the Latchel Help Center (help.latchel.com). Most requests come from
Slack, usually the **#help-guide-requests** channel. They are one of two kinds:

1. **Update an existing help guide**, because a product release changed how
   something works or because someone asked for a correction.
2. **Create a new help guide**, because a product release has no guide yet or
   because someone asked for one.

Follow these instructions for every request so all guides read and look like
one consistent Help Center.

---

## 1. Handling a request

### Always do this first
1. **Search before you write.** Look for an existing guide on the topic in the
   right audience folder (see section 2). Also check the release notes in
   `s/topic/0TO5e000000h9wsGAA/` (the "What's New!" newsletters), because they
   often describe the change and link the related guide.
2. **Decide: update or create.**
   - If a guide covers the topic, **update it**. Don't create a duplicate.
   - If no guide covers it, **create a new one** (see section 1.3).
   - If a release affects several audiences (for example, a Property Manager
     feature that service providers also see), update or create a guide for
     each affected audience.
3. **Don't invent product details.** Use only facts from the request, the
   linked release notes, attached files or screenshots, and existing guides.
   If a button name, menu path, setting, plan requirement, or limit is
   unclear, ask in the Slack thread before writing it. Don't guess.

### 1.1 Updating an existing guide
- Change only what the release or request affects. Keep the rest of the page
  as it is, including its headings, cards, and FAQs.
- Update every place the old behavior appears on the page: steps, notes, FAQs,
  and card descriptions.
- If a screenshot is now outdated, keep it but put a placeholder comment right
  above it (see section 5) so a person can replace it.
- If the page title changes, also update the matching `<Card>` title on the
  category overview page (see section 1.3).

### 1.2 Older guides
Many older guides were migrated from our previous help center. They use plain
paragraphs instead of `<Steps>`, and image names like `rtaImage-123.jpg`.
- For a **small update**, edit in place and match the page's existing style.
- **Restructure** an older page into the current format (section 3) only when
  the request asks for a rewrite or when most of the page is changing.

### 1.3 Creating a new guide
1. **Choose the audience folder** (section 2) and create the file there.
   Name it in lowercase kebab-case, with no spaces and no `copy` in the
   name, for example `how-to-set-up-call-category-routing.mdx`.
2. **Write it using the template in section 4.**
3. **Add it to the navigation** in `docs.json`. Put it in the matching group
   under the correct audience tab (for example, Property Manager → Work Order
   Management). Use the path without `.mdx`:
   `"s/topic/0TO5e000000h9wqGAA/how-to-set-up-call-category-routing"`.
   Don't change a group's `"public": true` setting.
4. **Add a card for it** on that group's overview page, which is the first page
   listed in the group (for example, `Invoice-and-Payments.mdx`). Match the
   existing cards there: same `icon`, `iconType="duotone"`, and `horizontal`
   attributes, plus a one-sentence description.
5. If no group fits, choose the closest group and say so in the PR
   description so a person can decide.

### 1.4 Pull request
- Include in the PR description: the Slack request or release it came from,
  which pages you updated or created, and any open questions or screenshots
  that still need a person.
- Put one request in one PR.

---

## 2. Audiences and folders

| Audience | Folder | Reader is... |
|---|---|---|
| Property Managers (PMs) | `s/topic/0TO5e000000h9wqGAA/` | a property management company's staff who set up and manage Latchel |
| Residents | `s/topic/0TO5e000000h9wrGAA/` | a tenant submitting and tracking maintenance requests |
| Service Providers | `s/topic/0TO5e000000h9wpGAA/` | a vendor or in-house technician doing the work |
| Product Updates | `s/topic/0TO5e000000h9wsGAA/` | weekly release newsletters. **Read-only reference.** Don't edit unless asked. |
| Latchel Admin | `latchel-admin/` | **internal Latchel staff only** |

- **Never put internal information in a public guide.** This includes internal
  processes, Salesforce or Jira details, employee names, internal Slack
  channels, and anything taken from `latchel-admin/`.
- Every page under `latchel-admin/` must have `groups: ["latchel"]` in its
  frontmatter.
- Never edit files in `_audit/`, `_confluence-export/`, or `.github/`.

---

## 3. Voice and tone

Write the way a friendly, knowledgeable Latchel support teammate talks:

- **Speak to the reader as "you".** Refer to Latchel as "Latchel" or "we".
- **Be warm, plain, and confident.** Use short sentences and everyday words.
  Avoid jargon. Use contractions (you'll, don't, it's).
- **Lead with the benefit.** The opening tells the reader what the feature
  does for them before explaining how it works. For example: "No more guessing
  how long a job actually took…"
- **Use the reader's terms**, written exactly like this:
  - **work order** (not "ticket" or "job request" in UI instructions)
  - **service provider** (on first mention, "service provider (SP)" is fine)
  - **property manager (PM)**, **resident**, **in-house tech**, **preferred
    service provider**
  - **Portfolio**, **Property**, and **Company** level settings
  - the **Latchel dashboard** or **Latchel portal** (app.latchel.com)
- **Name UI elements exactly as they appear** and put them in **bold**:
  "Click **Account Settings**", "Tap **Finish Work**". Show menu paths with
  `>`, for example **Account Settings > Intake Settings > Non-Resident Intake**.
- Use US English, sentence-style punctuation, and the Oxford comma.
- No emojis in the body text.
- Point readers who need help to **success@latchel.com**, written as a
  `mailto:` link.

---

## 4. Page template for a new guide

Use this structure for new guides. Leave out sections that don't apply.

```mdx
---
title: "How to <Do the Task>"
description: "One plain sentence saying what the reader will learn or be able to do."
---

<Danger or Note: only if the guide applies to a specific audience, plan, or
opt-in. Say who it's for and what to do if that's not them.>

<1–2 short paragraphs: what this is and why it helps the reader.>

<Check>
  **In other words:**

  <A one- or two-sentence plain-language summary.>
</Check>

### **What This Feature Does**

<A short explanation. For 3–4 key capabilities, use a 2-column CardGroup.>

### **How to <Do the Task>**

<Steps>
  <Step title="Open the work order." icon="1" iconType="sharp-solid" stepNumber={1} titleSize="h4">
    Go to **Work Orders** on your Latchel dashboard and open the work order.

    <Frame>
      ![Descriptive alt text](/images/feature-name-1.png "Descriptive alt text")
    </Frame>
  </Step>
  <Step title="Click Save." icon="2" iconType="sharp-solid" stepNumber={2} titleSize="h4">
    ...
  </Step>
</Steps>

### **Things to Remember**

<Tip>, <Warning>, or <Note> callouts for limits, defaults, and gotchas.

### **Frequently Asked Questions**

<AccordionGroup>
  <Accordion title="A question the reader would actually ask?">
    A direct answer in 1–3 sentences.
  </Accordion>
</AccordionGroup>

**Related guides**

<Card title="Exact Title of Related Guide" color="#ff9b8a" icon="file-invoice-dollar" iconType="duotone" horizontal href="/s/topic/0TO5e000000h9wqGAA/Related-Guide-Slug">
  One-sentence description of the related guide.
</Card>
```

### Formatting rules
- **Title:** use title case. Task guides start with "How to…". Feature
  explainers use the feature name, for example "24/7 AI Virtual Receptionist".
  Always include a `description`.
- **Headings:** use `###` with the text bolded, like `### **Heading Text**`.
  Don't use `#` or `##` in the page body. The page title comes from the
  frontmatter.
- **Steps:** put each action in its own `<Step>`. Write the step title as a
  short imperative sentence ending with a period. Include `icon="N"`,
  `iconType="sharp-solid"`, `stepNumber={N}`, and `titleSize="h4"`.
- **Callouts:** use the matching component for each purpose.
  - `<Note>`: helpful context, such as how a setting is inherited
  - `<Tip>`: shortcuts and optional extras
  - `<Warning>`: something that can go wrong or override other settings
  - `<Danger>`: "this doesn't apply to you if…" eligibility notices
  - `<Check>`: summaries, "In other words", and confirmations of what's fixed
  - `<Callout icon="…" iconType="duotone" color="#b19cf8">`: a highlighted
    "Why This Matters" or a configuration summary
- **Cards:** use `iconType="duotone"` with Font Awesome icon names. Use only
  the brand colors `#ff9b8a` (coral, the primary), `#b19cf8` (purple), and
  `#7ed5d5` (teal). Use `<CardGroup cols={2}>` for grids.
- **Links between guides:** use a root-relative path like
  `/s/topic/<folder-id>/<Page-Slug>`, not the full `https://help.latchel.com/...`
  URL. Make the link text descriptive. Never write "click here".
- **Videos:** embed Loom with
  `<iframe src="https://www.loom.com/embed/<id>" title="Loom video player" frameborder="0" className="w-full aspect-video rounded-xl" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen />`.
- **Inline code** (backticks) is only for literal values a reader types.
  Use **bold** for buttons and menus.
- **Dollar signs** must be escaped in body text: `\$200`.

---

## 5. Images

- Store images in `/images/` and wrap each one in `<Frame>`.
- Name new images after the feature with a step number, for example
  `/images/call-routing-1.png`, and give them descriptive alt text. Not
  `image.png`.
- If a screenshot is needed but none was provided, add a placeholder right
  where it belongs:
  `{/* TODO: screenshot of <what the screen should show> */}`
  Then list it under open questions in the PR description.
- When someone attaches screenshots in Slack, use them in the order of the
  steps.

---

## 6. Before you finish

- [ ] Searched for an existing guide first, and didn't create a duplicate
- [ ] Every fact comes from the request, the release notes, or existing guides
- [ ] Wrote to the correct audience, with no internal information in public pages
- [ ] Follows the voice, terms, and formatting above
- [ ] A new page is added to `docs.json` and has a card on its group's overview page
- [ ] Links use `/s/topic/...` paths and point to real pages
- [ ] The PR description lists the source, the changed pages, and any open questions
